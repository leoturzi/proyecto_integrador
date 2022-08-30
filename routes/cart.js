const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', cartController.cart);
router.get('/dispatch', cartController.dispatch)

module.exports = router