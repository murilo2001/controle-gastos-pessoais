import APIService from '@/services/APIService.js'

export default {
  getContabilidadeUserMonthsComparative(usuario_id) {
    return APIService.apiCall().get('/contabilidade/grafico-comparativo/'+usuario_id);
  },
  getLastMonthYear(usuario_id) {
    return APIService.apiCall().get('/contabilidade/last-month-year/'+usuario_id);
  },
  getContabilidadeUserSummaryLastMonth(usuario_id, ano, mes) {
    return APIService.apiCall().get('/contabilidade/grafico-resumo/'+usuario_id+'/'+ano+'/'+mes);
  },
}
