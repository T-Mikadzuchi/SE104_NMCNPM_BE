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
    StaffID: DataTypes.INTEGER,
    UserName: DataTypes.STRING,
    RestaurantID: DataTypes.INTEGER,
    WorkingDay: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Staff',
  });
  return Staff;
};