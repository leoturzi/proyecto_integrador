const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// middlewares
const uploadFile = require('../middlewares/multerRegister');
const { validations } = require('../middlewares/registerValidator');
const { editUserValidations } = require('../middlewares/editUserValidator');
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

// Lo dejo con método GET porque para el DELETE necesitamos un <form>. Mas adelante
router.delete('/delete/:id', authValidator, usersController.delete);

router.get('/edit/:id', authValidator, usersController.edit);
router.put('/update/:id', uploadFile.single('avatar'), editUserValidations, usersController.update);

module.exports = router;