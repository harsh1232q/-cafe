// This is the full list of products used to calculate prices.
const PRODUCT_DATA = [
    { ProductID: 1, ProductName: 'Hot Chocolate', Price: 2.00 },
    { ProductID: 2, ProductName: 'Espresso', Price: 2.50 },
    { ProductID: 3, ProductName: 'Cappuccino', Price: 2.50 },
    { ProductID: 4, ProductName: 'Mocha', Price: 2.50 },
    { ProductID: 5, ProductName: 'Cafe Latte', Price: 2.50 },
    { ProductID: 6, ProductName: 'Flat White', Price: 2.50 },
    { ProductID: 7, ProductName: 'Tea', Price: 2.00 },

    { ProductID: 8, ProductName: 'Vanilla Milkshake', Price: 3.00 },
    { ProductID: 9, ProductName: 'Chocolate Milkshake', Price: 3.00 },
    { ProductID: 10, ProductName: 'Coffee Milkshake', Price: 3.00 },
    { ProductID: 11, ProductName: 'Mocha Milkshake', Price: 3.00 },
    { ProductID: 12, ProductName: 'Iced Chocolate', Price: 3.50 },
    { ProductID: 13, ProductName: 'Iced Coffee', Price: 3.50 },

    { ProductID: 14, ProductName: 'Scone (1 Piece)', Price: 1.00 },
    { ProductID: 15, ProductName: 'Scone (2 Pieces)', Price: 2.00 },
    { ProductID: 16, ProductName: 'Toastie', Price: 2.00 },

    { ProductID: 17, ProductName: 'Caramel Shot', Price: 0.50 },
    { ProductID: 18, ProductName: 'Vanilla Shot', Price: 0.50 },
    { ProductID: 19, ProductName: 'Hazelnut Shot', Price: 0.50 }
];

// This calculates subtotal, GST, and final price.
function loadTotals() {

    // Get items user added to cart
    const cartIds = JSON.parse(localStorage.getItem('userCart')) || [];

    // Get quantity of each item
    const cartQuantities = JSON.parse(localStorage.getItem('cartQuantities')) || {};

    let subtotal = 0;

    // Go through each cart item and calculate total price
    cartIds.forEach(id => {
        const product = PRODUCT_DATA.find(p => p.ProductID === parseInt(id));
        if (product) {
            subtotal += product.Price * (cartQuantities[id] || 1);
        }
    });

    // GST (10%)
    const gst = subtotal * 0.10;

    // Final total
    const total = subtotal + gst;

    // Show subtotal on page
    document.getElementById('summary-subtotal').textContent = `$${subtotal.toFixed(2)}`;

    // Show GST
    document.getElementById('gst-amount').textContent = `$${gst.toFixed(2)}`;

    // Show final total
    document.getElementById('grand-total').textContent = `$${total.toFixed(2)}`;

    // Show number of items in cart
    document.getElementById('cart-count').textContent = cartIds.length;
}

// Runs when user clicks "Pay"
document.getElementById('finalPaymentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    if (!document.getElementById('agreeTerms').checked) {
        alert("Please agree to the order.");
        return;
    }

    const overlay = document.getElementById('paymentSuccessOverlay');
    const timestampBox = document.getElementById('submissionTimestamp');
    const emailBox = document.getElementById('confirmationEmailText');
    const userEmail = document.getElementById('pay-email').value;

    overlay.style.display = 'flex';
    emailBox.textContent = `Confirmation will be sent to ${userEmail}`;

    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Australia/Sydney',
        timeZoneName: 'short'
    };

    timestampBox.textContent = `Order placed at: ${now.toLocaleString('en-AU', options)}`;

    // Clear cart properly
    localStorage.removeItem('userCart');
    localStorage.removeItem('cartQuantities');

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 5000);
});

// Run totals when page loads
document.addEventListener('DOMContentLoaded', loadTotals);