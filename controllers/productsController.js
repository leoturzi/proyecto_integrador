const productsController = {
    list : (req, res) => {
        // ToDo
    },
    createForm: (req, res) => {
        res.render('products/product-create', {title:'New Product'});
    },
    detail: (req, res) => {
        res.render('products/product-detail', {title:'Detail'});
    },
    create: (req, res) => {
        //Todo
    },
    editForm : (req, res) => {
        res.render('products/product-edit', {title:'Edit Product'});
    },
    edit: (req, res) => {
        // ToDo
    },
    delete: (req, res) => {
        // ToDo
    }
}

module.exports = productsController;