const express = require('express');
const UsuariosController = require('./controllers/UsuariosController');
const ContabilidadesController = require('./controllers/ContabilidadesController');
const authMiddleware = require('./middlewares/auth');

const router = express.Router();

/* 
    Antes de chamar a index ira passar pelo middleware,
    obs: deixei apenas na rota da function index,update,delete  pois o token é gerado no store e no login 
*/
router.get('/usuarios', authMiddleware, UsuariosController.index);
router.put('/usuario/:usuario_id', authMiddleware, UsuariosController.update);
router.delete('/usuario/:usuario_id', authMiddleware, UsuariosController.delete);

router.post('/usuarios', UsuariosController.store);
router.post('/usuario/login', UsuariosController.login);

/* Ao utilizar essa sintaxe todas as rotas definidas abaixo terão que passar pelo middleware */
router.use(authMiddleware);
    router.get('/contabilidade/:usuario_id', ContabilidadesController.index);
    router.post('/contabilidade/:usuario_id', ContabilidadesController.store);
    router.put('/contabilidade/:id', ContabilidadesController.update);
    router.delete('/contabilidade/:id', ContabilidadesController.delete);



module.exports = router;