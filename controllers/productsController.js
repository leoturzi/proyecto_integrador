const { deepStrictEqual } = require('assert');
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
    store: (req, res) => {
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let newProduct = {
            id : Date.now(),
            name : req.body.name,
            brand : req.body.brand,
            price: parseInt(req.body.price), 
            category : req.body.category,
            shortDesc : req.body.shortDesc,
            longDesc : req.body.longDesc,
            image: "",
            dispatch : "",
            discount: parseInt(req.body.discount),
            lastVisited: "",
            color: req.body.color
        }
        req.body.lastVisited.toLowerCase() == "si" ? newProduct.lastVisited = true : false; 
        req.body.dispatch.toLowerCase() == "si" ? newProduct.dispatch = true : false; 
        if (req.file) {
            newProduct.image = req.file.filename;
        };
        products.push(newProduct);
        products = JSON.stringify(products, null, ' ');
        fs.writeFileSync(productsFilePath, products);
        res.redirect('/products');
    },
    detail: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        productToDetail = products.find(p => {return p.id == parseInt(req.params.id)});
        res.render('products/product-detail', {product: productToDetail, title:'Detail'});
    },
    edit : (req, res) => {
        res.render('products/product-edit', {title:'Edit Product'});
    },
    update: (req, res) => {
        // ToDo
    },
    delete: (req, res) => {
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        //Busco el índice para luego hacer splice
        let productIndex = products.map(p => p.id).indexOf(parseInt(req.params.id))
        //Busco el producto para después borrar la imágen
        let product = products.find(p => { return p.id == parseInt(req.params.id)});
        fs.unlinkSync('./public/images/products/' + product.image);

        products.splice(productIndex, 1);
        products = JSON.stringify(products, null, ' ');
        fs.writeFileSync(productsFilePath, products);
        res.redirect('/products');

    }
}

module.exports = productsController;