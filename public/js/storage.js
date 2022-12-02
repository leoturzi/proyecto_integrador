window.addEventListener('load', (e) => {
    let addToCartButtons = document.querySelectorAll('.btn-addToCart');
    let cartItemCounter = document.querySelector('.cart-item-counter');

    // Función para hacer refresh al número del carrito
    function refreshCounter() {
        cartItemCounter.innerText = sessionStorage.cart
            ? JSON.parse(sessionStorage.cart).length
            : 0;
    }
    // Le agregamos el atributo custom "data-id" a los botones de compra
    // El valor de data-id va a estar en el evento, en --> e.target.dataset.id
    // Nos traemos todos los botones comprar

    addToCartButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            if (sessionStorage.cart) {
                let cart = JSON.parse(sessionStorage.cart);
                let productIndex = cart.findIndex(
                    (product) => product.id == e.target.dataset.id
                );
                if (productIndex != -1) {
                    cart[productIndex].q++;
                    cartToast.fire({
                        icon: 'info',
                        title: `Actual item quantity: ${cart[productIndex].q}`,
                    });
                } else {
                    cart.push({ id: e.target.dataset.id, q: 1 });
                    cartToast.fire({
                        icon: 'success',
                        title: `Item added to cart`,
                    });
                }
                sessionStorage.setItem('cart', JSON.stringify(cart));
            } else {
                sessionStorage.setItem(
                    'cart',
                    JSON.stringify([{ id: e.target.dataset.id, q: 1 }])
                );
                cartToast.fire({
                    icon: 'success',
                    title: `Item added to cart`,
                });
            }
            cartItemCounter.innerText =
                JSON.parse(sessionStorage.cart).length || 0;
        });
    });

    const cartToast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
    });

    // Call refresh número de carrito, cada vez que se cargue cualquier parte del sitio.
    refreshCounter();

    addEventListener('visibilitychange', (event) => {
        if (document.visibilityState === 'hidden') {
            // llamado a la API
            navigator.sendBeacon(
                'http://localhost:3033/api/cart/update_cart',
                JSON.stringify(sessionStorage)
            );
        }
    });
});
