const express = require("express");
const path = require("path");
const mainRouter = require('./routes/main');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const cartRouter = require('./routes/cart');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "public")));

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


