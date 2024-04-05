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

/* GET home page. */
router.get('/me', AuthService.RequireJWT, function(req, res, next) {
    renderInfo(req.user.id, res);
});
router.get('/:id', AuthService.RequireJWT, function(req, res, next) {
    renderInfo(req.params.id, res);
});
router.put('/me', AuthService.RequireJWT, function(req, res, next) {
    const { nickname } = req.body;
    if (!nickname) {
        return res.status(400).json({error: 'No valid fields to update.'});
    }

    UserMdl.findByIdAndUpdate(req.user.id, { nickname })
        .then(() => {
            renderInfo(req.user.id, res);
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});

module.exports = router;