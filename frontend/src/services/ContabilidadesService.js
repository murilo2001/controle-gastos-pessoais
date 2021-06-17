import APIService from '@/services/APIService.js'

export default {
  getListDateContabilidades(usuario_id) {
    return APIService.apiCall().get('/contabilidades/dates/'+usuario_id);
  },
  getContabilidadePerMonthYear(usuario_id, mes, ano) {
    return APIService.apiCall().get('/contabilidade/'+usuario_id+'/'+mes+'/'+ano);
  },
  postContabilidade(usuario_id, nome, tipo, data, valor) {
    const postData = { nome: nome, tipo: tipo, data: data, valor: valor };
    return APIService.apiCall().post('/contabilidade/'+usuario_id, JSON.stringify(postData),
  )},
  deleteContabilidade(id) {
    return APIService.apiCall().delete('/contabilidade/'+id);
  },
  putContabilidade(contabilidade_id, nome, tipo, data, valor) {
    const putData = { nome: nome, tipo: tipo, data: data, valor: valor };
    return APIService.apiCall().put('/contabilidade/'+contabilidade_id, JSON.stringify(putData),
  )},
  gerarPlanilha(mes, ano, usuario_id) {
    return APIService.apiCall().get('/gerar-planilha/'+mes+'/'+ano+'/'+usuario_id, {responseType: 'blob'})
  },
}
