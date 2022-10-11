const { deepStrictEqual } = require('assert'); // De donde salio esto?
const fs = require('fs');
const Product = require('../utils/Product');

const productsController = {
    list : (req, res) => {
        const products = Product.findAll()
        res.render('products/products', {products, title:'All Products'});
    },
    create: (req, res) => {
        res.render('products/product-create', {title:'New Product'});
    },
    store: (req, res) => {
        let newProduct = {
            name : req.body.name,
            brand : req.body.brand,
            price: parseInt(req.body.price), 
            category : req.body.category,
            shortDesc : req.body.shortDesc,
            longDesc : req.body.longDesc,
            image: "",
            dispatch : "",
            discount: parseFloat(req.body.discount),
            lastVisited: "",
            color: req.body.color
        }
        req.body.lastVisited.toLowerCase() == "si" ? newProduct.lastVisited = true : newProduct.lastVisited = false; 
        req.body.dispatch.toLowerCase() == "si" ? newProduct.dispatch = true : newProduct.dispatch = false; 
        req.file ? newProduct.image = req.file.filename : newProduct.image = "";
        Product.create(newProduct)
        res.redirect('/products');
    },
    detail: (req, res) => {
        let productToDetail = Product.findByPk(req.params.id);
        res.render('products/product-detail', {product: productToDetail, title:'Detail'});
    },
    edit : (req, res) => {
        let productToEdit = Product.findByPk(req.params.id);
        res.render('products/product-edit', { product: productToEdit, title:'Edit Product'});
    },
    update: (req, res) => {
        let products = Product.findAll();
        // De los productos dejame solamente todos los ids. Sobre ese array de ids, buscame el índice de aquel que coincida con el id pasado por parámetro. Para después sobreescribir los cambios refiriendo a esa posición en el array products.
        let productIndex = products.map(p => p.id).indexOf(parseInt(req.params.id));
        // Ahora en vez del índice busco el objeto (producto) entero
        let productToUpdate = Product.findByPk(req.params.id);
        // Vuelco las propiedades del producto original en lo que va a ser el producto actualizado, usando spread. El resto de las propiedades (nuevas) las sobreescribo
        let productUpdated = {
            ...productToUpdate,
            name : req.body.name,
            brand : req.body.brand,
            price: parseInt(req.body.price), 
            category : req.body.category,
            shortDesc : req.body.shortDesc,
            longDesc : req.body.longDesc,
            dispatch : "",
            discount: parseFloat(req.body.discount),
            lastVisited: "",
            color: req.body.color
        }
        req.body.lastVisited.toLowerCase() == "si" ? productUpdated.lastVisited = true : productUpdated.lastVisited = false; 
        req.body.dispatch.toLowerCase() == "si" ? productUpdated.dispatch = true : productUpdated.dispatch = false; 

        //Si se sube una nueva imágen, y además el producto original tenía una imágen asignada (y no estaba vacío = ""), entonces borrame la imágen que había, para poder asignarle la nueva imágen subida.
        if (req. file) {
            if (productUpdated.image!="") {
                fs.unlinkSync('./public/images/products/' + productUpdated.image)
            }
            // Si no había imágen asignada, no hay nada que borrar, y directamente va a asignarle la nueva imágen a la propiedad image
            productUpdated.image = req.file.filename;
        }
        products[productIndex] = productUpdated;
        fs.writeFileSync(Product.fileName, JSON.stringify(products, null, ' '));
        res.redirect(`/products/${productUpdated.id}`)
    },
    delete: (req, res) => {
        let product = Product.findByPk(req.params.id)
        fs.unlinkSync('./public/images/products/' + product.image);
        Product.delete(req.params.id)
        res.redirect('/products');

    }
}

module.exports = productsController;