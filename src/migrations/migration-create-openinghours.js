'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OpeningHours', {
        OpenID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FromHour: {
        type: Sequelize.INTEGER
      },
      FromMin: {
        type: Sequelize.INTEGER
      },
      ToHour: {
        type: Sequelize.INTEGER
      },
      ToMin: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OpeningHours');
  }
};