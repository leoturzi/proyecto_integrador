const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
let itemQuantity = document.querySelectorAll('.cart-item__quantity');
let amoutPerUnit = document.querySelectorAll('.cart-item__price');
let totalAmountPerItem = document.querySelectorAll('.cart-item__total-price');
let cartSubtotal = document.querySelector('.cart-subtotal__total-amount');

window.addEventListener('load', (e) => {
    itemQuantity.forEach((aCadaSelect, index) => {
        totalAmountPerItem[index].innerText = `$${toThousand(parseInt(aCadaSelect.value) * parseInt(amoutPerUnit[index].innerText.split('.').join('')))} `
    })
    // totalAmountPerItem.filter()
    itemQuantity.forEach((aCadaSelect, index) => {
        aCadaSelect.addEventListener('change', (e) => {
            totalAmountPerItem[index].innerText = `$${toThousand(parseInt(aCadaSelect.value) * parseInt(amoutPerUnit[index].innerText.split('.').join('')))} `
        });
    }) 
})

