const fs = require('fs');
const db = require('../../database/models');
const Op = db.Sequelize.Op;

const usersController = {
    list : (req, res) => {
        db.User.findAll({
            attributes: ['id', 'first_name', 'email', 'detail']
        })
        .then(results => {
            return res.json({
                count : results.length,
                users : results
            });
        })
        
    },
    // No pueden ir campos como password
    detail: (req, res) => {
        db.User.findByPk(req.params.id, {
            attributes: ['id', 'first_name', 'last_name','email', 'detail', 'provincia', 'calle', 'avatar']
        })
        .then(user => {
            if (user) {
                return res.json({
                    id : user['dataValues']['id'],
                    first_name : user['dataValues']['first_name'],
                    last_name : user['dataValues']['last_name'],
                    email : user['dataValues']['email'],
                    provincia : user['dataValues']['provincia'],
                    calle : user['dataValues']['calle'],
                    avatarURL : 'localhost:3000/images/users/' + user['dataValues']['avatar']
                });
            } else {
                return res.json({
                    message: 'User not found',
                    status: 400
                })
            }
        })
        .catch(error => {
            res.json({
                message: 'Something unexpected just happened'
            })
        })
    }
};
module.exports = usersController;
