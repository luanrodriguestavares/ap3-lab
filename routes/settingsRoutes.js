const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const auth = require('../middleware/auth');

router.get('/public', settingsController.getPublicSettings);

router.use(auth);

router.get('/', settingsController.getSettings);

router.put('/general', settingsController.updateGeneralSettings);

router.put('/order', settingsController.updateOrderSettings);

module.exports = router; 