const { Model, Sequelize } = require('sequelize');
const bcrypt = require ('bcryptjs');

class Usuario extends Model {
    static init(sequelize) {
        super.init({
            nome: Sequelize.STRING,
            email: Sequelize.STRING,
            senha: Sequelize.STRING,
            is_logged: Sequelize.BOOLEAN
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
}

module.exports = Usuario;