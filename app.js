const express = require("express");
const path = require("path");
const indexRouter = require('./routes/index');
const cartRouter = require('./routes/cart');
const productDetailRouter = require('./routes/product-detail');
const cartEnvioRouter = require('./routes/cart-envio');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register')
const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
// Router index
app.use('/', indexRouter)
// Router cart
app.use("/cart", cartRouter);
// Router product-detail
app.use("/product-detail", productDetailRouter);
// Router cart-envio
app.use("/cart-envio", cartEnvioRouter);
// Router para login
app.use("/login", loginRouter);
// Router para register
app.use("/register", registerRouter);


