const router = require('express').Router();

const cdController = require('../controllers/cd');

router.get('/', cdController.getAll);

router.get('/:id', cdController.getById);

router.post('/', cdController.createCD)

router.put('/:id', cdController.updateCD)

router.delete('/:id', cdController.deleteCD)

module.exports = router;