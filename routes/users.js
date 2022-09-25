const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const multer = require('multer');
const path = require('path');
//Falta configurar multer
//Express validator ya está instalado, falta setear

router.get('/login', usersController.login);
router.get('/register', usersController.register);
router.get('/user', usersController.userProfile);

module.exports = router;
