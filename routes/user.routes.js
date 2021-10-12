const { Router } = require('express');
const { check } = require('express-validator');

// Métodos en controlador
const { getUsers, create, findById, update, deleteUser } = require('../controllers/user.controller');

// Validación de campos
const { validateFields } = require('../middlewares/validate-fields');

// Helpers
const { existById, isUniqueEmail } = require('../helpers/user-helpers');
const { verifyRole } = require('../helpers/role-helpers');

const router = Router();

router.get('/', getUsers);

router.get('/:id', [
    check('id', 'Id invalido').isMongoId().custom(existById),
    validateFields
], findById);

router.post('/', [    
    check('name', 'Favor proporcionar su nombre').isLength({min: 2}),
    check('lastName', 'Favor proporcionar su apellido').isLength({min: 2}),
    check('email', 'Favor proporcionar una dirección de correo').isEmail().custom(isUniqueEmail),
    check('password', 'Contraseña debe tener al menos 8 caracteres').isLength({min: 8}),
    check('role', 'No es un rol valido').custom(verifyRole),
    validateFields    
], create);

router.put('/:id', [
    check('id', 'Id invalido').isMongoId(),
    check('name', 'Favor proporcionar su nombre').isLength({min: 2}),
    check('lastName', 'Favor proporcionar su apellido').isLength({min: 2}),
    check('email', 'Favor proporcionar una dirección de correo').isEmail(),    
    validateFields
], update);

router.delete('/:id', [
    check('id', 'Id invalido').isMongoId().custom(existById),
    validateFields
], deleteUser);

module.exports = router;