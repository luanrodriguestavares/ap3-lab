const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tableId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pendente', 'confirmado', 'preparando', 'pronto', 'entregue'),
    defaultValue: 'pendente',
  },
  items: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('items');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('items', JSON.stringify(value));
    }
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'Orders',
  timestamps: true,
  hooks: {
    beforeCreate: (order) => {
      if (typeof order.items === 'string') {
        order.items = JSON.parse(order.items);
      }
    },
    beforeUpdate: (order) => {
      if (typeof order.items === 'string') {
        order.items = JSON.parse(order.items);
      }
    }
  }
});

module.exports = Order; 