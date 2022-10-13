const express = require('express');
const router = express.Router()
const productsController = require('../controllers/productsController')
// Instancia de multer, prop diskStorage (storage) - Middleware
const uploadFile = require('../middlewares/multerProducts');
const authValidator = require('../middlewares/authValidator');
const adminValidator = require('../middlewares/adminValidator');
//Express validator ya está instalado, falta setear

//Listado de productos - OK
router.get('/', productsController.list);

//Crear
router.get('/create',authValidator, adminValidator, productsController.create)
//Guardar
router.post('/', uploadFile.single('image'), productsController.store)

//Detalle
router.get('/:id', productsController.detail)

//Editar
router.get('/:id/edit', authValidator, adminValidator, productsController.edit)
//Actualizar
router.put('/:id', uploadFile.single('newImage'), productsController.update)

//Borrar
router.delete('/:id', adminValidator, productsController.delete)

module.exports = router