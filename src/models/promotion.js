'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promotion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Promotion.init({
    promotionName: DataTypes.STRING,
    begin: DataTypes.DATE,
    end: DataTypes.DATE,
    banner: DataTypes.STRING,
    value: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Promotions',
  });
  return Promotion;
};