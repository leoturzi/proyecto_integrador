const fs = require('fs');
const Product = require('../utils/Product');

const cartController = {
    cart: async (req, res) => {
        try {
            let selectedQuantity = 4;
            let products = await Product.findAll()
            products = products.filter(product => { return product.id <= 4});
            res.render('cart/cart',{title:'Cart', selectedQuantity, products});
        } catch (error) {
            res.render('404')
        }
    },
    dispatch: (req, res) => {
        res.render('cart/cart-dispatch', {title:'Dispatch'});
    },
    payment: (req, res) => {
        res.render('cart/payment', {title:'Payment method'});
    }
}

module.exports =cartController;