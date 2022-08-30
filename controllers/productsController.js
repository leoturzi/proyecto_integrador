const productsController = {
    list : (req, res) => {
        // ToDo
    },
    create: (req, res) => {
        res.render('products/product-create', {title:'New Product'});
    },
    detail: (req, res) => {
        res.render('products/product-detail', {title:'Detail'});
    },
    store: (req, res) => {
        //Todo
    },
    edit : (req, res) => {
        res.render('products/product-edit', {title:'Edit Product'});
    },
    update: (req, res) => {
        // ToDo
    },
    delete: (req, res) => {
        // ToDo
    }
}

module.exports = productsController;