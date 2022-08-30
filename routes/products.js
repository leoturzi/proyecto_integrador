const express = require('express');
const router = express.Router()
const productsController = require('../controllers/productsController')

router.get('/', productsController.list);

router.get('/create', productsController.create)

router.get('/:id', productsController.detail)

router.post('/', productsController.store)

router.get('/:id/edit', productsController.edit)

router.put('/:id', productsController.update)

router.delete('/:id', productsController.delete)

module.exports = router