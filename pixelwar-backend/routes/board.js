const express = require('express');
const validator = require('express-validator');
const { checkValidation } = require('../middlewares/validation');
const BoardMdl = require('../models/board');
const AuthService = require('../services/auth');
const BoardService = require('../services/board');

const createBoardValidator = [
    validator.body('name', 'Name is required').isString().isLength({ min: 4, max: 16 }),
    validator.body('startAt', 'Start date is required').isISO8601(),
    validator.body('endAt', 'End date is required').isISO8601(),
    validator.body('resolution', 'Resolution is required').isObject(),
    validator.body('resolution.x', 'Resolution x is required').isNumeric().custom((value, { req }) => {
        if (value < 1) {
            throw new Error('Resolution x must be positive');
        }
        if (value > 1000) {
            throw new Error('Resolution x must be less than 1000');
        }
        return true;
    }),
    validator.body('resolution.y', 'Resolution y is required').isNumeric().custom((value, { req }) => {
        if (value < 1) {
            throw new Error('Resolution y must be positive');
        }
        if (value > 1000) {
            throw new Error('Resolution y must be less than 1000');
        }
        return true;
    }),
    validator.body('colors', 'Colors is required').isArray().custom((value, { req }) => {
        if (value.length < 1) {
            throw new Error('Colors must have at least one color');
        }
        return true;
    }),
    validator.body('colors.*', 'Color is required').isString().custom((value, { req }) => {
        if (!/^#[0-9A-F]{6}$/i.test(value)) {
            throw new Error('Invalid color');
        }
        return true;
    }),
    // max colors is 15, as the first color is transparent
    validator.body('colors', 'Colors must have at most 15 colors').custom((value, { req }) => {
        if (value.length > 15) {
            throw new Error('Colors must have at most 15 colors');
        }
        return true;
    })
];
const updateBoardValidator = [
    validator.body('name', 'Name is required').isString().isLength({ min: 4, max: 16 }),
    validator.body('startAt', 'Start date is required').isISO8601(),
    validator.body('endAt', 'End date is required').isISO8601(),
    validator.body('resolution', 'Resolution is required').isObject(),
    validator.body('resolution.x', 'Resolution x is required').isNumeric().custom((value, { req }) => {
        if (value < 1) {
            throw new Error('Resolution x must be positive');
        }
        if (value > 1000) {
            throw new Error('Resolution x must be less than 1000');
        }
        return true;
    }),
    validator.body('resolution.y', 'Resolution y is required').isNumeric().custom((value, { req }) => {
        if (value < 1) {
            throw new Error('Resolution y must be positive');
        }
        if (value > 1000) {
            throw new Error('Resolution y must be less than 1000');
        }
        return true;
    })
];

const renderInfo = (id, res) => {
    BoardMdl.findById(id)
        .then(board => {
            res.status(200).json({
                id: board._id,
                name: board.name,
                startAt: board.startAt,
                endAt: board.endAt,
                resolution: board.resolution,
                owner: board.owner,
                colors: [
                    "#000000",
                    ...board.colors
                ]
            });
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
}

const router = express.Router();

router.get('/:id', function(req, res, next) {
    renderInfo(req.params.id, res);
});
router.post('/', AuthService.RequireJWT, createBoardValidator, checkValidation, function(req, res, next) {
    const { name, startAt, endAt, resolution, colors } = req.body;
    const owner = req.user.id;

    BoardService.create(name, startAt, endAt, resolution, owner, colors).then(board => {
        renderInfo(board._id, res);
    }).catch(err => {
        res.status(500).json({error: err.message});
    });
});
router.put('/:id', AuthService.RequireJWT, updateBoardValidator, checkValidation, function(req, res, next) {
    const { name, startAt, endAt, resolution } = req.body;

    BoardService.update(req.params.id, name, startAt, endAt, resolution)
        .then(() => {
            renderInfo(req.params.id, res);
        })
        .catch(err => {
            res.status(500).json({error: err.message});
        });
});

/*router.post('/:id/:pixelindex', (req, res, next) => {
    const { color } = req.body;
    const pixelIndex = parseInt(req.params.pixelindex);
    if (isNaN(pixelIndex) || pixelIndex < 0) {
        res.status(400).json({error: 'Invalid pixel index'});
        return;
    }

    BoardService.setPixel(req.params.id, pixelIndex, color)
        .then(() => {
            res.status(204).end();
        })
        .catch(err => {
            res.status(500).json({error: err.message});
        });
});*/

router.delete('/:id', AuthService.RequireJWT, function(req, res, next) {
    const owner = req.user.id;
    BoardService.remove(req.params.id, owner)
        .then(success => {
            if (success) {
                res.status(204).end();
            } else {
                res.status(404).json({error: 'Board not found' });
            }
        })
        .catch(err => {
            res.status(500).json({error: err.message});
        });
});

router.get('/:id/thumbnail', function(req, res, next) {
    BoardService.getThumbnail(req.params.id)
        .then(thumbnail => {
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': thumbnail.length
            });
            res.end(thumbnail);
        })
        .catch(err => {
            res.status(500).json({error: err.message});
        });
});

router.ws('/:id', function(ws, req) {
    const msgId = {
        // server
        resize: 1,
        pixel: 2,
        delete: 3,
        pixels: 4,

        // client
        setPixel: 10,
    };
    const callback = {
        onResize: (size) => {
            ws.send(new Uint8Array([msgId.resize, size.x, size.y, size.bitsPerPixel]));
        },
        onPixelUpdate: (bitIndex, color) => {
            ws.send(new Uint8Array([msgId.pixel, bitIndex, color]));
        },
        onHeaderUpdate: (header) => {
            const headerJson = JSON.stringify(header);
            ws.send(new Uint8Array([msgId.header, ...Buffer.from(headerJson)]));
        },
        onDelete: () => {
            ws.send(new Uint8Array([msgId.delete]));
            ws.close();
        },
        onPixelsData: (width, height, bitsPerPixel, pixels) => {
            ws.send(new Uint8Array([msgId.pixels, ...pixels]));
        }
    };
    if (!BoardService.subscribe(req.params.id, callback)) {
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
                BoardService.setPixel(req.params.id, data[1], data[2])
                    .catch(err => {
                        console.error(err);
                    });
                break;
            default:
                console.error('Unknown WS message', data);
                break;
        }
    });
});

module.exports = router;
