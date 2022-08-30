const cartController = {
    show: (req, res) => {
        res.render('products/cart',{title:'Cart'});
    }
};
module.exports = cartController;