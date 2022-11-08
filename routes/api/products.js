const express = require('express');
const router = express.Router()
const productsControllerAPI = require('../../controllers/api/productsController')


//All products
router.get('/', productsControllerAPI.allProducts);

//Products 10 per page
router.get('/:page?/:pagenumber', productsControllerAPI.page);

//Detalle
router.get('/:id', productsControllerAPI.detail);
module.exports = router