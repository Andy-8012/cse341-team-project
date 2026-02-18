const { body, validationResult } = require('express-validator');

const cdValidationRules = () => {
    return [
        body('title')
            .notEmpty().withMessage('Title is required')
            .isString().withMessage('Title must be a string'),

        body('artist')
            .notEmpty().withMessage('Artist is required')
            .isString().withMessage('Artist must be a string'),

        body('genre')
            .notEmpty().withMessage('Genre is required')
            .isString().withMessage('Genre must be a string'),

        body('label')
            .notEmpty().withMessage('Label is required')
            .isString().withMessage('Label must be a string'),

        body('releaseYear')
            .notEmpty().withMessage('Release year is required')
            .isInt({ min: 1000, max: 9999 }).withMessage('Release year must be a 4 digit year')
    ];
}


const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(400).json({
        errors: extractedErrors,
    })
}

module.exports = {
    cdValidationRules,
    validate,
}
