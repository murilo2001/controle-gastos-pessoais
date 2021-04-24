import APIService from '@/services/APIService.js'

export default {
  postLogar(email, senha) {
    const postData = { email: email, senha: senha, is_logged: true };
    return APIService.apiCall().post('/usuario/login',JSON.stringify(postData),
    )
  }
}
