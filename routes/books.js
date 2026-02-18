const router = require('express').Router();
const booksController = require('../controllers/books');
const validaton = require('../middlewares/validateBook');
const { isAuthenticated } = require('../middlewares/authenticate')

router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle);
router.post('/', isAuthenticated, validaton.saveBook, booksController.createBook);
router.put('/:id', isAuthenticated, validaton.saveBook, booksController.updateBook);
router.delete('/:id', isAuthenticated, booksController.deleteBook);

module.exports = router;