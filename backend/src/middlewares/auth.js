/* Quando chega uma requisição na rota esse midleware faz a interceptação */

const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    /* Caso o authorization vier vazio = token não existir */
    if(!authHeader) {
        return res.status(401).send({error: 'Nenhum token fornecido'});
    }

    /* O Token vem com a seguite sintaxe: (Bearer avk12fvxvcvkcx3f...),
    o split serve para dividir esse token transformando em um array[2]
    */
    const parts = authHeader.split(' ');

    /* Caso apos o split não houver duas partes no array, res.status(401) = não autorizado */
    if (!parts.length == 2) {
        return res.status(401).send({ error: 'Token error!'});
    }

    /* desetrutura o array, index 0 nome = scheme, index 1 nome = token */
    const [scheme, token] = parts;

    /* regex para verificar se existe Bearer dentro de scheme, caso não = 401 = não autorizado */
    if(!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({error: 'Token mal formatado'});
    }

    /* jwt ira validar o token com base no secret e gerar uma função, caso error = err, caso valido = decoded */
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send ({error: 'Token invalido'});

        //req.usuario_id = decoded.id;
        //console.log(token);
        //console.log(decoded.id);

        return next();
    })
}