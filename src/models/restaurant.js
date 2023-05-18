"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Restaurants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Restaurants.hasMany(models.Staffs, { foreignKey: "restaurantID" });
      Restaurants.belongsTo(models.OpeningHours, {
        foreignKey: "openID",
        targetKey: "id",
        as: "openData",
      });
      Restaurants.hasMany(models.Bills, { foreignKey: "restaurantID" });
    }
  }
  Restaurants.init(
    {
      openID: DataTypes.INTEGER,
      resAddress: DataTypes.STRING,
      longitude: DataTypes.FLOAT,
      latitude: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Restaurants",
    }
  );
  return Restaurants;
};
