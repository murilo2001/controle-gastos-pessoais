const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = {

    /* função para gerar token que recebe como params o id do usuario */
    gerarToken(params = {}) {
        /* Irá ser gerado um token com base no id do usuario e no secret */
        return jwt.sign(params, authConfig.secret, {
            expiresIn: 1200, /* 1200 segundos = 20 minutos */
        });
    },

    // refreshToken(usuario_id, token) {
    //
    // }
}