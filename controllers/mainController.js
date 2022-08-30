const mainController = {
    index : (req, res) => {
        res.render('main/index', {title:'Home'});
    },
    search : (req, res) => {
        res.render('main/results', {title:'Search results'});
    }
}
module.exports = mainController;