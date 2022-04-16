'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OpeningHours extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OpeningHours.init({
    OpenID: DataTypes.INTEGER,
    FromHour: DataTypes.INTEGER,
    FromMin: DataTypes.INTEGER,
    ToHour: DataTypes.INTEGER,
    ToMin: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OpeningHours',
  });
  return OpeningHours;
};