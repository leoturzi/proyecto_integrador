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
    detail: (req, res) => {
        console.log('Hello!');
        db.User.findByPk(req.params.id, {
            attributes: ['id', 'first_name', 'last_name','email', 'detail', 'provincia', 'calle', 'avatar']
        })
        .then(result => {
            if (result) {
                return res.json({
                    data: result,
                    status: 200
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
