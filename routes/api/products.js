const express = require('express');
const router = express.Router()
const productsControllerAPI = require('../../controllers/api/productsController')


//Listado de productos
router.get('/', productsControllerAPI.list);
router.get('/next/:page?', productsControllerAPI.list);

//Detalle
router.get('/:id', productsControllerAPI.detail);
module.exports = router