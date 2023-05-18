"use strict";
const { Model } = require("sequelize");
import Users from "../models/user";

module.exports = (sequelize, DataTypes) => {
  class Allcodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Allcodes.hasMany(models.Users, { foreignKey: "roleID", as: "roleData" });
      Allcodes.hasMany(models.Staffs, {
        foreignKey: "staffstatus",
        as: "staffstatusData",
      });
      Allcodes.hasMany(models.Items, { foreignKey: "type", as: "typeData" });
      Allcodes.hasMany(models.Items, {
        foreignKey: "available",
        as: "availableData",
      });
      Allcodes.hasMany(models.Items, {
        foreignKey: "featured",
        as: "featuredData",
      });
      Allcodes.hasMany(models.Bills, {
        foreignKey: "payment",
        as: "paymentData",
      });
      Allcodes.hasMany(models.Bills, {
        foreignKey: "billstatus",
        as: "billstatusData",
      });
    }
  }
  Allcodes.init(
    {
      key: DataTypes.INTEGER,
      type: DataTypes.STRING,
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcodes",
    }
  );

  return Allcodes;
};
