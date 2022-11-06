const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authValidator = require('../middlewares/authValidator');

router.get('/', authValidator, cartController.cart);
router.get('/dispatch', authValidator, cartController.dispatch);
router.get('/payment', authValidator, cartController.payment);

module.exports = router