const { Model, Sequelize } = require('sequelize');

class Contabilidade extends Model {
    static init(sequelize) {
        super.init({
            nome: Sequelize.STRING,
            tipo: Sequelize.ENUM('receita','despesa'),
            data: Sequelize.DATE,
            valor: Sequelize.DECIMAL
        }, { 
            sequelize,
        })
    }
    static associate(models) {
        this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario'}); /* belongsTo = Pertence a um */
    }
}

module.exports = Contabilidade;