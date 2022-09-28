const { validationResult } = require('../middlewares/registerValidator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const usersController = {
  login: (req, res) => {
    res.render('users/login', { title: 'Login' });
  },
  register: (req, res) => {
    res.render('users/register', { title: 'Register' });
  },
  processRegister: (req, res) => {
    // renderizado de errores
    const results = validationResult(req).mapped();
    if (results != undefined) {
      res.render('users/register', {
        title: 'Register',
        errors: results,
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
  },
  userProfile: (req, res) => {
    res.render('users/userProfile', { title: 'Profile' });
  },
};
module.exports = usersController;
