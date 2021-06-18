const Usuario = require ('../models/Usuario');
const bcrypt = require ('bcryptjs');
const tokenController = require('./TokenController');

module.exports = {

    async login(req, res) {
        try {
            const { senha, email } = req.body;

            const usuario = await Usuario.findOne({ where: { email } });

            if (!usuario) {
                return res.status(400).send({
                    status: 0,
                    message: 'E-mail ou senha incerreto!'
                });
            }

            /* compara a senha hash passada no body da req com a senha do usuario do banco */
            if (!bcrypt.compareSync(senha, usuario.senha)) {
                return res.status(400).send({
                    status: 0,
                    message: 'E-mail ou senha incerreto!'
                })
            };

            const usuario_id = usuario.id;

            /* ao colocar senha undefined ira ocultar a senha ao restornar response (200) */
            usuario.senha = undefined;

            const token = tokenController.gerarToken({ id: usuario.id });

            return res.status(200).send({
                status: 1,
                message: "Usuario logado com sucesso!",
                usuario, token
            })
        } catch (err) {
            return res.status(400).json({ error: err});
        }

    },

    async getAllUsers(req, res) {
        try {
            const usuarios = await Usuario.findAll();

            if (usuarios == "" || usuarios == null) {
                return res.status(200).send({message: "Nenhum usuário encontrado"});
            }

            return res.status(200).send({ usuarios });
        } catch (err) {
            return res.status(400).json({ error: err});
        }
    }, 

    async store(req, res) {
        try {
            const { nome, sobrenome, email, senha } = req.body;

            const usuario = await Usuario.create({ nome, sobrenome, email, senha});

            const token = tokenController.gerarToken({ id: usuario.id });
            
            return res.status(200).send({
                status: 1,
                message: "usuário cadastrado com sucesso",
                usuario, token
            });
        } catch (err) {
            return res.status(400).json({ error: err});
        }
    },

    async update(req, res) {
        try {
            const { nome, sobrenome, senha } = req.body;
            const { usuario_id } = req.params;
            
            /* criptografa a senha */
            const salt = bcrypt.genSaltSync();
            let senhaCrypt = bcrypt.hashSync(senha, salt);
            
            if (senha) {
                await Usuario.update({
                    nome: nome, sobrenome: sobrenome, senha: senhaCrypt
                },{
                    where: {
                        id: usuario_id
                    }
                });
            } else {
                await Usuario.update({
                    nome: nome, sobrenome: sobrenome
                },{
                    where: {
                        id: usuario_id
                    }
                });
            }

            return res.status(200).send({
                status: 1,
                message: "usuário atualizado com sucesso"
            });
        } catch (err) {
            return res.status(400).json({ error: err});
        }
    },

    async delete(req, res) {
        try {
            const { usuario_id } = req.params;

            await Usuario.destroy({
                where: {
                    id: usuario_id
                }
            });

            return res.status(200).send({
                status: 1,
                message: "usuário deletado com sucesso"
            });
        } catch (err) {
            return res.status(400).json({ error: err});
        }
    },
}