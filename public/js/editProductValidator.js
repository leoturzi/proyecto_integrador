window.addEventListener("load", function () {
  let form = document.querySelector("#product-edit__form");
  let name = document.querySelector("#name");
  let nameError = document.querySelector("#nameError");
  let category = document.querySelector("#category");
  let categoryError = document.querySelector("#categoryError");
  let brand = document.querySelector("#brand");
  let brandError = document.querySelector("#brandError");
  let shortDesc = document.querySelector("#shortDesc");
  let shortDescError = document.querySelector("#shortDescError");
  let longDesc = document.querySelector("#longDesc");
  let longDescError = document.querySelector("#longDescError");
  let color = document.querySelector("#color");
  let colorError = document.querySelector("#colorError");
  let price = document.querySelector("#price");
  let priceError = document.querySelector("#priceError");
  let newImage = document.querySelector("#newImage");
  let newImageError = document.querySelector("#newImageError");
  let discount = document.querySelector("#discount");
  let discountError = document.querySelector("#discountError");
  let stock = document.querySelector("#stock");
  let stockError = document.querySelector("#stockError");
  let button = document.querySelector("#editProductBtn");
  button.addEventListener("click", function (event) {
    event.preventDefault();
    let errores = {};

    if (name.value.length < 1) {
      errores.name = "Debes completar el nombre del producto";
    } else if (category.value == "") {
      errores.category = "Debes elegir una categoria";
    } else if (brand.value == "") {
      errores.brand = "Debes elegir una marca";
    } else if (shortDesc.value.length < 1) {
      errores.shortDesc = "Debes ingresar una descripción corta";
    } else if (longDesc.value.length < 1) {
      errores.longDesc = "Debes ingresar una descripción larga";
    } else if (color.value == "") {
      errores.color = "Debes elegir un color";
    } else if (price.value.length < 1 || isNaN(parseInt(price.value))) {
      errores.price = "Debes completar el precio. Ingresa solo numeros";
    } else if (
      newImage &&
      newImage.value &&
      !newImage.value.slice(-4).includes(".jpg" || ".png") &&
      !newImage.value.slice(-5).includes(".jpeg")
    ) {
      errores.newImage =
        "La nueva imágen debe tener un formato válido (.jgp, .png .jpeg)";
    } else if (discount.value.length < 1) {
      errores.discount =
        "Debes indicar el descuento a aplicar. Ingresa un número entre 0 y 100";
    } else if (stock.value.length < 1) {
      errores.stock = "Debes completar el stock inicial. Ingresa solo números";
    }
    if (Object.keys(errores).length >= 1) {
      nameError.innerText = errores.name ? errores.name : "";
      categoryError.innerText = errores.category ? errores.category : "";
      brandError.innerText = errores.brand ? errores.brand : "";
      shortDescError.innerText = errores.shortDesc ? errores.shortDesc : "";
      longDescError.innerText = errores.longDesc ? errores.longDesc : "";
      colorError.innerText = errores.color ? errores.color : "";
      priceError.innerText = errores.price ? errores.price : "";
      newImageError.innerText = errores.newImage ? errores.newImage : "";
      discountError.innerText = errores.discount ? errores.discount : "";
      stockError.innerText = errores.stock ? errores.stock : "";
    } else {
      form.submit();
    }
  });
});
