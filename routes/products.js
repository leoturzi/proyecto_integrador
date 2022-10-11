const express = require('express');
const router = express.Router()
const productsController = require('../controllers/productsController')
// Instancia de multer, prop diskStorage (storage) - Middleware
const uploadFile = require('../middlewares/multerProducts');
const authValidator = require('../middlewares/authValidator');
//Express validator ya está instalado, falta setear

//Listado de productos - OK
router.get('/', productsController.list);

//Crear
router.get('/create',authValidator, productsController.create)
//Guardar
router.post('/', uploadFile.single('image'), productsController.store)

//Detalle
router.get('/:id', productsController.detail)

//Editar
router.get('/:id/edit', authValidator, productsController.edit)
//Actualizar
router.put('/:id', uploadFile.single('newImage'), productsController.update)

//Borrar
router.delete('/:id', productsController.delete)

module.exports = router