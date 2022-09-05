const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../database/products.json');

const productsController = {
    list : (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))
        res.render('products/products', {products, title:'All Products'});
    },
    create: (req, res) => {
        res.render('products/product-create', {title:'New Product'});
    },
    detail: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        productToDetail = products.find(p => {return p.id == parseInt(req.params.id)});
        res.render('products/product-detail', {product: productToDetail, title:'Detail'});
    },
    store: (req, res) => {
        //Todo
    },
    edit : (req, res) => {
        res.render('products/product-edit', {title:'Edit Product'});
    },
    update: (req, res) => {
        // ToDo
    },
    delete: (req, res) => {
        // ToDo
    }
}

module.exports = productsController;