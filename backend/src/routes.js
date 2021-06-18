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


router.get('/contabilidade2/:contabilidade_id', authMiddleware, ContabilidadesController.getContabilidade);

router.get('/contabilidade/:usuario_id', authMiddleware, ContabilidadesController.index);
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