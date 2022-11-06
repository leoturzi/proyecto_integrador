const { validationResult } = require('../middlewares/registerValidator');
const bcrypt = require('bcryptjs');
// const User = require('../utils/User');
const fs = require('fs');
const db = require('../database/models');
const Op = db.Sequelize.Op;

const usersController = {
    login: (req, res) => {
        // return res.send('hola');
        return res.render('users/login', { title: 'Login' });
    },
    loginProcess: async (req, res) => {
        // volcamos valores del form en variables
        const { username, password, recordarUsuario } = req.body;

        const userToLogin = await db.User.findOne({
            where: { email: username },
        });
        // return res.send(userToLogin);
        if (userToLogin) {
            const pwdMatch = bcrypt.compareSync(password, userToLogin.password);
            if (pwdMatch) {
                // borramos password de los datos de session
                delete userToLogin.password;
                // salvamos los datos de session
                req.session.userLogged = userToLogin;
                // validamos si debemos persistir la session usando cookies
                if (recordarUsuario) {
                    res.cookie('userEmail', req.body.username, {
                        maxAge: 1000 * 60 * 30,
                    });
                }
                // redirigimos al home
                return res.redirect('/');
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
        return res.render('users/register', { title: 'Register' });
    },

    processRegister: async (req, res) => {
        // renderizado de errores
        const results = validationResult(req);
        if (results.errors.length > 0) {
            return res.render('users/register', {
                title: 'Register',
                errors: results.mapped(),
                oldData: req.body,
            });
        }
        // validacion de que el email utilizado para el registro no esta en uso
        const userInDb = await db.User.findAll({
            where: { email: req.body.email },
        });
        // return res.send(userInDb);
        if (userInDb.length > 0) {
            return res.render('users/register', {
                title: 'Register',
                errors: { email: { msg: 'Este email ya esta registrado' } },
                oldData: req.body,
            });
        }

        // creacion de usuario
        const userToCreate = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.file.filename,
        };
        // agregar user al archivo users.jsons
        db.User.create(userToCreate);

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
        return res.render('users/editUser', {
            userToEdit: req.session.userLogged,
            title: 'Edit User',
        });
    },

    update: async (req, res) => {
        const userEdits = req.body;
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
            // Si el usuario cambia la imagen, borramos la anterior
            if (req.file) {
                fs.unlinkSync('./public/images/users/' + userLogged.avatar);
            }
            // Actualizamos la base de datos
            await db.User.update(
                {
                    first_name: userEdits.first_name,
                    last_name: userEdits.last_name,
                    email: userEdits.email,
                    avatar: req.file ? req.file.filename : userLogged.avatar,
                },
                {
                    where: { id: req.params.id },
                }
            );

            // Actualizamos los datos de session
            req.session.userLogged = {
                ...userLogged,
                ...userEdits,
                avatar: req.file ? req.file.filename : userLogged.avatar,
            };
        }
        return res.redirect('/');
    },
    confirmDelete: async (req, res) => {
        const userToDelete = await db.User.findOne({
            where: {
                id: parseInt(req.params.id),
            },
        });
        res.render('users/deleteUser', {
            userToDelete,
            title: 'Confirm delete',
        });
    },
    delete: async (req, res) => {
        const userLogged = req.session.userLogged;
        // Borramos el avatar guardado
        fs.unlinkSync('./public/images/users/' + userLogged.avatar);
        // Borramos al user de la BD
        await db.User.destroy({
            where: {
                id: parseInt(req.params.id),
            },
        });
        // Destruimos la session
        req.session.destroy();
        return res.redirect('/');
    },
};
module.exports = usersController;
