const router = require('express').Router();
const usersController = require('../controllers/users');
const validaton = require('../middlewares/validateUser');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);
router.post('/', validaton.saveUser, usersController.createUser);
router.put('/:id', validaton.saveUser, usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;