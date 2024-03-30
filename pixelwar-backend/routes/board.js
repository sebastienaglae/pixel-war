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
                owner: board.owner
            });
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
}

const router = express.Router();

router.get('/:id', function(req, res, next) {

});
router.post('/', AuthService.RequireJWT, createBoardValidator, checkValidation, function(req, res, next) {
    const { name, startAt, endAt, resolution } = req.body;
    const owner = req.user.id;

    BoardService.create(name, startAt, endAt, resolution, owner).then(board => {
        renderInfo(board._id, res);
    }).catch(err => {
        res.status(500).json({error: err.message});
    });
});
router.put('/:id', updateBoardValidator, function(req, res, next) {
    const { name, startAt, endAt, resolution } = req.body;

    BoardService.update(req.params.id, name, startAt, endAt, resolution)
        .then(() => {
            renderInfo(req.params.id, res);
        })
        .catch(err => {
            res.status(500).json({error: err.message});
        });
});

router.post('/:id/:pixelindex', (req, res, next) => {
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
});

router.delete('/:id', function(req, res, next) {
    BoardService.remove(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch(err => {
            res.status(500).json({error: err.message});
        });
});

module.exports = router;
