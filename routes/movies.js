const router = require('express').Router();

const moviesController = require('../controllers/movies');
const movieValidator = require('../middlewares/validateMovie')
const { isAuthenticated } = require('../middlewares/authenticate')

router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

router.post('/', isAuthenticated, movieValidator.saveMovie, moviesController.createMovies)

router.put('/:id', isAuthenticated, moviesController.updateMovies)

router.delete('/:id', moviesController.deleteMovie)

module.exports = router;