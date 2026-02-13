const router = require('express').Router()
const passport = require('passport')

router.use('/', require('./swagger'));

router.use('/cds', require('./cd'))
router.use('/books', require('./books'));
router.use('/users', require('./users'));
router.use('/movies', require('./movies'))

//OAuth Login and Logout enpoints.
router.get('/login', passport.authenticate('github'), (req, res) => { });
router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});


module.exports = router;