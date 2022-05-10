'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SalesReport.init({
    year: DataTypes.INTEGER,
    month: DataTypes.INTEGER,
    totalRevenue: DataTypes.BIGINT,
    totalBillCount: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'SalesReports',
  });
  return SalesReport;
};