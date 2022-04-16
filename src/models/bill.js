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
  Bill.init({
    BillNumber: DataTypes.INTEGER,
    UserName: DataTypes.STRING,
    RestaurantID: DataTypes.INTEGER,
    Date: DataTypes.DATE,
    Total: DataTypes.INTEGER,
    Ship: DataTypes.INTEGER,
    Payment: DataTypes.INTEGER,
    BillStatus: DataTypes.INTEGER,
    DeliAddress: DataTypes.String,
    DeliPhoneNumber: DataTypes.String,
    Note: DataTypes.String
  }, {
    sequelize,
    modelName: 'Bill',
  });
  return Bill;
};