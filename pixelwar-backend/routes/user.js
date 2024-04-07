const express = require('express');
const router = express.Router();

const UserMdl = require('../models/user');
const AuthService = require('../services/auth');

const renderInfo = (id, res) => {
    UserMdl.findById(id)
        .then(user => {
            res.status(200).json({
                id: user._id,
                email: user.email,
                nickname: user.nickname,
                contributions: user.contributions
            });
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
}

router.get('/me', AuthService.RequireJWT, function(req, res, next) {
    renderInfo(req.user.id, res);
});
router.get('/:id', function(req, res, next) {
    renderInfo(req.params.id, res);
});
router.put('/me', AuthService.RequireJWT, function(req, res, next) {
    const { nickname, bio } = req.body;
    if (!nickname && !bio) {
        return res.status(400).json({error: 'No valid fields to update.'});
    }

    UserMdl.findByIdAndUpdate(req.user.id, { nickname, bio })
        .then(() => {
            renderInfo(req.user.id, res);
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});
router.put('/:id', AuthService.RequireJWT, function(req, res, next) {
    if (!req.user.admin) {
        return res.status(403).json({error: 'Unauthorized'});
    }

    const { nickname, bio } = req.body;
    if (!nickname && !bio) {
        return res.status(400).json({error: 'No valid fields to update.'});
    }

    UserMdl.findByIdAndUpdate(req.params.id, { nickname, bio })
        .then(() => {
            renderInfo(req.params.id, res);
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});

module.exports = router;