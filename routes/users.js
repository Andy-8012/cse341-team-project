const router = require('express').Router();
const usersController = require('../controllers/users');
const validaton = require('../middlewares/validateUser');
const { isAuthenticated } = require('../middlewares/authenticate')

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);
router.post('/', isAuthenticated, validaton.saveUser, usersController.createUser);
router.put('/:id', isAuthenticated, validaton.saveUser, usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;