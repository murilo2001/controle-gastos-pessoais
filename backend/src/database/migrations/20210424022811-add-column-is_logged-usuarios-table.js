'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn(
      'usuarios',
      'is_logged',
    {
      type: Sequelize.BOOLEAN,
      after: "senha",
    });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('usuarios','is_logged');
  }
};
