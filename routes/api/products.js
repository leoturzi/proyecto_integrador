const express = require('express');
const router = express.Router()
const productsControllerAPI = require('../../controllers/api/productsController')


//All products
router.get('/', productsControllerAPI.allProducts);

//Detalle
router.get('/:id', productsControllerAPI.detail);

//Products 10 per page
router.get('/page/:pagenumber', productsControllerAPI.page);

module.exports = router