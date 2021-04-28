import APIService from '@/services/APIService.js'

export default {
  getListDateContabilidades(usuario_id) {
    return APIService.apiCall().get('/contabilidades/dates/'+usuario_id);
  },
  getContabilidadePerMonthYear(usuario_id, mes, ano) {
    return APIService.apiCall().get('/contabilidade/'+usuario_id+'/'+mes+'/'+ano);
  },
}
