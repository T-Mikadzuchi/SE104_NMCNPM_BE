'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Staffs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Staffs.init({
    userID: DataTypes.INTEGER,
    restaurantID: DataTypes.INTEGER,
    workingday: DataTypes.DATE,
    staffStatus: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Staffs',
  });
  return Staffs;
};