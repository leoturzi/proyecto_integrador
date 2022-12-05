const fs = require('fs');
const db = require('../../database/models');
const Op = db.Sequelize.Op;

const usersController = {
    list: (req, res) => {
        db.User.findAll({
            attributes: ['id', 'first_name', 'email', 'detail'],
        })
            .then((results) => {
                return res.json({
                    count: results.length,
                    users: results,
                });
            })
            .catch('Ocurrio un error listando usuarios');
    },
    // No pueden ir campos como password
    detail: (req, res) => {
        db.User.findByPk(req.params.id, {
            attributes: [
                'id',
                'first_name',
                'last_name',
                'email',
                'detail',
                'province',
                'street',
                'avatar',
                'cart',
            ],
        })
            .then((user) => {
                if (user) {
                    return res.json({
                        id: user['dataValues']['id'],
                        first_name: user['dataValues']['first_name'],
                        last_name: user['dataValues']['last_name'],
                        email: user['dataValues']['email'],
                        provincia: user['dataValues']['province'],
                        calle: user['dataValues']['street'],
                        cart: user['dataValues']['cart'],
                        avatarURL:
                            'localhost:3000/images/users/' +
                            user['dataValues']['avatar'],
                    });
                } else {
                    return res.json({
                        message: 'User not found',
                        status: 400,
                    });
                }
            })
            .catch((error) => {
                res.json({
                    message: 'Something unexpected just happened',
                });
            });
    },

    getUserCart: async (req, res) => {
        if (req.session.userLogged) {
            return res.send(req.session.userLogged.cart);
        }
    },
};
module.exports = usersController;
