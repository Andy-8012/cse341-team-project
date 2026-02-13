const router = require('express').Router();

const moviesController = require('../controllers/movies');
const { isAuthenticated } = require('../middlewares/authenticate')

router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

router.post('/', isAuthenticated, moviesController.createMovies)

router.put('/:id', isAuthenticated, moviesController.updateMovies)

router.delete('/:id', moviesController.deleteMovies)

module.exports = router;