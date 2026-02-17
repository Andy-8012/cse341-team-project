const router = require('express').Router();

const moviesController = require('../controllers/movies');
const movieValidator = require('../middlewares/validateMovie')
const { isAuthenticated } = require('../middlewares/authenticate')

router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

router.post('/', isAuthenticated, movieValidator.saveMovie, moviesController.addMovie)

router.put('/:id', isAuthenticated, movieValidator.saveMovie, moviesController.updateMovie)

router.delete('/:id', isAuthenticated, moviesController.deleteMovie)

module.exports = router;