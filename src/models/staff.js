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
      Staffs.belongsTo(models.Allcodes, { foreignKey: 'staffStatus', targetKey: 'key' , as: 'staffstatusData' })
      Staffs.belongsTo(models.Users);
      Staffs.belongsTo(models.Restaurants);

    }
  };
  Staffs.init({
    userID: DataTypes.STRING,
    restaurantID: DataTypes.INTEGER,
    workingDay: DataTypes.DATE,
    staffStatus: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Staffs',
  });
  return Staffs;
};