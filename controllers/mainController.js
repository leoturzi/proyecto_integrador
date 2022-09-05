const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../database/products.json');

const mainController = {
    index : (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let lastVisited = products.filter(p => {return p.lastVisited === true})
        res.render('main/index', { lastVisited, title:'Home'});
        // Revisar cómo resolvemos el wrap de "te puede interesar" sin romper el responsive
    },
    search : (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let productsQuery = req.query.keywords.toLowerCase();
        let queryResults = products.filter(p => {return p.shortDesc.toLowerCase().includes(productsQuery)})
        res.render('main/results', {queryProducts : queryResults, productsQuery, title:'Search results'});
    }
}
module.exports = mainController;