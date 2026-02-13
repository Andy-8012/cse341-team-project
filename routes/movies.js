const router = require('express').Router();

const moviesController = require('../controllers/movies');
const movieValidator = require('../middlewares/Validator')
const { isAuthenticated } = require('../middlewares/authenticate')

router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

router.post('/', moviesController.createMovies)

router.put('/:id', moviesController.updateMovies)

router.delete('/:id', moviesController.deleteMovies)

module.exports = router;