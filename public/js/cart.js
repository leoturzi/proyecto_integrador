window.addEventListener('load', (e) => {
    const toThousand = (n) =>
        n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    let cart; // Scope amplio para usarlo en todas partes
    let createdOrderId; // Al momento de crear los detalles de la orden necesito el id al que se asocian
    let cartContainer = document.querySelector('.cart'); // Traigo el <form> con todo, carrito+checkout
    let cartBody = document.querySelector('.cart__body'); // Traigo el contenedor de cada producto <article>
    let totalAmountOutput = document.querySelector(
        '.cart-subtotal__total-amount'
    ); // tabla orders --> amount
    let fetchedProducts = []; // Van a parar objetos con id, quantity, price. Lo conecto luego con orders.

    // Si bien está en el js general (storage.js), me lo traigo para usar acá porque a veces puedo llegar a necesitar hacer refresh al counter, sin hacer refresh a la página (F5). Puede que esté demás, veremos
    let cartItemCounter = document.querySelector('.cart-item-counter');

    // Si hay carrito en storage, me lo traigo
    // Por cada producto me traigo el registro entero
    // Si vinieron productos, en cada vuelta agrego cada producto al final
    if (sessionStorage.cart) {
        cart = JSON.parse(sessionStorage.cart) || [];
        cart.forEach((item, i) => {
            fetch(`/api/products/${item.id}`)
                .then((result) => result.json())
                .then((data) => {
                    if (data) {
                        product = data.product;
                        cartBody.innerHTML +=
                            // Al <article>, y al <i> le pongo clases o atributos relacionados con el id del producto. Esto nos va a permitir:

                            // Vincular un único botón de borrado con un único <article>(producto renderizado)
                            // Vincular esos elementos renderizados, con el id de mi variable actualizada carrito
                            // Que también se vincula id del storage
                            // el cual voy a usar para buscar el índice exacto del producto que quiero borrar
                            // según su id original. Si nos manejamos con índices de ciclos FOR o forEach luego al
                            // Borrar los productos de un lado y del otro se termina haciendo un lío
                            `
                <article class='cart-item cart-item${item.id} '>
                <div class="cart-item__img-container">
                <img src="../images/products/${product.image}" alt="${
                                product.name
                            }">
                </div>
                
                <div class="cart-item__desc">

                    <div class="cart-item__upper-desc">
                    <p class="cart-item__name">${product.name}</p>
                    <div>
                    <p class="cart-item__color"> ${
                        product.name
                    }</p> <a class="cart-item__color-picklist">${
                                product.color
                            }</a>
                    <span class="cart-item__dispatch">${
                        product.dispatch == 1 ? 'Envío Gratis' : ''
                    }</span>
                    </div>
                    </div>
                    
                    <div class="cart-item__lower-desc">
                    <div class="cart-item__quantity-and-trash">
                    <i class="fa-solid fa-arrow-up" data-pid="${item.id}"></i>
                    <span class="cart-item__quantity">Q. <span class="cart-item__quantity${item.id}"> ${item.q}</span></span>
                    <i class="fa-solid fa-arrow-down" data-pid="${item.id}"></i>
                    <a class='item--cursor-pointer'><i class="fa-solid fa-trash-can" data-pid="${
                        item.id
                    }"></i></a>
                    <p class="cart-item--green"> <span class="cart-item__price">$ ${toThousand(
                        parseFloat(product.price)
                    )}</span></p>
                    </div>
                    <p class="cart-item__total-price">$<span class="cart-item__total-price${item.id}"> ${toThousand(parseFloat(product.price * item.q, 2).toFixed(2))}</span></p>
                    </div>
                    
                </div>
                </article>
                `;
                        // Una cosa es mi carrito con toda mi data (let cart)
                        // Y otra es el id de cada producto que tengo que manipular, y del que luego voy a necesitar
                        // el $ y la quantity para generar la orden correspondiente. Por eso el array aparte.
                        // A fetched products van los que van a pasar por el checkout
                        fetchedProducts.push({
                            id: product.id,
                            price: product.price,
                            q: item.q,
                        });
                    } else {
                        // Si el producto pedido por fetch a la DB no viene, lo borro del objeto del carrito
                        // Tal vez le quedó en el storage y yo no lo vendo más. Lo borro de mi variable local general.
                        cart.splice(i, 1);
                        // Luego actualizo el carrito del storage, sino ese producto me va a seguir quedando
                        sessionStorage.setItem('cart', JSON.stringify(cart));
                    }
                })
                // Después de todo el forEach para renderizar el carrito.ejs según lo que haya en el storage
                // Ahí si, con todos los precios y cantidades, actualizo el "TOTAL $---"
                .then((r) => {
                    updateTotal();
                    // Y a cada cesto de basura le agrego el listener para borrar
                    // Lo busco por una clase común a todos los botonos
                    // Extraigo el target.dataset.pid y mando ese dato a la función para remover items del storage
                    // Tener en cuenta que una cosa es el data-id del botón para comprar un producto
                    // y otra cosa son los data-pid de los botones para remover un producto
                    let btnTrash = document.querySelectorAll('.fa-trash-can');
                    btnTrash.forEach((button, i) => {
                        button.addEventListener('click', (e) => {
                            let idProd = e.target.dataset.pid;
                            removeItemFromCart(idProd, cart);
                        });
                    });

                    // Funcion para aumentar las cantidades de un producto del carrito
                    let btnRaiseQuantity = document.querySelectorAll('.fa-arrow-up');
                    btnRaiseQuantity.forEach(button => {
                        button.addEventListener('click',(e) => {
                            let idProd = e.target.dataset.pid;
                            raiseQuantity(idProd, cart);
                        });
                    });
                    // Funcion para disminuirlas
                    let btnLowerQuantity = document.querySelectorAll('.fa-arrow-down');
                    btnLowerQuantity.forEach(button => {
                        button.addEventListener('click',(e) => {
                            let idProd = e.target.dataset.pid;
                            lowerQuantity(idProd, cart);
                        });
                    });
                });
        });

        function lowerQuantity(pId, cart){
            let productIndex = cart.findIndex(product => product.id == pId);
            if (cart[productIndex].q == 1) {
                cart.splice(productIndex, 1);
                fetchedProducts.splice(productIndex, 1);
                sessionStorage.setItem("cart", JSON.stringify(cart));
                let itemInCart = document.querySelector(`.cart-item${pId}`);
                itemInCart.remove();
                refreshCounter();
                cartToast.fire({
                    icon: 'warning',
                    title: `Item removed from the cart`,
                  });
                if(cart.length == 0) {
                    sessionStorage.setItem('cart', JSON.stringify([]));
                    navigator.sendBeacon('http://localhost:3033/api/cart/update_cart','[]');
                    fetchedProducts = [];

                    renderEmptyCart();
                    cartToast.fire({
                        icon: 'info',
                        title: 'You have emptied your cart'
                    });
                }
            } else {
                --cart[productIndex].q;
                --fetchedProducts[productIndex].q;
                updateQuantities(pId, 'lower');
                sessionStorage.setItem("cart", JSON.stringify(cart));
                refreshCounter();
                // Y si no hay nada en el carrito es porque ese elemento era el único y último
                // Sacamos el array entero del storage.
                // Reflejamos nuestra modificación en nuestro arreglo de productos seleccionados (reflejo del storage)
                  cartToast.fire({
                    icon: 'info',
                    title: 'Quantity decreased'
                  });
                  updateItemSubtotal(pId, productIndex)
            }
            updateTotal();
        }
        function raiseQuantity(pId, cart){
            let productIndex = cart.findIndex(product => product.id == pId);
            ++cart[productIndex].q;
            ++fetchedProducts[productIndex].q;
            sessionStorage.setItem("cart", JSON.stringify(cart));
            updateQuantities(pId, 'raise');
            refreshCounter();
            updateItemSubtotal(pId, productIndex)
            updateTotal();
            cartToast.fire({
                icon: 'info',
                title: 'Quantity increased!'
                });
        }
        function updateQuantities(pId, action){
            let itemQ = document.querySelector(`.cart-item__quantity${pId}`);
            let qNumber = Number(itemQ.innerText);
            if (action == 'raise'){
                itemQ.innerText = ++qNumber;
            } else if (action == 'lower'){
                itemQ.innerText = --qNumber;
            }
        }
        // Esta función puede ser que pueda ir en otra parte del código, hay que testear el scope
        // Prevenimos el default del form
        // Traemos y procesamos toda la info con la que vamos a llenar 1 registro de la tabla orders
        cartContainer.addEventListener('submit', (e) => {
            e.preventDefault();
            let paymentMethodInput =
                document.querySelector('#paymentMethod').value;
            let phoneInput = document.querySelector('#phone').value;
            let streetInput = document.querySelector('#street').value;
            let cityInput = document.querySelector('#city').value;
            let fullShippingAddress = streetInput + ', ' + cityInput;
            // Preparamos el body del POST para crear la orden
            let formData = {
                amount: parseFloat(getSubtotal(fetchedProducts)).toFixed(2),
                shippingAddress: fullShippingAddress,
                phone: phoneInput,
                paymentMethod: paymentMethodInput,
            };
            // Preparamos el la config default..
            let config = {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(formData),
            };
            // Pasamos la config del POST de la orden, a una función asíncrona que va a hacer 2 cosas:
            // El post de la orden
            // Y 1 post por cada order-detail
            createOrderAndOrderDetails(config);
        });

        //Todo esto si hay storage. Ahora, si no hay storage no hay carrito.
        // No solo no renderizo, sino que además borro las tablas y headers, etc.
    } else {
        renderEmptyCart();
    }

    // Más arriba, si había storage y la persona mandaba el form, hacíamos el call para las peticiones:
    // Cuando la orden se cree, va a retornar la respuesta con el order_id, que vamos a guardar en createdOrderId
    async function createOrderAndOrderDetails(config) {
        let orderRawResponse = await fetch(`/api/cart/orders/create`, config);
        let parsedOrderResponse = await orderRawResponse.json();
        createdOrderId = parsedOrderResponse.order.id;
        // Hecha la compra, chau storage, y borramos el render de cada articulo del carrito
        vaciarStorage();

        // Luego vamos a usar el array fetchedProducts donde guardamos de cada item del storage

        // Para crear los order-details y poblar la tabla en la DB, ya habíamos guardado el order_id
        // Vamos a usar el id y la quantity de cada producto para que sean nuestro product_id y quantity:
        fetchedProducts.forEach((product) => {
            let config2 = {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    order_id: createdOrderId,
                    product_id: product.id,
                    quantity: product.q,
                }),
            };
            fetch(`/api/cart/orders/createDetails`, config2)
                .then((response) => response.json())
                .then((parsedResponse) => {
                    cartToast.fire({
                        toast: false,
                        icon: 'success',
                        title: `Order submitted`,
                        text: 'Redirecting...',
                        position: 'center',
                        backdrop: true,
                        didClose: () => {
                            Swal.showLoading();
                            window.location.href = `/cart/orders/details/${createdOrderId}`;
                        },
                    });
                });
        });
    }

    // Sección derecha del carrito. Precio x cantidad
    function getSubtotal(products) {
        return products.reduce((acum, elem) => {
            return (acum += elem.price * elem.q);
        }, 0);
    }

    // Remueve todo el carrito, y además te limpia el HTML
    function vaciarStorage() {
        sessionStorage.setItem('cart', JSON.stringify([]));
        navigator.sendBeacon('http://localhost:3033/api/cart/update_cart','[]');
        renderEmptyCart();
    }

    // El data-pid del botón de borrado va a representar a nuestro id de producto REAL
    // Ese ID es el mismo que está tanto en la DB como en el storage
    // Vamos a buscar quirúrgicamente y según su ID, aquel elemento cuyo id coincida con el id guardado en el botón
    // Nos va a devolver el índice en el que se encuentra en nuestro array (que es un reflejo del storage)
    // Lo removemos, ahora sí, según el índice (pero habiéndolo filtrado fielmente según EL id)
    function removeItemFromCart(pId, cart) {
        if (cart.length > 1) {
            let productIndex = cart.findIndex((product) => product.id == pId);
            // Lo sacamos de nuestro reflejo de storage, y actualizamos el storage
            cart.splice(productIndex, 1);
            fetchedProducts.splice(productIndex, 1);
            sessionStorage.setItem('cart', JSON.stringify(cart));
            // Al mismo tiempo, deleteamos el HTML vinculado (por supuesto...) al ID real del objeto.
            let itemInCart = document.querySelector(`.cart-item${pId}`);
            itemInCart.remove();
            // Actualizamos el numerito del ícono
            refreshCounter();
            cartToast.fire({
                icon: 'warning',
                title: `Item removed from the cart`,
            });
        } else {
            // Y si no hay nada en el carrito es porque ese elemento era el único y último
            // Sacamos el array entero del storage.
            // Reflejamos nuestra modificación en nuestro arreglo de productos seleccionados (reflejo del storage)
            sessionStorage.setItem('cart', '[]');
            fetchedProducts = [];
            // Y hacemos que coincida la realidad con lo que ve el usuario. Limpiamos el html.
            renderEmptyCart();
            cartToast.fire({
                icon: 'info',
                title: 'You have emptied your cart',
            });
        }
        updateTotal();
    }

    function renderEmptyCart() {
        cartContainer.innerHTML = `
        <div>
            <p class="cart-subtotal__text">No tienes agregado ningún producto al carrito de compras</p>
            <a href="/products" class="btn btn-product-edit btn-anchor">Buscar productos</a>
        </div>
        `;
        refreshCounter();
    }

    function refreshCounter() {
        cartItemCounter.innerText = sessionStorage.cart
            ? JSON.parse(sessionStorage.cart).length
            : 0;
    }

    function checkCart() {
        cart = sessionStorage.cart ? JSON.parse(sessionStorage.cart) : [];
    }
    function updateTotal() {
        totalAmountOutput.innerText = `$${toThousand(
            parseFloat(getSubtotal(fetchedProducts)).toFixed(2)
        )}`;
    }

    function updateItemSubtotal(pId, pIndex){
        let itemSubtotal = document.querySelector(`.cart-item__total-price${pId}`);
        itemSubtotal.innerText = toThousand(parseFloat(fetchedProducts[pIndex].price * fetchedProducts[pIndex].q, 2).toFixed(2));
    }

    const cartToast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
    });
    // Ni bien carga o si venimos de una redirección, revisar el storage para mantener actualizado el HTML
    checkCart();
});
