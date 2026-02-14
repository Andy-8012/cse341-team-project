const router = require('express').Router();

const cdController = require('../controllers/cd');
const cdValidator = require('../middlewares/cdValidator')
const { isAuthenticated } = require('../middlewares/authenticate')

router.get('/', cdController.getAll);

router.get('/:id', cdController.getById);

router.post('/', isAuthenticated, cdValidator.cdValidationRules(), cdValidator.validate, cdController.createCD)

router.put('/:id', isAuthenticated, cdValidator.cdValidationRules(), cdValidator.validate, cdController.updateCD)

router.delete('/:id', isAuthenticated, cdController.deleteCD)

module.exports = router;

