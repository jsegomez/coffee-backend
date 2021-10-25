const { Router } = require('express');
const { check } = require('express-validator');

// Métodos en controlador ROLE
const { getRoles, findById, save, update, deleteRole, enableRole } = require('../controllers/role.controller');

// Validación de campos
const { validateFields } = require('../middlewares/validate-fields');

// Validación de token
const validateJWT = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', [validateJWT], getRoles);

router.get('/:id', [validateJWT], findById);

router.post('/', [
    validateJWT,
    check('role', 'Favor indicar nombre del ROL').notEmpty(),    
    validateFields
], save);

router.put('/:id', [
    validateJWT,
    check('role', 'Favor indicar nombre del ROL').notEmpty(),
    validateFields
], update);

router.delete('/:id', [validateJWT] ,deleteRole);

router.put('/activate/:id', [validateJWT], enableRole);

module.exports = router;
