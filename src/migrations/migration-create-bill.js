'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bill', {
        BillNumber: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserName: {
        type: Sequelize.STRING
      },
      RestaurantID: {
        type: Sequelize.INTEGER
      },
      Date: {
        type: Sequelize.DATE
      },
      Total: {
        type: Sequelize.INTEGER
      },
      Ship: {
        type: Sequelize.INTEGER
      },
      Payment: {
        type: Sequelize.INTEGER
      },
      BillStatus: {
        type: Sequelize.INTEGER
      },
      DeliAddress: {
        type: Sequelize.STRING
      },
      DeliPhoneNumber: {
        type: Sequelize.STRING
      },
      Note: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Bill');
  }
};