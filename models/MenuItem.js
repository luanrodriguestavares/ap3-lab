const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');

const MenuItem = sequelize.define('MenuItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

MenuItem.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(MenuItem, { foreignKey: 'categoryId' });

module.exports = MenuItem; 