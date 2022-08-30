const express = require('express');
const router = express.Router();
const productEditController = require('../controllers/product-editController');

router.get('/', productEditController.show);

module.exports = router;