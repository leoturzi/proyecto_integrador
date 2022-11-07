const { deepStrictEqual } = require('assert'); // De donde salio esto?
const fs = require('fs');
const db = require('../../database/models');
const Op = db.Sequelize.Op;

// list, store, detail, update, delete
const productsController = {

    list: (req, res) => {
        let paginado = null;
        if (req.params.page && req.params.page > 0 && req.params.page < 5) {
            paginado = parseInt(req.params.page) * 10;
        } else if (req.params.page && (req.params.page > 0 || req.params.page < 5)){
            res.json({message: 'Paginado inexistente'})
            return;
        }

        let byCategories = db.Products.findAll({ 
            attributes: ['categories.name', [db.Sequelize.fn('count', db.Sequelize.col('category_id')), 'count']],
            include : ['categories'],
            group : ['categories.name']
        });

        let allProducts = db.Products.findAll({
            include: [
                { association: 'brands' },
                { association: 'categories'},
                { association: 'colors' },
            ],
            attributes : ['id', 'name', 'category_id', 'detail'],
            limit: 10,
            offset: paginado
        });
        
        Promise.all([byCategories, allProducts])
        .then((values) => {
            if (values[1].length > 0 ) {
                return res.status(200).json({
                    count: values[1].length,
                    itemsRetrieved: `products ${paginado + 1} to ${paginado + 10}`,
                    countByCategories: values[0],
                    products : values[1],
                    status: 200
                })
            }
        })
        .catch(err => {
            res.json({
                message : 'Bad request',
                error : err
            })
        });
        
    },
    detail: (req, res) => {
        db.Products.findByPk(req.params.id, {
            include: ['brands', 'categories', 'colors'],
        }).then((productToDetail) => {
            return res.status(200).json({
                productToDetail,
                status: 200,
                url :`/images/products/` + productToDetail.image
            })
        })
        .catch(err => {
            res.json({
                message : 'Bad request',
                error : err
            })
        });
    }
};

module.exports = productsController;
