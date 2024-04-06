const express = require('express');
const BoardService = require('../services/board');
const BoardMdl = require('../models/board');
const UserMdl = require('../models/user');

const router = express.Router();

router.delete('/boards/:id', async (req, res, next) => {
    const { id } = req.params;
    const board = await BoardMdl.findById(id);
    if (!board) {
        return res.status(404).json({ error: 'Board not found' });
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
