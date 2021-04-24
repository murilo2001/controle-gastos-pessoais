const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Usuario = require('../models/Usuario');
const Contabilidade = require('../models/Contabilidade');

const connection = new Sequelize(dbConfig);

Usuario.init(connection); /* Possibilita conexão da model com o banco de dados */
Contabilidade.init(connection);

Usuario.associate(connection.models);
Contabilidade.associate(connection.models);

module.exports = connection; 