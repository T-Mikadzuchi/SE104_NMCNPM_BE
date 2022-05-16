'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bills.belongsTo(models.Allcodes, { foreignKey: 'payment', targetKey: 'key' , as: 'paymentData' })
      Bills.belongsTo(models.Allcodes, { foreignKey: 'billstatus', targetKey: 'key' , as: 'billstatusData' })
      Bills.belongsTo(models.Users);
      Bills.belongsTo(models.Restaurants);
      Bills.belongsTo(models.DailyReports, { foreignKey: 'dailyRpID', targetKey: 'id' , as: 'dailyRpData' });
      Bills.hasMany(models.BillDetails, { foreignKey: 'billID' });
    }
  };
  Bills.init({
    userID: DataTypes.INTEGER,
    restaurantID: DataTypes.INTEGER,
    dailyRpID: DataTypes.INTEGER,
    date: DataTypes.DATE,
    total: DataTypes.INTEGER,
    ship: DataTypes.INTEGER,
    payment: DataTypes.INTEGER,
    billstatus: DataTypes.INTEGER,
    deliPhoneNum: DataTypes.STRING,
    deliAddress: DataTypes.STRING,
    deliProvince: DataTypes.STRING,
    deliDistrict: DataTypes.STRING, 
    deliWard: DataTypes.STRING,
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bills',
  });
  return Bills;
};