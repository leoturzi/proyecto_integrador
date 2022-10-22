// const fs = require('fs');
// const path = require('path');
// const productsFilePath = path.join(__dirname, '../database/products.json');
const db = require('../database/models');
const Op = db.Sequelize.Op;

const mainController = {
    index : (req, res) => {
        db.Products.findAll()
        .then(results => {
            res.render('main/index', { products : results, title:'Home'});
        })
    },
    search : (req, res) => {
        let productsQuery = req.query.keywords.toLowerCase();
        db.Products.findAll({
            include : [{association : 'brands'},
            {association : 'categories'},
            {association : 'colors'}],
            where:
            {
                shortDesc : {[Op.like] : `%${productsQuery}%`}
            },
            order:[['name', 'DESC']]
        })
        .then(queryResults => {
            console.log(queryResults);
            console.log(queryResults[0].brands.name)
            console.log(queryResults[0].categories.name)
            console.log(queryResults[0].colors.name)
            res.render('main/results', {queryProducts : queryResults, productsQuery, title:'Search results'});
        }) 
            // let queryResults = allProducts.filter(p => {return p.shortDesc.toLowerCase().includes(productsQuery)});

    }
}
module.exports = mainController;