const express = require("express");
const path = require("path");
const mainRouter = require('./routes/main');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const cartRouter = require('./routes/cart');
const methodOverride = require('method-override');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); 

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended : false}));
app.use(express.json());
app.use(methodOverride('_method'));

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
// Router index
app.use('/', mainRouter)
// Router products
app.use("/products", productsRouter);
// Router users
app.use("/users", usersRouter);
// Router cart
app.use("/cart", cartRouter);



//// ERROR - Siempre al final de todo, falta hacer la vista que se va a renderizar

// app.use((req, res, next) => {
//     res.status(404).render('not-found')
// })
