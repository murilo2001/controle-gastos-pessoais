const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Usuario = require('../models/Usuario');

const connection = new Sequelize(dbConfig);

Usuario.init(connection); /* Possibilita conexão da model com o banco de dados */

module.exports = connection; 