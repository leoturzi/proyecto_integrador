const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// middlewares
const uploadFile = require('../middlewares/multerRegister');
const { validations } = require('../middlewares/registerValidator');

//Express validator ya está instalado, falta setear

router.get('/login', usersController.login);
// mostrar vista registro
router.get('/register', usersController.register);
// procesar datos de registro
router.post(
	'/register',
	uploadFile.single('avatar'),
	validations,
	usersController.processRegister
);

router.get('/user', usersController.userProfile);

module.exports = router;
