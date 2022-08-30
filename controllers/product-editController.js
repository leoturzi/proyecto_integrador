const productEditController = {
    show : (req, res) => {
        res.render('products/product-edit', {title:'Edit Product'});
    }
}

module.exports = productEditController;