const router = require('express').Router();

const cdController = require('../controllers/cd');
const cdValidator = require('../middleware/cdValidator')

router.get('/', cdController.getAll);

router.get('/:id', cdController.getById);

router.post('/', cdValidator.cdValidationRules(), cdValidator.validate, cdController.createCD)

router.put('/:id', cdValidator.cdValidationRules(), cdValidator.validate, cdController.updateCD)

router.delete('/:id', cdController.deleteCD)

module.exports = router;