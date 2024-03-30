const validator = require("express-validator");

const checkValidation = (req, res, next) => {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

exports.checkValidation = checkValidation;