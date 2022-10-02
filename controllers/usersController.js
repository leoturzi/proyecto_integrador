const { validationResult } = require('../middlewares/registerValidator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const usersController = {
	login: (req, res) => {
		// return res.send('hola');
		return res.render('users/login', { title: 'Login' });
	},
	loginProcess: (req, res) => {
		// volcamos valores del form en variables
		const { username, password, recordarUsuario } = req.body;

		const userToLogin = User.findByField('email', username);

		if (userToLogin) {
			const pwdMatch = bcrypt.compareSync(password, userToLogin.password);
			if (pwdMatch) {
				res.redirect('/');
				// return res.render('main/index', {
				// 	title: 'Home',
				// });
			} else {
				return res.render('users/login', {
					title: 'Login',
					errors: {
						email: {
							msg: 'Las credenciales son invalidas',
						},
					},
				});
			}
		} else {
			return res.render('users/login', {
				title: 'Login',
				errors: {
					email: {
						msg: 'No se encontro el email en la base de datos',
					},
				},
			});
		}
	},
	register: (req, res) => {
		res.render('users/register', { title: 'Register' });
	},
	processRegister: (req, res) => {
		// renderizado de errores
		const results = validationResult(req);
		if (results.errors.length > 0) {
			res.render('users/register', {
				title: 'Register',
				errors: results.mapped(),
				oldData: req.body,
			});
		}
		// validacion de que el email utilizado para el registro no esta en uso
		const userInDb = User.findByField('email', req.body.email);

		if (userInDb) {
			return res.render('users/register', {
				title: 'Register',
				errors: { email: { msg: 'Este email ya esta registrado' } },
				oldData: req.body,
			});
		}

		// creacion de usuario
		let userToCreate = {
			...req.body,
			password: bcrypt.hashSync(req.body.password, 10),
			avatar: req.file.filename,
		};
		// agregar user al archivo users.jsons
		User.create(userToCreate);

		// return res.send('se guardo el usuario');
		return res.redirect('/users/login');
	},
	userProfile: (req, res) => {
		res.render('users/userProfile', { title: 'Profile' });
	},
};
module.exports = usersController;
