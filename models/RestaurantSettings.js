const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RestaurantSettings = sequelize.define('RestaurantSettings', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  restaurantName: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Mesa Digital'
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  orderSettings: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {
      orderPrefix: 'MD-',
      orderStartNumber: 1001,
      preparationTime: 20,
      taxRate: 10
    }
  }
});

module.exports = RestaurantSettings; 