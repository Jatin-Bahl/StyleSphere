let cart = [];
        let total = 0;


        function addToCart(productName, price) {
            cart.push({ name: productName, price: price });
            total += price;
            updateCart();
            updateTotalForPaymentGateway();
        }
        function updateTotalForPaymentGateway() {
            const rzpButton = document.getElementById('rzp-button');
            
            // Update the total in paise
            const totalInPaise = Math.ceil(parseFloat(total) * 100);
            console.log("Total in paise:", totalInPaise);

            // Update the total amount in the payment gateway options
            options.amount = totalInPaise;

            // You may need to recreate the Razorpay instance with updated options
            const rzpInstance = new Razorpay(options);
            
            // Update the click event listener
            rzpButton.addEventListener('click', function () {
                rzpInstance.open();
            });
        }
        const rzpKey = 'enter_your_razorpay_key';
        
        const options = {
            key: rzpKey,
            amount: Math.ceil(total * 100), 
            currency: 'INR',
            name: 'StyleSphere',
            description: 'Payment for your order',
            handler: function (response) {
                alert('Payment successful!'); 
            },
            prefill: {
                name: 'Customer Name',
                email: 'customer@example.com',
                contact: '1234567890',
            },
            notes: {
                address: 'Your Store Address',
            },
            theme: {
                color: '#a4916d', 
            },
        };
    
        const rzpButton = document.getElementById('rzp-button');
        rzpButton.addEventListener('click', function () {
            const rzpInstance = new Razorpay(options);
            rzpInstance.open();
        });


        function updateCart() {
            const cartList = document.getElementById('cart-items');
            const totalElement = document.getElementById('total');

            // Clear the cart list
            cartList.innerHTML = '';

            // Populate the cart list
            cart.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - ₹${item.price.toFixed(2)}`;
                cartList.appendChild(li);
            });

            // Update the total
            totalElement.textContent = `Total: ₹${total.toFixed(2)}`;

            // Display the cart container
            const cartContainer = document.getElementById('cart-container');
            cartContainer.style.display = 'block';

            // Update the cart count in the header
            const cartCount = document.querySelector('.cart-count');
            cartCount.textContent = `(${cart.length})`;
        }

        function toggleCart() {
            const cartContainer = document.getElementById('cart-container');
            cartContainer.style.display = (cartContainer.style.display === 'none') ? 'block' : 'none';
        }
