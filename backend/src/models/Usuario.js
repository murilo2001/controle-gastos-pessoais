const { Model, Sequelize } = require('sequelize');

class Usuario extends Model {
    static init(sequelize) {
        super.init({
            nome: Sequelize.STRING,
            email: Sequelize.STRING,
            senha: Sequelize.STRING,
            is_logged: Sequelize.BOOLEAN
        }, { sequelize })
    }
}

module.exports = Usuario;