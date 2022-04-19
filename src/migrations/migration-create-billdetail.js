'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BillDetail', {
        BillNumber: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ItemID: {
        type: Sequelize.INTEGER
      },
      Number: {
        type: Sequelize.INTEGER
      },
      NoteItem: {
        type: Sequelize.STRING
      },
      CurrentPrice: {
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
    await queryInterface.dropTable('BillDetail');
  }
};