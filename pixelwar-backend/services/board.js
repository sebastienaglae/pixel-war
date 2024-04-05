const BoardMdl = require('../models/board');
const { client } = require('../databases/redis');
const Jimp = require("jimp");

const boardHeaderSize = 4; // 2 bytes for sizeX, 2 bytes for sizeY

const boardKey = (id) => `board:${id}`;
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
    update: async (id, name, startAt, endAt, resolution) => {
        const orig = await BoardMdl.findByIdAndUpdate(id, {name, startAt, endAt, resolution}, {
            returnOriginal: true,
            runValidators: true
        });
        if (!orig) return null;

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
            }
        }

        await publish(eventHeaderUpdated, id, { header: { name, startAt, endAt, resolution } });
    },
    remove: async (id, owner) => {
        const success = await BoardMdl.deleteOne({ _id: id, owner });
        if (!success || success.deletedCount === 0) return false;
        await client.del(boardKey(id));
        await client.del(boardThumbnailKey(id));
        await client.publish(eventBoardDeleted, JSON.stringify({ id }));
        return true;
    },
    getPixels: async id => {
        const buf = await client.getBuffer(boardKey(id));
        if (!buf) return null;
        return buf;
    },
    setPixel: async (id, pixelIndex, color) => {
        color++;
        if (color < 1 || color >= 0xFF) throw new Error('Invalid color');
        if (pixelIndex < 0) throw new Error('Invalid pixelIndex');

        const header = await BoardMdl.findById(id, { colors: 1 });
        if (!header) return null;

        if (color - 1 >= header.colors.length) {
            throw new Error('Invalid color');
        }
        if (pixelIndex >= header.resolution.x * header.resolution.y) {
            throw new Error('Invalid pixelIndex');
        }

        const result = await client.bitfield(boardKey(id), 'SET', 'u8', (boardHeaderSize + pixelIndex) * 8, color);
        if (!result) return null;
        await publish(eventBoardUpdated, id, { pixelIndex, color: color});
    },
    subscribe: async (id, callback) => {
        if (!(callback instanceof Object)) throw new Error('Invalid callback');
        if (typeof callback.onResize !== 'function') throw new Error('Invalid callback');
        if (typeof callback.onPixelUpdate !== 'function') throw new Error('Invalid callback');
        if (typeof callback.onDelete !== 'function') throw new Error('Invalid callback');
        if (typeof callback.onPixelsData !== 'function') throw new Error('Invalid callback');

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
    getThumbnail: async (id) => {
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
        const image = new Jimp(sizeX, sizeY, 0xFFFFFFFF, (err, image) => {
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
                        image.setPixelColor(colorTable[colorIndex - 1], x, y);
                    }
                }
            }
            resolve();
        });
        await promise;
        thumbnailBuf = await image.getBufferAsync(Jimp.MIME_PNG);
        await client.set(boardThumbnailKey(id), thumbnailBuf, 'EX', thumbnailExpire);

        return thumbnailBuf;
    }
}