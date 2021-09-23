const { Router } = require('express');

// Métodos en controlador
const { getUsers, create, findById, update } = require('../controllers/user.controller');

const router = Router();

router.get('/', getUsers);

router.get('/:id', findById);

router.post('/', create);

router.put('/:id', update);

module.exports = router;