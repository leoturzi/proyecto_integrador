const express = require('express');
const path = require('path');

// routes
const mainRouter = require('./routes/main');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const cartRouter = require('./routes/cart');

//API
const productsRouterAPI = require('./routes/api/products');
const usersRouterAPI = require('./routes/api/users');
// middlewares
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');
const userLoggedValidator = require('./middlewares/userLoggedValidator');

const app = express();

// template engines
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// implementacion middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(
	session({
		secret: 'es un secreto',
		resave: false,
		saveUninitialized: false,
	})
);
app.use(cookies());
app.use(userLoggedValidator);

// Router index
app.use('/', mainRouter);
// Router products
app.use('/products', productsRouter);
// Router users
app.use('/users', usersRouter);
// Router cart
app.use('/cart', cartRouter);

//Router API
app.use('/api/products', productsRouterAPI);
app.use('/api/users', usersRouterAPI);

//// ERROR - Siempre al final de todo, falta hacer la vista que se va a renderizar

app.use((req, res, next) => {
	res.status(404).render('404', { title: 'pagina no encontrada' });
});

// Levantamos servidor
app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
