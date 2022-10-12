const { validationResult } = require('../middlewares/registerValidator');
const bcrypt = require('bcryptjs');
const User = require('../utils/User');
const fs = require('fs');

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
                // borramos password de los datos de session
                delete userToLogin.password;
                // salvamos los datos de session
                req.session.userLogged = userToLogin;
                // validamos si debemos persistir la session usando cookies
                if (req.body.recordarUsuario) {
                    res.cookie('userEmail', req.body.username, {
                        maxAge: 1000 * 60 * 30,
                    });
                }

                // redirigimos al home
                res.redirect('/');
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
        // return res.send(req.session.userLogged);
        return res.render('users/userProfile', {
            title: 'Profile',
            user: req.session.userLogged,
        });
    },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },
    edit: (req, res) => {
        let userToEdit = User.findByPk(parseInt(req.params.id));
        res.render('users/editUser', {
            userToEdit: userToEdit,
            title: 'Edit User',
        });
    },
    update: (req, res) => {
        const { nombre, apellido, email } = req.body;
        const userLogged = req.session.userLogged;
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('users/editUser', {
                title: 'Edit User',
                userToEdit: userLogged,
                errors: errors.mapped(),
            });
        } else {
            // Almacenamos los campos editados
            const userEdits = {
                id: userLogged.id,
                nombre: nombre,
                apellido: apellido,
                email: email,
                avatar: req.file ? req.file.filename : userLogged.avatar,
            };

            // Si el usuario cambia la imagen, borramos la anterior
            if (req.file) {
                fs.unlinkSync('./public/images/users/' + userLogged.avatar);
            }

            // Actualizamos la base de datos
            User.update(userEdits);

            // Actualizamos los datos de session
            req.session.userLogged = {
                ...userLogged,
                ...userEdits,
            };

            res.redirect('/');
        }
    },
    delete: (req, res) => {
        let user = User.findByPk(parseInt(req.params.id));
        fs.unlinkSync('./public/images/users/' + user.avatar);
        User.delete(parseInt(req.params.id));
        return res.redirect('/');
    },
};
module.exports = usersController;
