"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Bills", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userID: {
        type: Sequelize.STRING,
      },
      restaurantID: {
        type: Sequelize.INTEGER,
      },
      dailyRpID: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      total: {
        type: Sequelize.FLOAT,
      },
      ship: {
        type: Sequelize.FLOAT,
      },
      payment: {
        type: Sequelize.INTEGER,
      },
      billstatus: {
        type: Sequelize.INTEGER,
      },
      deliPhoneNum: {
        type: Sequelize.STRING,
      },
      deliAddress: {
        type: Sequelize.STRING,
      },
      deliProvince: {
        type: Sequelize.STRING,
      },
      deliDistrict: {
        type: Sequelize.STRING,
      },
      deliWard: {
        type: Sequelize.STRING,
      },
      note: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Bills");
  },
};
