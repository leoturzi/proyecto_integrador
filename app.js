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
app.get("/product-detail", (req, res) => {
	res.sendFile(path.join(__dirname, "./views/product-detail.html"));
});

// Ruta para opciones de envío, del carrito
app.get("/cart-envio", (req, res) => {
	res.sendFile(path.join(__dirname, "./views/cart-envio.html"));
});

// Ruta para login
app.get("/login", (req, res) => {
	res.sendFile(path.join(__dirname, "./views/login.html"));
});

// Ruta para register
app.get("/register", (req, res) => {
	res.sendFile(path.join(__dirname, "./views/register.html"));
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
