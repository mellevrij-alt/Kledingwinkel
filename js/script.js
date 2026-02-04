let cart = [];

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    alert(`${name} is toegevoegd aan je winkelwagen!`);
    console.log(cart);
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    renderCart();
}

function renderCart() {
    const cartContainer = document.querySelector('.cart');
    if (!cartContainer) return;

    let cartHTML = '<h2>Winkelwagen</h2>';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartHTML += `
        <div class="cart-item">
            ${item.name} — €${item.price.toFixed(2)}
            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', this.value)">
            <button onclick="removeFromCart('${item.name}')">Verwijder</button>
        </div>`;
    });

    cartHTML += `<h3>Totaal: €${total.toFixed(2)}</h3>`;
    cartHTML += `<button class="cta">Verder naar checkout</button>`;
    cartContainer.innerHTML = cartHTML;
}

function updateQuantity(name, quantity) {
    const item = cart.find(i => i.name === name);
    if (item) {
        item.quantity = parseInt(quantity);
    }
    renderCart();
}

function toggleLike(button) {
    button.classList.toggle('liked');
    button.textContent = button.classList.contains('liked') ? '❤️ Liked' : '❤️ Like';
}
