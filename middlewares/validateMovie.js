const validator = require('../helpers/validate');

const saveMovie = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        director: 'required|string',
        genre: 'required|string',
        releaseYear: 'required|integer',
        durationMinutes: 'required|integer',
        rating: 'required|numeric',
        available: 'required|boolean'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveMovie
};