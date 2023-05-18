"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OpeningHours extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OpeningHours.hasMany(models.Restaurants, {
        foreignKey: "openID",
        as: "openData",
      });
    }
  }
  OpeningHours.init(
    {
      fromHour: DataTypes.INTEGER,
      fromMin: DataTypes.INTEGER,
      toHour: DataTypes.INTEGER,
      toMin: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OpeningHours",
    }
  );
  return OpeningHours;
};
