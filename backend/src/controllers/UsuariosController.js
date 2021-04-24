const Usuario = require ('../models/Usuario');

module.exports = {

    async login(req, res) {
        const [ senha, email, is_logged ] = req.body;

        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(400).send({
                status: 0,
                message: 'E-mail ou senha incerreto!'
            });
        }

        if (!bcrypt.compareSync(password, usuario.senha)) {
            return res.status(400).send({
                status: 0,
                message: 'E-mail ou senha incerreto!'
            })
        };

        const usuario_id = usuario.id;


    },

    async index(req, res) {
        const usuario = await Usuario.findAll();

        if (usuario == "" || usuario == null) {
            return res.status(200).send({message: "Nenhum usuário encontrado"});
        }

        return res.status(200).send({ usuario });
    }, 

    async store(req, res) {
        const { nome, email, senha } = req.body;

        const usuario = await Usuario.create({ nome, email, senha});

        return res.status(200).send({
            status: 1,
            message: "usuário cadastrado com sucesso",
            usuario
        });
    },

    async update(req, res) {
        const { nome, email, senha } = req.body;
        const { usuario_id } = req.params;

        await Usuario.update({
            nome, email, senha
        },{
            where: {
                id: usuario_id
            }
        });

        return res.status(200).send({
            status: 1,
            message: "usuário atualizado com sucesso"
        });
    },

    async delete(req, res) {
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
    },
}