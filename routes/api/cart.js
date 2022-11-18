const express = require('express');
const router = express.Router()
const cartControllerAPI = require('../../controllers/api/cartController')


// GET all orders
router.get('/orders', cartControllerAPI.allOrders);
// GET all details of 1 order
router.get('/orders/details/:orderId', cartControllerAPI.orderDetails);
// POST - Create order
router.post('/orders/create', cartControllerAPI.createOrder);
// POST - create EACH orderDetail (pivot table)
router.post('/orders/createDetails',cartControllerAPI.createOrderDetailsRecord);
module.exports = router