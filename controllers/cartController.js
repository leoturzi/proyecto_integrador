const cartController = {
    cart: (req, res) => {
        res.render('cart/cart',{title:'Cart'});
    },
    dispatch: (req, res) => {
        res.render('cart/cart-dispatch', {title:'Dispatch'});
    }
}

module.exports =cartController;