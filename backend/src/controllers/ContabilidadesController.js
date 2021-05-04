const Usuario = require ('../models/Usuario');
const Contabilidade = require ('../models/Contabilidade');
const KnexDataBase = require ('../config/knex-database');
const PusherController = require('./PusherController');

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

            PusherController.pusherPush('refreshContabilidades', data);
            
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

                PusherController.pusherPush('refreshContabilidades');

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
                
               PusherController.pusherPush('refreshContabilidades');
               
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

            KnexDataBase.select(KnexDataBase.raw(["YEAR(data) as ano", "MONTH(data) as mes"]))
            .where({usuario_id: id})
            .orderBy('ano', 'desc')
            .orderBy('mes', 'desc')
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
    },

    async getContabilidadeUserMonthsComparative(req, res) {
        try {
            const id = req.params.usuario_id;

            KnexDataBase.select(KnexDataBase.raw(["SUM(Valor) as total", "MONTH(data) as mes", "YEAR(data) as ano", "tipo"]))
            .where({usuario_id: id})
            .limit(12)
            .table("contabilidades")
            .orderBy('ano', 'asc')
            .orderBy('mes', 'asc')
            .groupBy('mes')
            .groupBy('ano')
            .groupBy('tipo').then(data => {

                if (data == "" || data == null) {
                    return res.status(200).send({message: "Nenhuma informação correspodente encontrada"});
                };

                return res.status(200).send(data);

            }).catch(err => {
                return res.status(400).json({ error: err });
            });


        } catch (err) {
            return res.status(400).json({ error: err});
        }
    },

    async getLastMonthYear(req, res) {
        try {
            const id = req.params.usuario_id;
            
            KnexDataBase.select(KnexDataBase.raw(["YEAR(data) as ano", "MONTH(data) as mes"]))
            .where({usuario_id: id})
            .limit(1)
            .table("contabilidades")
            .orderBy('ano', 'desc')
            .orderBy('mes', 'desc')
            .then(data => {

                if (data == "" || data == null) {
                    return res.status(200).send({message: "Nenhuma informação correspodente encontrada"});
                };

                return res.status(200).send(data);

            }).catch(err => {
                return res.status(400).json({ error: err });
            });


        } catch (err) {
            return res.status(400).json({ error: err});
        }
    },

    async getContabilidadeUserSummaryLastMonth(req, res) {
        try {
            const id = req.params.usuario_id;
            const ano = req.params.ano;
            const mes = req.params.mes;

            KnexDataBase.select(["nome", "valor"]).whereRaw(`usuario_id = ${id} AND YEAR(data) = ${ano} AND MONTH(data) = ${mes}`).table("contabilidades")
            .then(data => {

                if (data == "" || data == null) {
                    return res.status(200).send({message: "Nenhuma informação correspodente encontrada"});
                };

                return res.status(200).send(data);

            }).catch(err => {
                return res.status(400).json({ error: err });
            });


        } catch (err) {
            return res.status(400).json({ error: err});
        }
    },
}