const { Router } = require('express');

const validateJWT = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields')

// Controllers
const {
    getAllCategories,
    getCategoryById,
    create,
    update,
    deleteCategory,
    activateCategory
} = require('../controllers/categories.controller');
const { check } = require('express-validator');

const router = Router();

router.get('/', getAllCategories);

router.get('/:id', [
    check('id', 'Id proporcionado no es válido').isMongoId(),
    validateFields
], getCategoryById);

router.post('/', [
    validateJWT,
    check('name', 'Favor proporcionar nombre de categoría').notEmpty(),
    validateFields
], create);

router.put('/:id', [
    validateJWT,
    check('id', 'Id proporcionado no es válido').isMongoId(),
    check('name', 'Favor proporcionar nombre de categoría').notEmpty(),
    validateFields    
], update);

router.delete('/:id', [
    validateJWT,
    check('id', 'Id proporcionado no es válido').isMongoId(),
    validateFields
], deleteCategory);

router.put('/activate/:id', [
    validateJWT,
    check('id', 'Id proporcionado no es válido').isMongoId(),
    validateFields
], activateCategory);

module.exports = router;