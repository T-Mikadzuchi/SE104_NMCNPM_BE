'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Staff.init({
    userID: DataTypes.INTEGER,
    restaurantID: DataTypes.INTEGER,
    workingday: DataTypes.DATE,
    staffStatus: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Staffs',
  });
  return Staff;
};