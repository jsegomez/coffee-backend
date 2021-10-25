const { Router } = require('express');
const { check } = require('express-validator');

// Métodos en controlador
const {
    getUsers,
    create,
    findById,
    update,
    deleteUser,
    disableUser,
    getDisabledUsers,
    activateUser
} = require('../controllers/user.controller');

// Validación de campos
const { validateFields } = require('../middlewares/validate-fields');

// Helpers
const { existUserById, isUniqueEmail } = require('../helpers/user-helpers');
const { verifyRole } = require('../helpers/role-helpers');

const validateJWT = require('../middlewares/validate-jwt');
const { isAdmin } = require('../middlewares/role-type');

const router = Router();

router.get('/',
    validateJWT
,getUsers);

router.get('/disabled-users', [
    validateJWT        
], getDisabledUsers);

router.get('/:id', [
    validateJWT,
    check('id', 'Id invalido').isMongoId().custom(existUserById),
    validateFields
], findById);

router.post('/', [    
    validateJWT,
    check('name', 'Favor proporcionar su nombre').isLength({min: 2}),
    check('lastName', 'Favor proporcionar su apellido').isLength({min: 2}),
    check('email', 'Favor proporcionar una dirección de correo').isEmail().custom(isUniqueEmail),
    check('password', 'Contraseña debe tener al menos 8 caracteres').isLength({min: 8}),
    check('role', 'No es un rol valido').custom(verifyRole),
    validateFields    
], create);

router.put('/:id', [
    validateJWT,
    check('id', 'Id invalido').isMongoId().custom(existUserById),
    check('name', 'Favor proporcionar su nombre').isLength({min: 2}),
    check('lastName', 'Favor proporcionar su apellido').isLength({min: 2}),
    check('email', 'Favor proporcionar una dirección de correo').isEmail(),    
    validateFields
], update);

router.put('/activate/:id', [
    validateJWT,
    isAdmin,
    check('id', 'Id invalido').isMongoId().custom(existUserById)
], activateUser);

router.delete('/disabled/:id', [
    validateJWT,
    isAdmin,
    check('id', 'Id invalido').isMongoId().custom(existUserById),
    validateFields
], disableUser);

router.delete('/:id', [
    validateJWT,
    isAdmin,
    check('id', 'Id invalido').isMongoId().custom(existUserById),
    validateFields
], deleteUser);

module.exports = router;