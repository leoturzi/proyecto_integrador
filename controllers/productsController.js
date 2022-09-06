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
            discount: parseFloat(req.body.discount),
            lastVisited: "",
            color: req.body.color
        }
        req.body.lastVisited.toLowerCase() == "si" ? newProduct.lastVisited = true : newProduct.lastVisited = false; 
        req.body.dispatch.toLowerCase() == "si" ? newProduct.dispatch = true : newProduct.dispatch = false; 
        req.file ? newProduct.image = req.file.filename : newProduct.image = "";
        products.push(newProduct);
        products = JSON.stringify(products, null, ' ');
        fs.writeFileSync(productsFilePath, products);
        res.redirect('/products');
    },
    detail: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let productToDetail = products.find(p => {return p.id == parseInt(req.params.id)});
        res.render('products/product-detail', {product: productToDetail, title:'Detail'});
    },
    edit : (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let productToEdit = products.find(p => {return p.id == parseInt(req.params.id)});
        res.render('products/product-edit', { product: productToEdit, title:'Edit Product'});
    },
    update: (req, res) => {
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        // De los productos dejame solamente todos los ids. Sobre ese array de ids, buscame el índice de aquel que coincida con el id pasado por parámetro. Para después sobreescribir los cambios refiriendo a esa posición en el array products.
        let productIndex = products.map(p => p.id).indexOf(parseInt(req.params.id))
        // Ahora en vez del índice busco el objeto (producto) entero
        let productToUpdate = products.find(p => {return p.id == parseInt(req.params.id)});
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
        products = JSON.stringify(products, null, ' ');
        fs.writeFileSync(productsFilePath, products);
        res.redirect(`/products/${productUpdated.id}`)
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