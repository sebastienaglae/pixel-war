const express = require('express');
const validator = require('express-validator');
const { checkValidation } = require('../middlewares/validation');
const BoardMdl = require('../models/board');
const UserMdl = require('../models/user');
const AuthService = require('../services/auth');
const BoardService = require('../services/board');
const mongoose = require("mongoose");

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
    }),
    validator.body('mode', 'Mode is required').isString().custom((value, { req }) => {
        if (value !== 'no-overwrite' && value !== 'allow-overwrite') {
            throw new Error('Invalid mode');
        }
        return true;
    }),
    // delay: in seconds
    validator.body('delay', 'Delay is required').isNumeric().custom((value, { req }) => {
        if (value < 0) {
            throw new Error('Delay must be positive');
        }
        if (value > 3600) {
            throw new Error('Delay must be less than 3600');
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
    }),
    validator.body('mode', 'Mode is required').isString().custom((value, { req }) => {
        if (value !== 'no-overwrite' && value !== 'allow-overwrite') {
            throw new Error('Invalid mode');
        }
        return true;
    }),
    validator.body('delay', 'Delay is required').isNumeric().custom((value, { req }) => {
        if (value < 1) {
            throw new Error('Delay must be positive');
        }
        if (value > 3600) {
            throw new Error('Delay must be less than 3600');
        }
        return true;
    })
];
const sort = {
    'name-asc': { name: 1 },
    'name-desc': { name: -1 },
    'createdAt-asc': { createdAt: 1 },
    'createdAt-desc': { createdAt: -1 },
    'startAt-asc': { startAt: 1 },
    'startAt-desc': { startAt: -1 },
    'endAt-asc': { endAt: 1 },
    'endAt-desc': { endAt: -1 },
    'resolution.x-asc': { 'resolution.x': 1 },
    'resolution.x-desc': { 'resolution.x': -1 },
    'resolution.y-asc': { 'resolution.y': 1 },
    'resolution.y-desc': { 'resolution.y': -1 }
};

const formatBoard = (board) => {
    let boardStatus = 'active';
    const currentTime = Date.now();
    if (board.startAt > currentTime) {
        boardStatus = 'pending';
    } else if (board.endAt < currentTime) {
        boardStatus = 'ended';
    }
    return {
        id: board._id,
        name: board.name,
        startAt: board.startAt,
        endAt: board.endAt,
        resolution: board.resolution,
        owner: board.owner,
        colors: [
            "#FFFFFF",
            ...board.colors
        ],
        mode: board.mode,
        delay: board.delay,
        status: boardStatus
    };
};
const fetchAndReturn = async (id, res) => {
    const board = await BoardMdl.findById(id);
    if (!board) {
        res.status(404).json({error: 'Board not found'});
        return;
    }
    const owner = await UserMdl.findById(board.owner, { email: 1, nickname: 1 });
    if (!owner) {
        res.status(404).json({error: 'Owner not found'});
        return;
    }
    board.owner = owner;
    res.status(200).json(formatBoard(board));
}

const router = express.Router();

router.get('/:id', function(req, res, next) {
    if (mongoose.Types.ObjectId.isValid(req.params.id) === false) {
        res.status(404).json({error: 'Board not found'});
        return;
    }
    fetchAndReturn(req.params.id, res);
});
router.post('/', AuthService.RequireJWT, createBoardValidator, checkValidation, function(req, res, next) {
    const { name, startAt, endAt, resolution, colors, mode, delay } = req.body;
    const owner = req.user.id;

    BoardService.create(name, startAt, endAt, resolution, owner, colors, mode, delay).then(board => {
        fetchAndReturn(board._id, res);
    }).catch(err => {
        res.status(500).json({error: err.message});
    });
});
router.put('/:id', AuthService.RequireJWT, updateBoardValidator, checkValidation, (req, res, next) => {
    const { name, startAt, endAt, resolution, mode, delay } = req.body;

    if (mongoose.Types.ObjectId.isValid(req.params.id) === false) {
        res.status(404).json({error: 'Board not found'});
        return;
    }

    BoardService.update(req.params.id, name, startAt, endAt, resolution, mode, delay, req.user.admin ? null : req.user.id)
        .then(success => {
            if (!success) {
                res.status(404).json({error: 'Board not found' });
                return;
            }
            fetchAndReturn(req.params.id, res);
        })
        .catch(err => {
            res.status(500).json({error: err.message});
        });
});

router.delete('/:id', AuthService.RequireJWT, function(req, res, next) {
    if (mongoose.Types.ObjectId.isValid(req.params.id) === false) {
        res.status(404).json({error: 'Board not found'});
        return;
    }
    BoardService.remove(req.params.id, req.user.admin ? null : req.user.id)
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
    if (mongoose.Types.ObjectId.isValid(req.params.id) === false) {
        res.status(404).json({error: 'Board not found'});
        return;
    }
    const format = req.query.format || 'png';
    if (format !== 'png' && format !== 'json') {
        return res.status(400).json({error: 'Invalid format'});
    }
    if (format === 'png') {
        BoardService.getThumbnailPng(req.params.id)
            .then(thumbnail => {
                if (!thumbnail) {
                    return res.status(404).json({error: 'Board not found'});
                }
                res.writeHead(200, {
                    'Content-Type': 'image/png',
                    'Content-Length': thumbnail.length
                });
                res.end(thumbnail);
            })
            .catch(err => {
                res.status(500).json({error: err.message});
            });
    } else {
        BoardService.getThumbnail(req.params.id)
            .then(thumbnail => {
                if (!thumbnail) {
                    return res.status(404).json({error: 'Board not found'});
                }
                res.status(200).json(thumbnail);
            })
            .catch(err => {
                res.status(500).json({error: err.message});
            });
    }
});
router.get('/:id/heatmap', function(req, res, next) {
    if (mongoose.Types.ObjectId.isValid(req.params.id) === false) {
        res.status(404).json({error: 'Board not found'});
        return;
    }
    BoardService.getHeatmap(req.params.id)
        .then(heatmap => {
            if (!heatmap) {
                return res.status(404).json({error: 'Board not found'});
            }
            res.status(200).json(heatmap);
        })
        .catch(err => {
            res.status(500).json({error: err.message});
        });
});
router.get('/', async (req, res, next) => {
    const { query, status, sortType } = req.query;
    const sortQuery = sort[sortType];
    const filter = query ? { name: { $regex: query, $options: 'i' } } : {};
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);

    if (status) {
        const currentTime = Date.now();
        switch (status) {
            case 'active':
                filter.startAt = { $lt: currentTime };
                filter.endAt = { $gt: currentTime };
                break;
            case 'pending':
                filter.startAt = { $gt: currentTime };
                break;
            case 'ended':
                filter.endAt = { $lt: currentTime };
                break;
        }
    }

    const totalBoards = await BoardMdl.countDocuments(filter || {}).exec();
    const boards = await BoardMdl.find(filter || {})
        .sort(sortQuery || { createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
    const ownerIds = boards.map(board => board.owner);
    const owners = await UserMdl.find({ _id: { $in: ownerIds } }, { email: 1, nickname: 1 }).exec();
    const ownersMap = owners.reduce((acc, owner) => {
        acc[owner._id] = owner;
        return acc;
    }, {});

    res.status(200).json({
        total: totalBoards,
        page: page,
        limit: limit,
        hasNext: totalBoards > page * limit,
        hasPrev: page > 1,
        boards: boards.map(board => {
            board.owner = ownersMap[board.owner];
            return formatBoard(board);
        })
    });
});
router.delete('/:id', AuthService.RequireJWT, async (req, res, next) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id) === false) {
        res.status(404).json({error: 'Board not found'});
        return;
    }
    const { id } = req.params;
    const board = await BoardMdl.findById(id);
    if (!board) {
        return res.status(404).json({ error: 'Board not found' });
    }
    if (!req.user.admin) {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    BoardService.remove(id, board.owner)
        .then(() => {
            res.status(204).end();
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

module.exports = router;
