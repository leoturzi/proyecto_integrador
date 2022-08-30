const productDetailController = {
    show : (req, res) => {
        res.render('products/product-detail', {title:'Detail'});
    }
};
module.exports = productDetailController;