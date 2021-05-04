import APIService from '@/services/APIService.js'

export default {
  postLogar(email, senha) {
    const postData = { email: email, senha: senha };
    return APIService.apiCall().post('/usuario/login', JSON.stringify(postData),
  )},
  putUpdateUser(usuario_id, nome, sobrenome, senha) {
    const putData = { nome: nome, sobrenome: sobrenome, senha: senha };
    return APIService.apiCall().put('/usuario/'+usuario_id, JSON.stringify(putData),
  )},
  postCreateUser(nome, sobrenome, email, senha) {
    const postData = { nome: nome, sobrenome: sobrenome, email: email, senha: senha };
    return APIService.apiCall().post('/usuarios', JSON.stringify(postData),
  )},
}