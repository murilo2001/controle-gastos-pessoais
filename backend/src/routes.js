const express = require('express');
const UsuariosController = require('./controllers/UsuariosController');

const router = express.Router();

router.get('/usuarios', UsuariosController.index);
router.post('/usuarios', UsuariosController.store);
router.put('/usuario/:usuario_id', UsuariosController.update);
router.delete('/usuario/:usuario_id', UsuariosController.delete);

module.exports = router;