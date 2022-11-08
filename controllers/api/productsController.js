const { deepStrictEqual } = require('assert'); // De donde salio esto?
const fs = require('fs');
const db = require('../../database/models');
const Op = db.Sequelize.Op;

// list, store, detail, update, delete
const productsController = {
    page: (req, res) => {
        let paginado = null;
        let previousPage = null;
        let nextPage = null;
        if (req.params.pagenumber == 1) {
            nextPage = 2;
        }
        if (req.params.pagenumber == 2) {
            paginado = 10;
            previousPage = 1;
            nextPage = 3;
        } else if (req.params.pagenumber == 3) {
            paginado = 20;
            previousPage = 2;
            nextPage = 4;
        } 
        else if (req.params.pagenumber == 4) {
            paginado = 30
            previousPage = 3;
            nextPage = 5;
        } else if (req.params.pagenumber == 5) {
            paginado = 40
            previousPage = 4;
        } else if (req.params.pagenumber && (req.params.pagenumber <= 0 || req.params.pagenumber > 6 || isNaN(req.params.pagenumber))){
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
        .then(results => {
            let countByCategories = {};
            let processedResults = [];
            if (results[1].length > 0 ) {

            for (let i = 0; i<results[0].length; i++) {
                countByCategories[results[0][i]['dataValues']['categories']['name']] = results[0][i]['dataValues']['count'];
            }
            for (let i = 0; i<results[1].length; i++) {
                let formattedResult = {
                    id : results[1][i].id,
                    name : results[1][i].name,
                    category : results[1][i].categories.name,
                    detail : results[1][i].detail
                };
                processedResults.push(formattedResult);
            }
        }
        let finalResponse = {
                total : results[1].length,
                itemsRetrieved: `products ${paginado + 1} up to ${paginado + 10}`,
                countByCategories,
                products : processedResults
        }
        if (previousPage != null) {
            finalResponse.previous = 'localhost:3000/api/products/page/' + previousPage;
        }
        if (nextPage !== null) {
            finalResponse.next = 'localhost:3000/api/products/page/' + nextPage;
        }
        
            return res.json({
                finalResponse
            })
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
            attributes : ['id', 'name', 'price', 'shortDesc', 'longDesc', 'image', 'dispatch', 'discount'],
        }).then((productToDetail) => {
            let processedProduct = {
                id : productToDetail['dataValues']['id'],
                name : productToDetail['dataValues']['name'],
                price : productToDetail['dataValues']['price'],
                shortDesc : productToDetail['dataValues']['shortDesc'],
                longDesc : productToDetail['dataValues']['longDesc'],
                dispatch : productToDetail['dataValues']['dispatch'],
                discount : productToDetail['dataValues']['discount'],
                brand : productToDetail['dataValues']['brands']['dataValues']['name'],
                category: productToDetail['dataValues']['categories']['dataValues']['name'],
                color : productToDetail['dataValues']['colors']['dataValues']['name']
            };
            return res.status(200).json({
                product : processedProduct,
                url :`localhost:3000/images/products/` + productToDetail.image
            })
        })
        .catch(err => {
            res.json({
                message : 'Bad request',
                error : err
            })
        });
    },
    allProducts : (req, res) => {
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
        });
        
        Promise.all([byCategories, allProducts])
        .then(results => {
            let countByCategories = {};

            for (let i = 0; i<results[0].length; i++) {
                countByCategories[results[0][i]['dataValues']['categories']['name']] = results[0][i]['dataValues']['count']
            }
            let processedResults = [];
            for (let i = 0; i<results[1].length; i++) {
                let formattedResult = {
                    id : results[1][i].id,
                    name : results[1][i].name,
                    category : results[1][i].categories.name,
                    detail : results[1][i].detail
                };
                processedResults.push(formattedResult);
            }
            return res.json({
                total : results[1].length,
                countByCategories,
                products : processedResults
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
