const db = require('../../database/models');
const Op = db.Sequelize.Op;

const productsController = {
    page: (req, res) => {
        let paginado = null;
        let previousPage = null;
        let nextPage = null;
        // Dependiendo del número de página pasado por parámetro, vamos a cambiar el resto de los
        // parámetros dinámicos. Por ejemplo, la pagina 1 no tiene previosPage, y la última no
        // tiene nextPage.
        // Además hay que considerar el offset, el limit, y el mensaje de más abajo que indica
        // Qué registros te están llegando, ej: 1 al 10, 11 al 20, etc.
        if (req.params.pagenumber == 1) {
            nextPage = 2;
        }
        if (req.params.pagenumber == 2) {
            paginado = 10;
            previousPage = 1;
            nextPage = 3;
        } else if (req.params.pagenumber == 3) {
            paginado = 20;
            previousPage = 2;
            nextPage = 4;
        } 
        else if (req.params.pagenumber == 4) {
            paginado = 30
            previousPage = 3;
            nextPage = 5;
        } else if (req.params.pagenumber == 5) {
            paginado = 40
            previousPage = 4;
            // Si piden la página 0 o desde la 6 (tenemos 48 productos, hasta la pag 5 OK)
            // O si en la URL mandan algo que no sea parseable a número
            // Devuelve que la página no existe y corta la ejecución del método.
        } else if (req.params.pagenumber && (req.params.pagenumber <= 0 || req.params.pagenumber > 5 || isNaN(req.params.pagenumber))){
            res.json({message: 'Paginado inexistente'})
            return;
        }
        // Pidieron cuantos productos hay por categoría, y el nombre de la categoría...
        let byCategories = db.Products.findAll({ 
            attributes: ['categories.name', [db.Sequelize.fn('count', db.Sequelize.col('category_id')), 'count']],
            include : ['categories'],
            group : ['categories.name']
        });
        // Y los productos con todas las asociaciones...
        let allProducts = db.Products.findAll({
            include: [
                { association: 'brands' },
                { association: 'categories'},
                { association: 'colors' },
            ],
            attributes : ['id', 'name', 'category_id', 'detail'],
            limit: 10,
            offset: paginado
        });
        
        Promise.all([byCategories, allProducts])
        .then(results => {
            // En la primer promesa vienen las categorías
            // Creamos un objeto que va a ser { nombreDeCategoría : cantidad de productos de esa categoría }
            let countByCategories = {};
            let processedResults = [];
            if (results[1].length > 0 ) {
                // En la primer promesa con--> results[0] vienen las categorías. Entramos a cada una con --> [i]
                // Hay que ingresar al valor de esta manera...
            for (let i = 0; i<results[0].length; i++) {
                countByCategories[results[0][i]['dataValues']['categories']['name']] = results[0][i]['dataValues']['count'];
            }
            // En la segunda promesa --> results[1] vienen los productos
            // Formateamos los resultados de un producto en un objeto
            // y los pusheamos a processedResults
            for (let i = 0; i<results[1].length; i++) {
                let formattedResult = {
                    id : results[1][i].id,
                    name : results[1][i].name,
                    category : results[1][i].categories.name,
                    detail : results[1][i].detail
                };
                processedResults.push(formattedResult);
            }
        }
        // Ya tenemos nuestras categorías {nombre : nProds}
        // Los productos [{prod}, {prod}, {prod}, etc]
        // Seteamos lo que va a ir al json
        let finalResponse = {
                total : results[1].length,
                itemsRetrieved: `products ${paginado + 1} up to ${paginado + 10}`,
                countByCategories,
                products : processedResults
        }
        // Aca sucede lo siguiente
        // Más arriba, en base a lo que nos venía como parámetro, seteábamos el nextPage y previousPage
        // Acá, entonces, al objeto respuesta, si corresponde agregarle nextPage, lo hacemos
        // Lo mismo con previousPage
        if (previousPage != null) {
            finalResponse.previous = 'localhost:3000/api/products/page/' + previousPage;
        }
        if (nextPage !== null) {
            finalResponse.next = 'localhost:3000/api/products/page/' + nextPage;
        }
        
            return res.json({
                ...finalResponse
            })
        })
        .catch(err => {
            res.json({
                message : 'Bad request',
                error : err
            })
        });
       
    },
    // Elegimos las asociaciones, como pidieron
    // Traemos solo ciertos atributos,no podemos incluir datos sensibles
    // Formateamos cada campo de la respuesta
     detail: (req, res) => {
        db.Products.findByPk(req.params.id, {
            include: ['brands', 'categories', 'colors'],
            attributes : ['id', 'name', 'price', 'shortDesc', 'longDesc', 'image', 'dispatch', 'discount'],
        }).then((productToDetail) => {
            let processedProduct = {
                id : productToDetail['dataValues']['id'],
                name : productToDetail['dataValues']['name'],
                price : productToDetail['dataValues']['price'],
                // img != url. Tenemos que incluirlo para el front. NO borrar
                image : productToDetail['dataValues']['image'], 
                shortDesc : productToDetail['dataValues']['shortDesc'],
                longDesc : productToDetail['dataValues']['longDesc'],
                dispatch : productToDetail['dataValues']['dispatch'],
                discount : productToDetail['dataValues']['discount'],
                brand : productToDetail['dataValues']['brands']['dataValues']['name'],
                category: productToDetail['dataValues']['categories']['dataValues']['name'],
                color : productToDetail['dataValues']['colors']['dataValues']['name']
            };
            return res.status(200).json({
                product : processedProduct,
                url :`localhost:3000/images/products/` + productToDetail.image
            })
        })
        .catch(err => {
            res.json({
                message : 'Bad request',
                error : err
            })
        });
    },
    allProducts : (req, res) => {
        // Lo mismo que en fila 40. Pidieron esto.
        let byCategories = db.Products.findAll({ 
            attributes: ['categories.name', [db.Sequelize.fn('count', db.Sequelize.col('category_id')), 'count']],
            include : ['categories'],
            group : ['categories.name']
        });

        let allProducts = db.Products.findAll({
            include: [
                { association: 'brands' },
                { association: 'categories'},
                { association: 'colors' },
            ],
            attributes : ['id', 'name', 'category_id', 'detail'],
        });
        
        Promise.all([byCategories, allProducts])
        .then(results => {
            let countByCategories = {};

            for (let i = 0; i<results[0].length; i++) {
                countByCategories[results[0][i]['dataValues']['categories']['name']] = results[0][i]['dataValues']['count']
            }
            let processedResults = [];
            for (let i = 0; i<results[1].length; i++) {
                let formattedResult = {
                    id : results[1][i].id,
                    name : results[1][i].name,
                    category : results[1][i].categories.name,
                    detail : results[1][i].detail
                };
                processedResults.push(formattedResult);
            }
            return res.json({
                total : results[1].length,
                countByCategories,
                products : processedResults
            })
        })
        .catch(err => {
            res.json({
                message : 'Bad request',
                error : err
            })
        });
    }
};

module.exports = productsController;
