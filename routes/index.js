const router = require('express').Router()

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send("Hello World");
});

router.use('/cds', require('./cd'))

module.exports = router;