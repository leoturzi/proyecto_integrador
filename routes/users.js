const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// middlewares
const uploadFile = require('../middlewares/multerRegister');
const { validations } = require('../middlewares/registerValidator');

//Express validator ya está instalado, falta setear

// Formulario Login vista
router.get('/login', usersController.login);

// Procesar Login
router.post('/login', usersController.loginProcess);

// Formulario Registro vista
router.get('/register', usersController.register);

// Procesar Registro
router.post(
	'/register',
	uploadFile.single('avatar'),
	validations,
	usersController.processRegister
);

router.get('/user', usersController.userProfile);

module.exports = router;
