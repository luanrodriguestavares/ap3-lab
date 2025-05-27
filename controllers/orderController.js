const { Order } = require('../models');
const { RestaurantSettings } = require('../models');
const socketIO = require('../socket');
const { Op } = require('sequelize');

// Criar novo pedido
exports.createOrder = async (req, res) => {
  try {
    const { tableId, items, total, notes } = req.body;
    console.log('Criando pedido:', { tableId, items, total, notes });

    // Buscar configurações do restaurante
    const settings = await RestaurantSettings.findOne();
    const orderSettings = settings ? settings.orderSettings : null;
    const prefix = orderSettings ? orderSettings.orderPrefix : 'MD-';
    const startNumber = orderSettings ? orderSettings.orderStartNumber : 1001;

    // Gerar número do pedido
    const lastOrder = await Order.findOne({
      order: [['id', 'DESC']]
    });
    const orderNumber = lastOrder ? lastOrder.id + 1 : startNumber;

    const order = await Order.create({
      tableId,
      status: 'pendente',
      items: JSON.stringify(items),
      total,
      notes,
      orderNumber: `${prefix}${orderNumber}`
    });

    console.log('Pedido criado:', order.toJSON());

    // Emitir evento para a cozinha
    socketIO.getIO().emit('newOrder', order);

    res.status(201).json(order);
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ error: 'Erro ao criar pedido' });
  }
};

// Listar pedidos por mesa
exports.getOrdersByTable = async (req, res) => {
  try {
    const { tableId } = req.params;
    console.log('Buscando pedidos da mesa:', tableId);

    const orders = await Order.findAll({
      where: { tableId },
      order: [['createdAt', 'DESC']]
    });

    console.log('Pedidos encontrados:', orders.length);

    res.json(orders);
  } catch (error) {
    console.error('Erro ao buscar pedidos da mesa:', error);
    res.status(500).json({ error: 'Erro ao buscar pedidos da mesa' });
  }
};

// Listar todos os pedidos (para a cozinha)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: {
        status: {
          [Op.ne]: 'entregue'
        }
      },
      order: [['createdAt', 'DESC']]
    });

    res.json(orders);
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    res.status(500).json({ error: 'Erro ao buscar pedidos' });
  }
};

// Atualizar status do pedido
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log('Atualizando status do pedido:', { id, status });

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    await order.update({ status });
    console.log('Status atualizado:', order.toJSON());

    // Emitir evento para o cliente
    socketIO.getIO().emit('orderStatusUpdate', { id: order.id, status: order.status });

    res.json(order);
  } catch (error) {
    console.error('Erro ao atualizar status do pedido:', error);
    res.status(500).json({ error: 'Erro ao atualizar status do pedido' });
  }
}; 