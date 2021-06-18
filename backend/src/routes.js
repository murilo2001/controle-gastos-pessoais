const express = require('express');
const UsuariosController = require('./controllers/UsuariosController');
const ContabilidadesController = require('./controllers/ContabilidadesController');
const authMiddleware = require('./middlewares/auth');

const router = express.Router();

/* 
    obs: essas duas rotas deixei sem o middleware de auth pois ele não precisam validar o token
*/
router.post('/usuario/login', UsuariosController.login);
router.post('/usuarios/create', UsuariosController.store);
router.put('/usuario/update/:usuario_id', authMiddleware, UsuariosController.update);


router.get('/getContabilidade/:contabilidade_id', authMiddleware, ContabilidadesController.getContabilidade);
router.post('/contabilidade/:usuario_id', authMiddleware, ContabilidadesController.store);
router.put('/contabilidade/:id', authMiddleware, ContabilidadesController.update);
router.delete('/contabilidade/:id', authMiddleware, ContabilidadesController.delete);
router.get('/contabilidades/dates/:usuario_id', authMiddleware, ContabilidadesController.getListDateContabilidadesUser);
router.get('/contabilidade/:usuario_id/:mes/:ano', authMiddleware, ContabilidadesController.getContabilidadePerMonthYear);
router.get('/contabilidade/last-month-year/:usuario_id', authMiddleware, ContabilidadesController.getLastMonthYear);
router.get('/contabilidade/grafico-comparativo/:usuario_id', authMiddleware, ContabilidadesController.getContabilidadeUserMonthsComparative);
router.get('/contabilidade/grafico-resumo/:usuario_id/:ano/:mes', authMiddleware, ContabilidadesController.getContabilidadeUserSummaryLastMonth);
router.get('/gerar-planilha/:mes/:ano/:usuario_id', authMiddleware, ContabilidadesController.gerarPlanilha);

module.exports = router;


/* ROTAS NÃO UTILIZADAS POREM CRIADAS

router.get('/getAllUsers', authMiddleware, UsuariosController.getAllUsers);
router.delete('/usuario/delete/:usuario_id', authMiddleware, UsuariosController.delete);
router.get('/contabilidade/:usuario_id', authMiddleware, ContabilidadesController.index);

*/