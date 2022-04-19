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
    BillNumber: DataTypes.INTEGER,
    ItemID: DataTypes.INTEGER,
    Number: DataTypes.INTEGER,
    NoteItem: DataTypes.STRING,
    CurrentPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BillDetail',
  });
  return BillDetail;
};