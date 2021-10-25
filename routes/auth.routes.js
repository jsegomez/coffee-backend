const { Router } = require('express');
const { check } = require('express-validator');

// Funciones en controlador
const { login } = require('../controllers/auth.controller');

// Validaciones
const { validateFields } = require('../middlewares/validate-fields');

// Consolidado de rutas
const router = Router();

router.post('/login', [
    check('email', 'Favor proporcionar su correo electrónico').isEmail(),
    check('password', 'Favor proporcionar contrasela de al menos 8 caracteres').isLength(8),
    validateFields
],login);

module.exports = router;