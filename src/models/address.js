'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Addresses.hasMany(models.Bills, { foreignKey: 'addressID'});
      Addresses.belongsTo(models.Users, );
    }
  };
  Addresses.init({
    userID: DataTypes.INTEGER,
    detail: DataTypes.STRING,
    province: DataTypes.STRING,
    district: DataTypes.STRING,
    ward: DataTypes.STRING,
    default: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Addresses',
  });
  return Addresses;
};