const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "./views/index.html"));
});

// Ruta para el carrito
app.get("/cart", (req, res) => {
	res.sendFile(path.join(__dirname, "./views/cart.html"));
});

// Ruta detalle producto
app.get("/producto-desc", (req, res) => {
	res.sendFile(path.join(__dirname, "./views/productDetail.html"));
});

// Ruta para el carrito
app.get("/cart", (req, res) => {
	res.sendFile(path.join(__dirname, "./views/cart.html"));
});

// Ruta para opciones de envío, del carrito
app.get("/cart-envio", (req, res) => {
	res.sendFile(path.join(__dirname, "./views/cart-envio.html"));
});

// Ruta para opciones de envío, del carrito
app.get("/login", (req, res) => {
	res.sendFile(path.join(__dirname, "./views/login.html"));
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
