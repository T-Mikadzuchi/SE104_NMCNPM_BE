'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Items.belongsTo(models.Allcodes, { foreignKey: 'type', targetKey: 'key' , as: 'typeData' })
      Items.belongsTo(models.Allcodes, { foreignKey: 'available', targetKey: 'key' , as: 'availableData' })
      Items.belongsTo(models.Allcodes, { foreignKey: 'featured', targetKey: 'key' , as: 'featuredData' })
      Items.belongsToMany(models.Bills, { through: 'BillDetails', foreignKey: 'itemID' });
    }
  };
  Items.init({
    itemName: DataTypes.STRING,
    type: DataTypes.INTEGER,
    itemImage: DataTypes.STRING,
    price: DataTypes.INTEGER,
    available: DataTypes.INTEGER,
    calories: DataTypes.FLOAT,
    featured: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Items',
  });
  return Items;
};