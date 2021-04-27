const express = require('express');
const UsuariosController = require('./controllers/UsuariosController');
const ContabilidadesController = require('./controllers/ContabilidadesController');
const authMiddleware = require('./middlewares/auth');

const router = express.Router();

/* 
    obs: essas duas rotas deixei sem o middleware de auth pois ele não precisam validar o token
*/
router.post('/usuarios', UsuariosController.store);
router.post('/usuario/login', UsuariosController.login);

router.get('/usuarios', authMiddleware, UsuariosController.index);
router.put('/usuario/:usuario_id', authMiddleware, UsuariosController.update);
router.delete('/usuario/:usuario_id', authMiddleware, UsuariosController.delete);

router.get('/contabilidade/:usuario_id', authMiddleware, ContabilidadesController.index);
router.post('/contabilidade/:usuario_id', authMiddleware, ContabilidadesController.store);
router.put('/contabilidade/:id', authMiddleware, ContabilidadesController.update);
router.delete('/contabilidade/:id', authMiddleware, ContabilidadesController.delete);
router.get('/contabilidades/dates/:usuario_id', authMiddleware, ContabilidadesController.getListDateContabilidadesUser);
router.get('/contabilidade/:usuario_id/:mes/:ano', authMiddleware, ContabilidadesController.getContabilidadePerMonthYear);

module.exports = router;