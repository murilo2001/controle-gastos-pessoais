const express = require('express');
const UsuariosController = require('./controllers/UsuariosController');
const authMiddleware = require('./middlewares/auth');

const router = express.Router();

/* Antes de chamar a index ira passar pelo middleware,
obs: deixei apenas na rota da function index pois o token
é gerado no store e no login */
router.get('/usuarios', authMiddleware, UsuariosController.index);
router.post('/usuarios', UsuariosController.store);
router.post('/usuario/login', UsuariosController.login);
router.put('/usuario/:usuario_id', UsuariosController.update);
router.delete('/usuario/:usuario_id', UsuariosController.delete);

module.exports = router;