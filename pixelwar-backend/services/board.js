const BoardMdl = require('../models/board');
const { client } = require('../databases/redis');
const Jimp = require("jimp");
const UserMdl = require('../models/user');

const boardHeaderSize = 4; // 2 bytes for sizeX, 2 bytes for sizeY

const boardKey = (id) => `board:${id}`;
const boardUserLastPlaceKey = (id) => `board:${id}:place-time`; // user last place time, used to rate limit user
const boardHeatmapKey = (id) => `board:${id}:place-heatmap`;
const boardThumbnailKey = (id) => `board:${id}:thumbnail`;


const eventBoardResized = 'board:resized'; // when the board is resized
const eventBoardUpdated = 'board:updated'; // when a pixel is updated
const eventHeaderUpdated = 'board:headerUpdated'; // when the header (metadata stored in mongodb) is updated
const eventBoardDeleted = 'board:deleted'; // when the board is deleted

const thumbnailExpire = parseInt(process.env.REDIS_THUMBNAIL_EXPIRE) || 3600;

const subscriptions = new Map();

const subClient = client.duplicate();

subClient.subscribe(eventBoardResized, eventBoardUpdated, eventHeaderUpdated, eventBoardDeleted);
subClient.on('message', async (channel, message) => {
    const { id, data } = JSON.parse(message);
    switch (channel) {
        case eventBoardResized:
            raise(id, 'onResize', [data.size]);
            break;
        case eventBoardUpdated:
            raise(id, 'onPixelUpdate', [data.pixelIndex, data.color]);
            break;
        case eventHeaderUpdated:
            raise(id, 'onHeaderUpdate', [data.header]);
            break;
        case eventBoardDeleted:
            raise(id, 'onDelete', []);
            break;
        default:
            console.error('Unknown message', channel, message);
            break;
    }
});

const raise = (channel, eventFn, eventFnArgs) => {
    if (subscriptions.has(channel)) {
        for (const callback of subscriptions.get(channel)) {
            callback[eventFn](...eventFnArgs);
        }
        if (eventFn === 'onDelete') {
            subscriptions.delete(channel);
        }
    }
}

const publish = async (channel, id, data) => {
    await client.publish(channel, JSON.stringify({ id, data }));
}

module.exports = {
    create: async (name, startAt, endAt, resolution, owner, colors, mode, delay) => {
        const board = await BoardMdl.create({ name, startAt, endAt, resolution, owner, colors, mode, delay });

        const sizeX = resolution.x;
        const sizeY = resolution.y;
        const pixels = Buffer.alloc(boardHeaderSize + sizeY * sizeX);
        pixels[0] = (sizeX >> 0) & 0xff;
        pixels[1] = (sizeX >> 8) & 0xff;
        pixels[2] = (sizeY >> 0) & 0xff;
        pixels[3] = (sizeY >> 8) & 0xff;

        await client.set(boardKey(board._id), pixels);

        return board;
    },
    update: async (id, name, startAt, endAt, resolution, mode, delay, ownerId) => {
        const orig = await BoardMdl.findOneAndUpdate(ownerId != null ? { _id: id, owner: ownerId } : { _id: id }, { name, startAt, endAt, resolution, mode, delay }, {
            returnOriginal: true,
            runValidators: true
        });
        if (!orig) return false;

        if (orig.resolution.x !== resolution.x || orig.resolution.y !== resolution.y) {
            for (let i = 0; i < 10; i++) {
                await client.watch(boardKey(id));
                const buf = await client.getBuffer(boardKey(id));
                if (!buf) continue;

                const input = new Uint8Array(buf);
                const inputSizeX = input[0] | input[1] << 8;
                const inputSizeY = input[1] | input[2] << 8;
                const inputPixels = input.subarray(boardHeaderSize);

                const outputSizeX = resolution.x;
                const outputSizeY = resolution.y;

                const output = Buffer.alloc(boardHeaderSize + outputSizeY * outputSizeX);
                output[0] = (outputSizeX >> 0) & 0xff;
                output[1] = (outputSizeX >> 8) & 0xff;
                output[2] = (outputSizeY >> 0) & 0xff;
                output[3] = (outputSizeY >> 8) & 0xff;
                const outputPixels = new Uint8Array(output.buffer, boardHeaderSize);

                for (let y = 0, c = Math.min(inputSizeY, outputSizeY); y < c; y++) {
                    const inputRow = inputPixels.subarray(y * inputSizeX, (y + 1) * inputSizeX);
                    const outputRow = outputPixels.subarray(y * outputSizeX, (y + 1) * outputSizeX);

                    if (inputSizeX < outputSizeX) {
                        outputRow.set(inputRow);
                    } else {
                        outputRow.set(inputRow.subarray(0, outputSizeX));
                    }
                }

                const results = await client.multi()
                    .set(boardKey(id), output)
                    .exec();
                if (!results) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    continue;
                }

                await publish(eventBoardResized, id, { size: { x: outputSizeX, y: outputSizeY } });
                await client.del(boardThumbnailKey(id));

                break;
            }
        }

        await publish(eventHeaderUpdated, id, { header: { name, startAt, endAt, resolution } });
        return true;
    },
    remove: async (id, owner) => {
        const success = await BoardMdl.deleteOne(owner != null ? { _id: id, owner: owner } : { _id: id });
        if (!success || success.deletedCount === 0) return false;

        await client.del(boardKey(id));
        await client.del(boardThumbnailKey(id));
        await client.del(boardHeatmapKey(id));
        await client.del(boardUserLastPlaceKey(id));

        await client.publish(eventBoardDeleted, JSON.stringify({ id }));
        return true;
    },
    getPixels: async id => {
        const buf = await client.getBuffer(boardKey(id));
        if (!buf) return null;
        return buf;
    },
    setPixel: async (id, pixelIndex, color, userId) => {
        color++;
        if (color < 1 || color >= 0xFF) throw new Error('Invalid color');
        if (pixelIndex < 0) throw new Error('Invalid pixelIndex');

        const header = await BoardMdl.findById(id, { colors: 1, resolution: 1, mode: 1, delay: 1 });
        if (!header) return null;

        if (color - 1 >= header.colors.length) throw new Error('Invalid color');
        if (pixelIndex >= header.resolution.x * header.resolution.y) throw new Error('Invalid pixelIndex');

        if (header.mode === 'no-overwrite') {
            const existingColor = await client.bitfield(boardKey(id), 'GET', 'u8', (boardHeaderSize + pixelIndex) * 8);
            if (existingColor[0]) throw new Error('Pixel already set');
        }

        if (userId) {
            const lastPlaceTime = await client.hget(boardUserLastPlaceKey(id), userId);
            if (lastPlaceTime) {
                const lastPlaceTimeDate = new Date(lastPlaceTime);
                const now = new Date();
                const diff = now - lastPlaceTimeDate;
                if (diff < header.delay * 1000) {
                    throw new Error('Rate limited');
                }
            }
        }

        const result = await client.bitfield(boardKey(id), 'SET', 'u8', (boardHeaderSize + pixelIndex) * 8, color);
        if (!result) throw new Error('Failed to set pixel');

        // set heatmap
        await client.zincrby(boardHeatmapKey(id), 1, Math.floor(pixelIndex / header.resolution.x) + ',' + (pixelIndex % header.resolution.x));
        // set user last place time
        if (userId) {
            await client.hset(boardUserLastPlaceKey(id), userId, new Date().toUTCString());

            const update = {};
            update[`contributions.${id}`] = 1;
            await UserMdl.updateOne({ _id: userId }, { $inc: update });
        }

        // delete thumbnail
        await client.del(boardThumbnailKey(id));
        await publish(eventBoardUpdated, id, { pixelIndex, color: color});

        return header.delay;
    },
    subscribe: async (id, callback, userId) => {
        if (!(callback instanceof Object)) throw new Error('Invalid callback');
        if (typeof callback.onResize !== 'function') throw new Error('Invalid callback');
        if (typeof callback.onPixelUpdate !== 'function') throw new Error('Invalid callback');
        if (typeof callback.onDelete !== 'function') throw new Error('Invalid callback');
        if (typeof callback.onPixelsData !== 'function') throw new Error('Invalid callback');
        if (typeof callback.onHeaderUpdate !== 'function') throw new Error('Invalid callback');
        if (typeof callback.onPersonalDelayChange !== 'function') throw new Error('Invalid callback');

        if (!subscriptions.has(id)) {
            subscriptions.set(id, new Set());
        }
        subscriptions.get(id).add(callback);

        // check if board exists
        const pixels = await module.exports.getPixels(id);
        if (!pixels) {
            module.exports.unsubscribe(id, callback);
            return false;
        }

        if (userId) {
            const header = await BoardMdl.findById(id, { delay: 1 });
            if (!header) {
                module.exports.unsubscribe(id, callback);
                return false;
            }

            const lastPlaceTime = await client.hget(boardUserLastPlaceKey(id), userId);
            if (lastPlaceTime) {
                const lastPlaceTimeDate = new Date(lastPlaceTime);
                const now = new Date();
                const diff = now - lastPlaceTimeDate;
                if (diff < header.delay * 1000) {
                    callback.onPersonalDelayChange(((header.delay * 1000 - diff) / 1000) >> 0);
                }
            }
        }

        const buf = Buffer.from(pixels);
        callback.onPixelsData(buf[0] | buf[1] << 8, buf[2] | buf[3] << 8, buf.subarray(boardHeaderSize));

        return true;
    },
    unsubscribe: (id, callback) => {
        if (!subscriptions.has(id)) return;
        const set = subscriptions.get(id);
        set.delete(callback);
        if (set.size === 0) {
            subscriptions.delete(id);
        }
    },
    getThumbnailPng: async (id) => {
        let thumbnailBuf = await client.getBuffer(boardThumbnailKey(id));
        if (thumbnailBuf) {
            return thumbnailBuf;
        }

        // no thumbnail, generate it
        const pixelsBuf = await client.getBuffer(boardKey(id));
        const boardMeta = await BoardMdl.findById(id);
        if (!pixelsBuf || !boardMeta) return null;

        const sizeX = boardMeta.resolution.x;
        const sizeY = boardMeta.resolution.y;
        if (sizeX !== (pixelsBuf[0] | pixelsBuf[1] << 8)) throw new Error('SizeX mismatch');
        if (sizeY !== (pixelsBuf[2] | pixelsBuf[3] << 8)) throw new Error('SizeY mismatch');
        if (boardMeta.colors.length > 255) throw new Error('Too many colors');

        const colorTable = boardMeta.colors.map(c => (parseInt(c.substring(1), 16)<<8 | 0xff) >>> 0);
        const pixels = pixelsBuf.subarray(boardHeaderSize);

        let resolve, reject = null;
        const promise = new Promise((vresolve, vreject) => {
            resolve = vresolve;
            reject = vreject;
        });
        const upscaleTable = [
            [0, 16], [32, 8], [64, 4], [128, 2], [256, 1]
        ]
        const upscale = upscaleTable.find(([threshold, value]) => sizeX * sizeY >= threshold)[1];

        const image = new Jimp(sizeX * upscale, sizeY * upscale, 0xFFFFFFFF, (err, image) => {
            if (err) {
                reject(err);
                return;
            }
            for (let y = 0; y < sizeY; y++) {
                for (let x = 0; x < sizeX; x++) {
                    let colorIndex = pixels[y * sizeX + x];
                    if (colorIndex > 0) {
                        if (colorIndex - 1 >= colorTable.length) {
                            colorIndex = 0;
                        }
                        for (let i = 0; i < upscale; i++) {
                            for (let j = 0; j < upscale; j++) {
                                image.setPixelColor(colorTable[colorIndex - 1], x * upscale + j, y * upscale + i);
                            }
                        }
                    }
                }
            }
            resolve();
        });
        await promise;
        thumbnailBuf = await image.getBufferAsync(Jimp.MIME_PNG);
        await client.set(boardThumbnailKey(id), thumbnailBuf, 'EX', thumbnailExpire);

        return thumbnailBuf;
    },
    getThumbnail: async (id) => {
        const pixelsBuf = await client.getBuffer(boardKey(id));
        if (!pixelsBuf) return null;

        const sizeX = pixelsBuf[0] | pixelsBuf[1] << 8;
        const sizeY = pixelsBuf[2] | pixelsBuf[3] << 8;

        const rows = [];
        for (let y = 0; y < sizeY; y++) {
            const row = [];
            for (let x = 0; x < sizeX; x++) {
                const colorIndex = pixelsBuf[boardHeaderSize + y * sizeX + x];
                row.push(colorIndex);
            }
            rows.push(row);
        }

        return rows;
    },
    getHeatmap: async (id) => {
        const heatmap = await client.zrange(boardHeatmapKey(id), 0, -1, 'WITHSCORES');
        const header = await BoardMdl.findById(id, { resolution: 1 });
        if (!heatmap || !header) return null;

        const sizeX = header.resolution.x;
        const sizeY = header.resolution.y;
        const heatmapValuePerPixel = {};
        for (let i = 0; i < heatmap.length; i += 2) {
            const [y, x] = heatmap[i].split(',');
            const pixelIndex = parseInt(y) * sizeX + parseInt(x);
            heatmapValuePerPixel[pixelIndex] = parseInt(heatmap[i + 1]);
        }

        const rows = [];
        for (let y = 0; y < sizeY; y++) {
            const row = [];
            for (let x = 0; x < sizeX; x++) {
                const pixelIndex = y * sizeX + x;
                const score = heatmapValuePerPixel[pixelIndex] || 0;
                row.push(score ? parseInt(score) : 0);
            }
            rows.push(row);
        }

        return rows;
    },
}