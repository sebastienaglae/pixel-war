const express = require('express');
const BoardMdl = require('../models/board');
const UserMdl = require('../models/user');

const router = express.Router();

router.get('/stats', async (req, res, next) => {
    res.status(200).json({
        users: await UserMdl.countDocuments(),
        boards: await BoardMdl.countDocuments()
    });
});

module.exports = router;
