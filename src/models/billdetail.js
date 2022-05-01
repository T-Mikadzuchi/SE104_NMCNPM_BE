'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BillDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  BillDetail.init({
    billID: DataTypes.INTEGER,
    itemID: DataTypes.INTEGER,
    number: DataTypes.INTEGER,
    noteItem: DataTypes.STRING,
    currentprice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BillDetails',
  });
  return BillDetail;
};