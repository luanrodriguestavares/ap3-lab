const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', orderController.createOrder);

router.get('/table/:tableId', orderController.getOrdersByTable);

router.get('/', orderController.getAllOrders);

router.put('/:id/status', orderController.updateOrderStatus);

module.exports = router; 