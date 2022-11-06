const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const fs = require('fs');
const Product = require('../utils/Product');
const db = require('../database/models');
const Op = db.Sequelize.Op;

const cartController = {
    cart: async (req, res) => {
        try {
            let cartScript = true;
            let products = await db.Products.findAll({
                where : {
                    id : {[Op.lte] : 4}
                },
                include : [{association : 'brands'},
                        {association : 'categories'},
                        {association : 'colors'}]
            })
            res.render('cart/cart',{title:'Cart', products, cartScript, toThousand});
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