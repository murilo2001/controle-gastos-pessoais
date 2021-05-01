const { Model, Sequelize } = require('sequelize');
const bcrypt = require ('bcryptjs');

class Usuario extends Model {
    static init(sequelize) {
        super.init({
            nome: Sequelize.STRING,
            sobrenome: Sequelize.STRING,
            email: Sequelize.STRING,
            senha: Sequelize.STRING,
        }, { 
            sequelize,
            hooks: {
                /* beforeCreate antes de criar o usuario ira criptografar a senha */
                beforeCreate: (usuario) => {
                    const salt = bcrypt.genSaltSync();
                    usuario.senha = bcrypt.hashSync(usuario.senha, salt);
                }
            }
        })
    }

    static associate(models) {
        this.hasMany(models.Contabilidade, { foreignKey: 'usuario_id', as: 'contabilidade'}); /* hasMany = tem muitos */
    }
}

module.exports = Usuario;