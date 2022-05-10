'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DailyReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  DailyReport.init({
    reportID: DataTypes.INTEGER,
    date: DataTypes.DATE,
    revenue: DataTypes.BIGINT,
    billCount: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'DailyReports',
  });
  return DailyReport;
};