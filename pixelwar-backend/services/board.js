const BoardMdl = require('../models/board');
const { client } = require('../databases/redis');

// board data is a matrix of 3 bits per pixel. X is the width, Y is the height.
const boardPixelBit = 4
const boardHeaderSize = 3;

const boardKey = (id) => `board:${id}`;
const tobytecount = x => Math.ceil(x / 8);

const eventBoardResized = 'board:resized';
const eventBoardUpdated = 'board:updated';

module.exports = {
    create: async (name, startAt, endAt, resolution, owner) => {
        const board = await BoardMdl.create({ name, startAt, endAt, resolution, owner })

        const sizeX = resolution.x;
        const sizeY = resolution.y;
        const bitsPerPixel = boardPixelBit;
        const bytesPerRow = tobytecount(sizeX * bitsPerPixel);
        const pixels = Buffer.alloc(boardHeaderSize + sizeY * bytesPerRow);
        pixels[0] = sizeX;
        pixels[1] = sizeY;
        pixels[2] = bitsPerPixel;

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
                const inputSizeX = input[0];
                const inputSizeY = input[1];
                const inputBitsPerPixel = input[2];
                const inputBytesPerRow = tobytecount(inputSizeX * inputBitsPerPixel);
                const inputPixels = input.subarray(boardHeaderSize);

                const outputSizeX = resolution.x;
                const outputSizeY = resolution.y;
                const outputBitsPerPixel = inputBitsPerPixel;
                const outputBytesPerRow = tobytecount(outputSizeX * outputBitsPerPixel);

                const output = Buffer.alloc(boardHeaderSize + outputSizeY * outputBytesPerRow);
                output[0] = outputSizeX;
                output[1] = outputSizeY;
                output[2] = outputBitsPerPixel;
                const outputPixels = new Uint8Array(output.buffer, boardHeaderSize);

                for (let y = 0, c = Math.min(inputSizeY, outputSizeY); y < c; y++) {
                    const inputRow = inputPixels.subarray(y * inputBytesPerRow, (y + 1) * inputBytesPerRow);
                    const outputRow = outputPixels.subarray(y * outputBytesPerRow, (y + 1) * outputBytesPerRow);

                    if (inputSizeX < outputSizeX) {
                        outputRow.set(inputRow);
                    } else {
                        outputRow.set(inputRow.subarray(0, outputBytesPerRow));
                    }
                }

                const results = await client.multi()
                    .set(boardKey(id), output)
                    .exec();
                if (!results) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    continue;
                }

                await client.publish(eventBoardResized, JSON.stringify({ id }));
            }
        }
    },
    remove: async id => {
        const success = await BoardMdl.findByIdAndDelete(id);
        if (!success) return null;
        await client.del(boardKey(id));
    },
    getPixels: async id => {
        const buf = await client.get(boardKey(id));
        if (!buf) return null;

        const pixels = new Uint8Array(buf);
        const sizeX = pixels[0];
        const sizeY = pixels[1];
        const bitsPerPixel = pixels[2];
        const data = pixels.subarray(boardHeaderSize);

        return {
            size: { x: sizeX, y: sizeY },
            bitsPerPixel,
            data: data
        };
    },
    setPixel: async (id, bitIndex, color) => {
        if (color < 0 || color >= (1 << boardPixelBit)) throw new Error('Invalid color');
        if (bitIndex < 0 || bitIndex % boardPixelBit !== 0) throw new Error('Invalid bit index');

        const result = await client.bitfield(boardKey(id), 'SET', 'u4', bitIndex + boardHeaderSize, color);
        await client.publish(eventBoardUpdated, JSON.stringify({ id, bitIndex, color }));
    },
    subscribe: async (callback) => {
        const sub = client.duplicate();
        await sub.connect();
        await sub.subscribe(eventBoardResized, message => {
            callback(JSON.parse(message));
        });
        await sub.subscribe(eventBoardUpdated, message => {
            callback(JSON.parse(message));
        });
    }
}