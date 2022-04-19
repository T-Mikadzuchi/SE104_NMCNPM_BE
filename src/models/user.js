'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    UserName: DataTypes.STRING,
    PassWord: DataTypes.STRING,
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    DOB: DataTypes.DATE,
    PhoneNumber: DataTypes.STRING,
    Email: DataTypes.STRING,
    Address: DataTypes.STRING,
    Gender: DataTypes.STRING,
    RoleID: DataTypes.INTEGER,
    Avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};