const { Router } = require('express');

// Métodos en controlador ROLE
const { getRoles, findById, save, update, deleteRole, enableRole } = require('../controllers/role.controller');

const router = Router();

router.get('/', getRoles);

router.get('/:id', findById);

router.post('/', save);

router.put('/:id', update);

router.delete('/:id', deleteRole);

router.put('/activate/:id', enableRole);

module.exports = router;
