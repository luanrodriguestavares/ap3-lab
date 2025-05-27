const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin'),
    defaultValue: 'admin',
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        console.log('Hashando senha para novo usuário...');
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        console.log('Senha hasheada com sucesso');
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        console.log('Hashando senha atualizada...');
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        console.log('Senha atualizada hasheada com sucesso');
      }
    },
  },
});

User.prototype.validatePassword = async function(password) {
  try {
    console.log('Validando senha...');
    const isValid = await bcrypt.compare(password, this.password);
    console.log('Resultado da comparação:', isValid);
    return isValid;
  } catch (error) {
    console.error('Erro ao validar senha:', error);
    return false;
  }
};

module.exports = User; 