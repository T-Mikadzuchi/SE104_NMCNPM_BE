'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BillDetails', {
        id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      billID: {
        type: Sequelize.INTEGER
      },
      itemID: {
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.INTEGER
      },
      noteItem: {
        type: Sequelize.STRING
      },
      currentprice: {
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
    await queryInterface.dropTable('BillDetails');
  }
};