'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      UserName: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      PassWord: {
        type: Sequelize.STRING
      },
      FirstName: {
        type: Sequelize.STRING
      },
      LastName: {
        type: Sequelize.STRING
      },
      DOB: {
        type: Sequelize.DATE
      },
      PhoneNumber: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      Address: {
        type: Sequelize.STRING
      },
      Gender: {
        type: Sequelize.STRING
      },
      RoleID: {
        type: Sequelize.INTEGER
      },
      Avatar: {
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
    await queryInterface.dropTable('User');
  }
};