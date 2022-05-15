'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,      
        type: Sequelize.INTEGER
      },
      userID: {
        type: Sequelize.INTEGER
      },
      restaurantID: {
        type: Sequelize.INTEGER
      },
      dailyRpID: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      total: {
        type: Sequelize.INTEGER
      },
      ship: {
        type: Sequelize.INTEGER
      },
      payment: {
        type: Sequelize.INTEGER
      },
      billstatus: {
        type: Sequelize.INTEGER
      },
      deliPhoneNum: {
        type: Sequelize.STRING
      },
      deliAddress: {
        type: Sequelize.STRING
      },
      deliProvince: {
        type: Sequelize.STRING
      },
      deliDistrict: {
        type: Sequelize.STRING
      },
      deliWard: {
        type: Sequelize.STRING
      },
      note: {
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
    await queryInterface.dropTable('Bills');
  }
};