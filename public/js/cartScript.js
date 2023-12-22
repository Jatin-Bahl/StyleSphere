let cart = [];
let total = 0;

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    total += price;

    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cart-list');
    const totalElement = document.getElementById('total');

    // Clear the cart list
    cartList.innerHTML = '';

    // Populate the cart list
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartList.appendChild(li);
    });

    // Update the total
    totalElement.textContent = total.toFixed(2);

    // Display the cart container
    const cartContainer = document.getElementById('cart-container');
    cartContainer.style.display = 'block';

    // Update the cart count in the header
    const cartCount = document.getElementById('cart');
    cartCount.textContent = `Cart (${cart.length})`;
}
