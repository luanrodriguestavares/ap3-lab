const express = require('express');
const router = express.Router();
const { login, createAdmin } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/login', login);
router.post('/create-admin', auth, createAdmin);

module.exports = router; 