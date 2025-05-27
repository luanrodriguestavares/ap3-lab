const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const menuItemController = require('../controllers/menuItemController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/categories', categoryController.getCategories);
router.post('/categories', authMiddleware, categoryController.createCategory);
router.put('/categories/:id', authMiddleware, categoryController.updateCategory);
router.delete('/categories/:id', authMiddleware, categoryController.deleteCategory);

router.get('/items', menuItemController.getAllMenuItems);
router.get('/items/:id', menuItemController.getMenuItemById);
router.post('/items', authMiddleware, menuItemController.createMenuItem);
router.put('/items/:id', authMiddleware, menuItemController.updateMenuItem);
router.delete('/items/:id', authMiddleware, menuItemController.deleteMenuItem);
router.get('/categories/:categoryId/items', menuItemController.getMenuItemsByCategory);

module.exports = router; 