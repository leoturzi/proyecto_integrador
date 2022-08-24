const express = require('express');
const router = express.Router()
const productDetailController = require('../controllers/product-detailController')

router.get('/', productDetailController.show);

module.exports = router