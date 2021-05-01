'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn(
      'usuarios',
      'sobrenome',
    {
      type: Sequelize.STRING,
      allowNull: false,
      after: "senha",
    });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('usuarios','sobrenome');
  }
};
