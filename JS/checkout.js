// Using your provided PRODUCT DATA
const PRODUCT_DATA = [
    { ProductID: 1, ProductName: 'Hot Chocolate', Price: 2.00, ImagePath: 'Media/h1.png' },
    { ProductID: 2, ProductName: 'Espresso', Price: 2.50, ImagePath: 'Media/h2.png' },
    { ProductID: 3, ProductName: 'Cappuccino', Price: 2.50, ImagePath: 'Media/h3.png' },
    { ProductID: 4, ProductName: 'Mocha', Price: 2.50, ImagePath: 'Media/h4.png' },
    { ProductID: 5, ProductName: 'Cafe Latte', Price: 2.50, ImagePath: 'Media/h5.png' },
    { ProductID: 6, ProductName: 'Flat White', Price: 2.50, ImagePath: 'Media/h6.png' },
    { ProductID: 7, ProductName: 'Tea', Price: 2.00, ImagePath: 'Media/h7.png' },

    { ProductID: 8, ProductName: 'Vanilla Milkshake', Price: 3.00, ImagePath: 'Media/c1.png' },
    { ProductID: 9, ProductName: 'Chocolate Milkshake', Price: 3.00, ImagePath: 'Media/c2.png' },
    { ProductID: 10, ProductName: 'Coffee Milkshake', Price: 3.00, ImagePath: 'Media/c3.png' },
    { ProductID: 11, ProductName: 'Mocha Milkshake', Price: 3.00, ImagePath: 'Media/c4.png' },
    { ProductID: 12, ProductName: 'Iced Chocolate', Price: 3.50, ImagePath: 'Media/c5.png' },
    { ProductID: 13, ProductName: 'Iced Coffee', Price: 3.50, ImagePath: 'Media/c6.png' },

    { ProductID: 14, ProductName: 'Scone (1 Piece)', Price: 1.00, ImagePath: 'Media/b1.png' },
    { ProductID: 15, ProductName: 'Scone (2 Pieces)', Price: 2.00, ImagePath: 'Media/b2.png' },
    { ProductID: 16, ProductName: 'Toastie', Price: 2.00, ImagePath: 'Media/b3.png' },

    { ProductID: 17, ProductName: 'Caramel Shot', Price: 0.50, ImagePath: 'Media/e1.png' },
    { ProductID: 18, ProductName: 'Vanilla Shot', Price: 0.50, ImagePath: 'Media/e2.png' },
    { ProductID: 19, ProductName: 'Hazelnut Shot', Price: 0.50, ImagePath: 'Media/e3.png' }
];

function updateTotals() {

    // SAME CART SYSTEM AS CART PAGE
    const cartIds = JSON.parse(localStorage.getItem('userCart')) || [];
    const cartQuantities = JSON.parse(localStorage.getItem('cartQuantities')) || {};

    let subtotal = 0;

    // calculate subtotal from cart (same logic as cart.js)
    cartIds.forEach(id => {
        const product = PRODUCT_DATA.find(p => p.ProductID === parseInt(id));
        if (product) {
            const qty = cartQuantities[id] || 1;
            subtotal += product.Price * qty;
        }
    });

    // GST (10%)
    const gst = subtotal * 0.10;

    // pickup method (NOT shipping anymore)
    const methodRadios = document.getElementsByName('method');
    let pickupFee = 0;

    methodRadios.forEach(radio => {
        if (radio.checked) {
            pickupFee = parseFloat(radio.value);
        }
    });

    // TOTAL
    const total = subtotal + gst + pickupFee;

    // UI updates
    const subtotalDisplay = document.getElementById('summary-subtotal');
    const gstDisplay = document.getElementById('gst-amount');
    const shippingDisplay = document.getElementById('shipping-cost');
    const totalDisplay = document.getElementById('grand-total');
    const cartCount = document.getElementById('cart-count');

    if (subtotalDisplay) subtotalDisplay.textContent = `$${subtotal.toFixed(2)}`;
    if (gstDisplay) gstDisplay.textContent = `$${gst.toFixed(2)}`;
    if (shippingDisplay) shippingDisplay.textContent = `$${pickupFee.toFixed(2)}`;
    if (totalDisplay) totalDisplay.textContent = `$${total.toFixed(2)}`;
    if (cartCount) cartCount.textContent = cartIds.length;
}

// live update when pickup option changes
document.addEventListener('change', (event) => {
    if (event.target.name === 'method') {
        updateTotals();
    }
});

// move to payment (keeps cart intact)
const shippingForm = document.getElementById('shipping-form');
if (shippingForm) {
    shippingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.href = "payment.html";
    });
}

// load on page start
document.addEventListener('DOMContentLoaded', updateTotals);