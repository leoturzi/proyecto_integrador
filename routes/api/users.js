const express = require('express');
const router = express.Router();
const usersControllerAPI = require('../../controllers/api/usersController');

//Express validator ya está instalado, falta setear

// Formulario Login vista
router.get('/', usersControllerAPI.list);

// Procesar Login
router.get('/:id', usersControllerAPI.detail);

module.exports = router;
