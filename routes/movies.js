const router = require('express').Router();

const moviesController = require('../controllers/movies');
const { isAuthenticated } = require('../middlewares/authenticate')

router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

router.post('/', isAuthenticated, moviesController.addMovie)

router.put('/:id', isAuthenticated, moviesController.updateMovie)

router.delete('/:id', moviesController.deleteMovie)

module.exports = router;