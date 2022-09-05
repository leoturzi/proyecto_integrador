const express = require('express');
const router = express.Router()
const productsController = require('../controllers/productsController')
const multer = require('multer');
const path = require('path');
//Seteo de multer
const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, 'public/images/products');
    },
    filename : (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname));
    }
})
// Instancia de multer, prop diskStorage (storage) - Middleware
const uploadFile = multer({ storage });

//Express validator ya está instalado, falta setear

//Listado de productos - OK
router.get('/', productsController.list);

//Crear
router.get('/create', productsController.create)
//Guardar
router.post('/', uploadFile.single('image'), productsController.store)

//Detalle
router.get('/:id', productsController.detail)

//Editar
router.get('/:id/edit', productsController.edit)
//Actualizar
router.put('/:id', productsController.update)

//Borrar
router.delete('/:id', productsController.delete)

module.exports = router