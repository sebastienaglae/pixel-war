const BoardService = require('../services/board');
const AuthService = require('../services/auth');

exports.handle = function(ws, req) {
    // get jwt from BASIC auth
    const auth = req.query.token;
    if (auth) {
        req.headers.authorization = 'Bearer ' + auth;
    }

    AuthService.AllowJWT(req, ws, err => {
        const userId = req.user ? req.user.id : null;
        const msgId = {
            // server
            resize: 1,
            pixel: 2,
            delete: 3,
            pixels: 4,
            header: 5,
            personalDelay: 6,

            // client
            setPixel: 10,
        };
        const callback = {
            onResize: (size) => {
                ws.send(new Uint8Array([msgId.resize, size.x, size.y]));
            },
            onPixelUpdate: (pixelIndex, color) => {
                ws.send(new Uint8Array([msgId.pixel, (pixelIndex >> 0) & 0xff, (pixelIndex >> 8) & 0xff, (pixelIndex >> 16) & 0xff, color]));
            },
            onHeaderUpdate: (header) => {
                const headerJson = JSON.stringify(header);
                ws.send(new Uint8Array([msgId.header, ...Buffer.from(headerJson)]));
            },
            onDelete: () => {
                ws.send(new Uint8Array([msgId.delete]));
                ws.close();
            },
            onPixelsData: (width, height, pixels) => {
                ws.send(new Uint8Array([msgId.pixels, (width >> 0) & 0xff, (width >> 8) & 0xff, (height >> 0) & 0xff, (height >> 8) & 0xff, ...pixels]));
            },
            onPersonalDelayChange: (delay) => {
                ws.send(new Uint8Array([msgId.personalDelay, (delay >> 0) & 0xff, (delay >> 8) & 0xff]));
            }
        };
        if (!BoardService.subscribe(req.params.id, callback, userId)) {
            // board does not exist
            ws.close();
            return
        }
        ws.on('close', () => {
            BoardService.unsubscribe(req.params.id, callback);
        });
        ws.on('message', (msg) => {
            const data = new Uint8Array(msg);
            switch (data[0]) {
                case msgId.setPixel:
                    BoardService.setPixel(req.params.id, data[1] | (data[2] << 8) | (data[3] << 16), data[4], userId)
                        .then(nextDelay => {
                            callback.onPersonalDelayChange(nextDelay);
                        })
                        .catch(err => {
                            console.warn('Error setting pixel', err);
                        });
                    break;
                default:
                    console.error('Unknown WS message', data);
                    break;
            }
        });
    });
}