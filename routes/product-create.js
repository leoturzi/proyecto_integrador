const express = require('express');
const router = express.Router();
const productCreateController = require('../controllers/product-createController');

router.get('/', productCreateController.show);

module.exports = router;