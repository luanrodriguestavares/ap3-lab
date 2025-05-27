require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('./socket');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const tableRoutes = require('./routes/tableRoutes');
const User = require('./models/User');
const Category = require('./models/Category');
const MenuItem = require('./models/MenuItem');
const RestaurantSettings = require('./models/RestaurantSettings');

const app = express();
const server = http.createServer(app);

socketIO.init(server);

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/tables', tableRoutes);

const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ where: { username: 'admin' } });
    if (!adminExists) {
      await User.create({
        name: 'Administrador',
        email: 'admin@mesadigital.com',
        username: 'admin',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Usuário admin padrão criado com sucesso!');
    }
  } catch (error) {
    console.error('Erro ao criar usuário admin padrão:', error);
  }
};

const PORT = process.env.PORT || 3001;

sequelize.sync()
  .then(() => createDefaultAdmin())
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  }); 