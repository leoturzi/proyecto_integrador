window.addEventListener('load', (e) => {
    
    const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    let tableBody = document.querySelector('.cart-orders__tbody');
    fetch('/api/cart/orders')
    .then(results => results.json())
    .then(orders => {
        let allOrders = orders.orders;
        // Si vienen ordenes renderizamos c/u en 1 <tr>...
        if (allOrders && allOrders.length > 0) {
            tableBody.innerHTML =
            `
            <tr class="cart-orders__row">
                <th>Status</th>
                <th>Date</th>
                <th>Shipping Address</th>
                <th>Payment Method</th>
                <th>Total</th>
                <th>Details</th>
            </tr>
            `;
            renderOrders(allOrders)
        } else {
            // Sino limpiamos el HTML
            emptyOrders()
        }
    })

    function emptyOrders() {
        tableBody.innerHTML =
        `
        <p>No cuentas con ordenes cargadas por el momento!</p>
        `
    }

    // Aprovechamos el createdAt, nos quedamos solo con el DATE, descartamos el TIME.
    // En cada <tr> para cada orden, vamos a crear un <a> que lleve al listado de order-details
    function renderOrders(orders) {
        orders.forEach((order, i) => {
            let orderRow = document.createElement('tr');
            orderRow.setAttribute('class', 'cart-orders__row');
            orderRow.classList.add(`cart-orders__row-${i}`)
            let creationTime = order.created_at;
            orderRow.innerHTML= 
            `
                <td>${order.order_status}</td>
                <td>${creationTime.substring(0,10)}</td>
                <td>${order.shippingAddress}</td>
                <td>${order.paymentMethod}</td>
                <td>$${toThousand(order.amount.toFixed(2))}</td>
                <td><a href="/cart/orders/details/${order.id}"">Ver</a></td>
            `
            tableBody.append(orderRow)
        
        })
    }

})