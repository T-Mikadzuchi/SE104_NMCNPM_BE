'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promotions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Promotions.init({
    promotionName: DataTypes.STRING,
    begin: DataTypes.DATE,
    end: DataTypes.DATE,
    value: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Promotions',
  });
  return Promotions;
};