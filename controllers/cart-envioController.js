const cartEnvioController = {
    show : (req, res) => {
        res.render('products/cart-envio', {title:'Dispatch'});
    }
};
module.exports = cartEnvioController;


