const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Tentativa de login para usuário:', username);

    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.log('Usuário não encontrado:', username);
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }

    console.log('Usuário encontrado, verificando senha...');
    const isValidPassword = await user.validatePassword(password);
    console.log('Resultado da validação da senha:', isValidPassword);

    if (!isValidPassword) {
      console.log('Senha inválida para usuário:', username);
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }

    const token = generateToken(user);
    console.log('Login bem-sucedido para usuário:', username);
    res.json({
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error('Erro durante o login:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    const user = await User.create({
      username,
      password,
      role: 'admin',
    });

    const token = generateToken(user);
    res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

module.exports = {
  login,
  createAdmin,
}; 