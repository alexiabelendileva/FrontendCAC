// Selecciona elementos del DOM
const ticketList = document.getElementById('ticket-list');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const stockDisplay = document.getElementById('stock-display');
const discountCategory = document.getElementById('discount-category');
const clearCartButton = document.getElementById('clear-cart');

// Inicializa el total del carrito, el stock y el descuento
let total = 0;
let stock = 10; // Stock disponible
let selectedDiscount = 0; // Descuento inicial (0)

// Función para actualizar las opciones del select
function updateSelectOptions() {
    const select = document.getElementById('ticket-quantity');
    select.innerHTML = '';

    for (let i = 1; i <= stock; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        select.appendChild(option);
    }
}

// Función para eliminar un ticket del carrito
function removeFromCart(cartItem) {
    const price = parseFloat(cartItem.getAttribute('data-price'));
    total -= price;

    // Actualiza el total
    cartTotal.textContent = total.toFixed(2); // Redondea a dos decimales

    // Elimina el elemento del carrito
    cartItems.removeChild(cartItem);

    // Actualiza el stock cuando se elimina un elemento del carrito
    stock++;
    stockDisplay.textContent = stock;

    // Actualiza las opciones del select
    updateSelectOptions();
}

// Agregar eventos de clic para eliminar elementos del carrito
cartItems.addEventListener('click', (event) => {
    const cartItem = event.target.parentElement;
    if (cartItem && event.target.className === 'remove-from-cart') {
        removeFromCart(cartItem);
    }
});

// Función para agregar un ticket al carrito
function addToCart(ticket) {
    const ticketName = ticket.querySelector('h2').textContent;
    const ticketPrice = 200; // Precio fijo del ticket
    const ticketQuantity = parseInt(ticket.querySelector('select').value);

    if (isNaN(ticketQuantity) || ticketQuantity <= 0) {
        alert('No hay stock disponible.');
        return;
    }


    // Cálculo del precio con descuento
    const discountedPrice = ticketPrice - (ticketPrice * selectedDiscount);

    // Crea un elemento en el carrito para cada ticket
    for (let i = 0; i < ticketQuantity; i++) {
        // Crea un elemento en el carrito
        const cartItemElement = document.createElement('li');
        cartItemElement.innerHTML = `${ticketName} - Precio: $${ticketPrice} - Descuento: ${(selectedDiscount * 100).toFixed(0)}% - Precio Final: $${discountedPrice.toFixed(2)} <button class="remove-from-cart">X</button>`;
        cartItemElement.setAttribute('data-price', discountedPrice);
        cartItems.appendChild(cartItemElement);

        // Actualiza el total
        total += discountedPrice;
        cartTotal.textContent = total.toFixed(2);
    }

    // Actualiza el stock
    stock -= ticketQuantity;
    stockDisplay.textContent = stock;

    // Actualiza las opciones del select
    updateSelectOptions();
}


updateSelectOptions();

// Agregar eventos de clic a los botones "Agregar al carrito"
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        addToCart(event.target.parentElement);
    });
});

// Agregar evento de cambio al select de categoría de descuento
discountCategory.addEventListener('change', (event) => {
    selectedDiscount = parseFloat(event.target.value);
});



// Agregar evento de clic al botón "Eliminar Todo"
clearCartButton.addEventListener('click', () => {
    clearCart();
  
});



// Función para eliminar todo el carrito
function clearCart() {
    
    cartItems.innerHTML = ''; // Elimina todos los elementos del carrito
    total = 0; // Restablece el total a 0
    cartTotal.textContent = '0.00';
    stock = 10; // Restablece el stock
    stockDisplay.textContent = '10';

    updateSelectOptions(); // Actualiza las opciones del select
}



