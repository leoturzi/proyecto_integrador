const indexController = {
    show : (req, res) => {
        res.render('index', {title:'Home'});
    }
};
module.exports = indexController;