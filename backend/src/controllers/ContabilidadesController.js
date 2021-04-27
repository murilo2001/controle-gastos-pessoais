const Usuario = require ('../models/Usuario');
const Contabilidade = require ('../models/Contabilidade');
const KnexDataBase = require ('../config/knex-database');

module.exports = {

    async index(req, res) {
        const { usuario_id } = req.params;

        /* Irá resgatar o usuario cujo PrimaryKey é = usuario_Id e ira trazer também sua associação com a tabela contabilidade */
        const usuario = await Usuario.findByPk(usuario_id, {
            include: { association: 'contabilidade'}
        });

        if (!usuario) {
            return res.status(400).send({
                status: 0,
                message: 'Nenhuma contabilidade encontrada!'
            });
        }

        return res.status(200).send(usuario.contabilidade);
    }, 

    async store(req, res) {
        try {
            const { usuario_id } = req.params;
            const { nome, tipo, data, valor } = req.body;

            const usuario = await Usuario.findByPk(usuario_id);

            if (!usuario) {
                return res.status(400).json({
                    status: 0,
                    message: 'Usuário não encontrado'
                });
            }

            const contabilidade = await Contabilidade.create({
                nome, tipo, data, valor, usuario_id
            });

            return res.status(200).json({
                status: 1,
                message: 'Contabilidade cadastrada com sucesso!',
                contabilidade
            });
        } catch (err) {
            return res.status(400).json({ error: err});
        }
    },

    async update(req, res) {
        const id = req.params.id;
        const { nome, tipo, data, valor } = req.body;

        try {
            const contabilidade = await Contabilidade.findByPk(id);

            if (contabilidade) {
                await Contabilidade.update({ nome, tipo, data, valor }, { where : { id: id } })

                return res.status(200).json({
                    status: 1,
                    message: "contabilidade atualizada com sucesso"
                });
            } else {
                return res.status(400).json({
                    status: 0,
                    message: 'Nenhuma contabilidade encontrada!'
                });
            }
        } catch (err) {
            return res.status(400).json({ error: err });
        }
    },

    async delete(req, res) {
        const id = req.params.id;

        try {
           const contabilidade = await Contabilidade.findByPk(id);

           if (contabilidade) {
               await Contabilidade.destroy({ where: { id } });

               return res.status(200).json({
                status: 1,
                message: "Contablidade excluida com sucesso!"
               });
           } else {
               return res.status(400).json({
                   status: 0,
                   message: 'Nenhuma contabilidade encontrada!'
               });
           }
        } catch (err) {
            return res.status(400).json({ error: err });
        }
    },

    async getListDateContabilidadesUser(req, res) {
        try {
            const id = req.params.usuario_id;

            KnexDataBase.select(KnexDataBase.raw(["YEAR(data) as Ano", "MONTH(data) as Mes"]))
            .where({usuario_id: id})
            .table("contabilidades").then(data => {
                return res.status(200).send(data);
            }).catch(err => {
                return res.status(400).json({ error: err });
            });

        } catch (err) {
            return res.status(400).json({ error: err});
        }
    },

    async getContabilidadePerMonthYear(req, res) {
        try {
            const usuario_id = req.params.usuario_id;
            const mes = req.params.mes;
            const ano = req.params.ano;

            KnexDataBase.select("*").whereRaw(`usuario_id = ${usuario_id} AND MONTH(data) = ${mes} AND YEAR(data) = ${ano}`)
            .table("contabilidades").then(data => {
                
                if (data == "" || data == null) {
                    return res.status(200).send({message: "Nenhuma contabilidade encontrada para essa data"});
                };

                return res.status(200).send(data);

            }).catch(err => {
                return res.status(400).json({ error: err });
            });


        } catch (err) {
            return res.status(400).json({ error: err});
        }
    }
}