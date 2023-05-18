"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Promotions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      promotionName: {
        type: Sequelize.STRING,
      },
      begin: {
        type: Sequelize.DATE,
      },
      end: {
        type: Sequelize.DATE,
      },
      value: {
        type: Sequelize.FLOAT,
      },
      banner: {
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
    await queryInterface.dropTable("Promotions");
  },
};
