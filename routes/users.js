const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// middlewares
const uploadFile = require('../middlewares/multerRegister');
const { validations } = require('../middlewares/registerValidator');
const guestValidator = require('../middlewares/guestValidator');
const authValidator = require('../middlewares/authValidator');

//Express validator ya está instalado, falta setear

// Formulario Login vista
router.get('/login', guestValidator, usersController.login);

// Procesar Login
router.post('/login', usersController.loginProcess);

// Formulario Registro vista
router.get('/register', guestValidator, usersController.register);

// Procesar Registro
router.post(
	'/register',
	uploadFile.single('avatar'),
	validations,
	usersController.processRegister
);

router.get('/profile', authValidator, usersController.userProfile);

router.get('/logout', usersController.logout);

module.exports = router;
