const RestaurantSettings = require('../models/RestaurantSettings');

exports.getSettings = async (req, res) => {
  try {
    let settings = await RestaurantSettings.findOne();
    
    if (!settings) {
      settings = await RestaurantSettings.create({});
    }
    
    res.json(settings);
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    res.status(500).json({ error: 'Erro ao buscar configurações' });
  }
};

exports.updateGeneralSettings = async (req, res) => {
  try {
    const { restaurantName, phone, email } = req.body;
    
    let settings = await RestaurantSettings.findOne();
    
    if (!settings) {
      settings = await RestaurantSettings.create({
        restaurantName,
        phone,
        email
      });
    } else {
      await settings.update({
        restaurantName,
        phone,
        email
      });
    }
    
    res.json(settings);
  } catch (error) {
    console.error('Erro ao atualizar configurações gerais:', error);
    res.status(500).json({ error: 'Erro ao atualizar configurações gerais' });
  }
};

exports.updateOrderSettings = async (req, res) => {
  try {
    const orderSettings = req.body;
    
    let settings = await RestaurantSettings.findOne();
    
    if (!settings) {
      settings = await RestaurantSettings.create({ orderSettings });
    } else {
      await settings.update({ orderSettings });
    }
    
    res.json(settings);
  } catch (error) {
    console.error('Erro ao atualizar configurações de pedidos:', error);
    res.status(500).json({ error: 'Erro ao atualizar configurações de pedidos' });
  }
};

exports.getPublicSettings = async (req, res) => {
  try {
    let settings = await RestaurantSettings.findOne();
    
    if (!settings) {
      settings = await RestaurantSettings.create({});
    }
    
    const publicSettings = {
      restaurantName: settings.restaurantName,
      phone: settings.phone,
      email: settings.email
    };
    
    res.json(publicSettings);
  } catch (error) {
    console.error('Erro ao buscar configurações públicas:', error);
    res.status(500).json({ error: 'Erro ao buscar configurações públicas' });
  }
}; 