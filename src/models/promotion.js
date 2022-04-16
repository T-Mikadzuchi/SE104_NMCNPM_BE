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
  Promotion.init({
    PromotionID: DataTypes.INTEGER,
    PromotionName: DataTypes.STRING,
    Begin: DataTypes.DATE,
    End: DataTypes.DATE,
    Banner: DataTypes.STRING,
    Value: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Promotion',
  });
  return Promotion;
};