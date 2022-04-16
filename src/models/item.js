'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Item.init({
    ItemID: DataTypes.INTEGER,
    ItemName: DataTypes.STRING,
    Type: DataTypes.INTEGER,
    ItemImage: DataTypes.STRING,
    Price: DataTypes.INTEGER,
    Amount: DataTypes.INTEGER,
    Description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};