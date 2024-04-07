const express = require('express');
const validator = require('express-validator');
const AuthSvc = require('../services/auth');

const router = express.Router();

const { checkValidation } = require('../middlewares/validation');
const loginValidator = [
    validator.body('nickname', 'Nickname is required').isString().isLength({ min: 4, max: 16 }),
    validator.body('password', 'Password is required').exists()
];
const registerValidator = [
    validator.body('email', 'Email is required').isEmail(),
    validator.body('password', 'Password is required').exists(),
    validator.body('nickname', 'Nickname is required').isString().isLength({ min: 4, max: 16 }),
    validator.body('bio', 'Bio is required').isString().isLength({ max: 1024 })
];

router.post('/login', loginValidator, checkValidation, (req, res) => {
    AuthSvc.authenticate(req, res);
});
router.post('/register', registerValidator, checkValidation, (req, res) => {
    AuthSvc.register(req, res);
});

module.exports = router;
