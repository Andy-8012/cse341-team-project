const router = require('express').Router();
const booksController = require('../controllers/books');
const validaton = require('../middlewares/validateBook');

router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle);
router.post('/', validaton.saveBook, booksController.createBook);
router.put('/:id', validaton.saveBook, booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;