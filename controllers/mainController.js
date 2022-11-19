const db = require('../database/models');
const Op = db.Sequelize.Op;

const mainController = {
    index : (req, res) => {
        db.Products.findAll()
        .then(results => {
            res.render('main/index', { products : results, title:'Home'});
        })
    },
    /*
    search() explanation:
    Filter results by product name, and category name, WHERE field LIKE %query%
    With the '$..$' syntax, we must:
    1) include association name, setted in the model;
    2) use the DATABASE table name, not the model
    If the sequelize model is called 'Category'(.js), and my table in DB is 'cateogories', we use the last one.
    */
    search : (req, res) => {
        let productsQuery = req.query.keywords.toLowerCase();
        db.Products.findAll({
            include : [{association : 'brands'},
            {association : 'categories'},
            {association : 'colors'}],
            where: {
                [Op.or]: [
                  { name : {[Op.like] : `%${productsQuery}%`} },
                  { '$categories.name$': {[Op.like] : `%${productsQuery}%`}}
                ]
              },
            order:[['name', 'DESC']]
        })
        .then(queryResults => {
            res.render('main/results', {queryProducts : queryResults, productsQuery, title:'Search results'});
        }) 
    }
}
module.exports = mainController;