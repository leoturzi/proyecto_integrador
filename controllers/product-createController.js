const productCreateController = {
    show : (req, res) => {
        res.render('products/product-create', {title:'New Product'});
    }
}

module.exports = productCreateController;