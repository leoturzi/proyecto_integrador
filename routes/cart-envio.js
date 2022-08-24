const express = require('express');
const router = express.Router()
const cartEnvioController = require('../controllers/cart-envioController')

router.get('/', cartEnvioController.show)

module.exports = router;