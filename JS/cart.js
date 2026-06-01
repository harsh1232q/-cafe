// This array stores all products displayed in the shop.
// Each product contains details like name, price, category, description, stock, and image.
const ALL_PRODUCTS = [

    // HOT DRINKS
    { ProductID: 1, ProductName: 'Hot Chocolate', Price: 2.00, CategoryName: 'Hot Drinks', Description: 'A warm and creamy hot chocolate perfect for cold mornings before school.', StockLevel: 50, ImagePath: 'Media/h1.png' },
    { ProductID: 2, ProductName: 'Espresso', Price: 2.50, CategoryName: 'Hot Drinks', Description: 'A strong coffee shot with rich flavour and smooth texture.', StockLevel: 40, ImagePath: 'Media/h2.png' },
    { ProductID: 3, ProductName: 'Cappuccino', Price: 2.50, CategoryName: 'Hot Drinks', Description: 'Fresh espresso combined with steamed milk and light foam.', StockLevel: 45, ImagePath: 'Media/h3.png' },
    { ProductID: 4, ProductName: 'Mocha', Price: 2.50, CategoryName: 'Hot Drinks', Description: 'A smooth mix of coffee and chocolate served warm.', StockLevel: 35, ImagePath: 'Media/h4.png' },
    { ProductID: 5, ProductName: 'Cafe Latte', Price: 2.50, CategoryName: 'Hot Drinks', Description: 'Creamy steamed milk blended with rich espresso coffee.', StockLevel: 55, ImagePath: 'Media/h5.png' },
    { ProductID: 6, ProductName: 'Flat White', Price: 2.50, CategoryName: 'Hot Drinks', Description: 'A smooth coffee with velvety milk and balanced flavour.', StockLevel: 50, ImagePath: 'Media/h6.png' },
    { ProductID: 7, ProductName: 'Tea', Price: 2.00, CategoryName: 'Hot Drinks', Description: 'A warm cup of tea prepared fresh for a relaxing morning drink.', StockLevel: 60, ImagePath: 'Media/h7.png' },

    // COLD DRINKS
    { ProductID: 8, ProductName: 'Vanilla Milkshake', Price: 3.00, CategoryName: 'Cold Drinks', Description: 'A cold and creamy vanilla milkshake served fresh.', StockLevel: 40, ImagePath: 'Media/c1.png' },
    { ProductID: 9, ProductName: 'Chocolate Milkshake', Price: 3.00, CategoryName: 'Cold Drinks', Description: 'A rich chocolate milkshake blended for a refreshing treat.', StockLevel: 40, ImagePath: 'Media/c2.png' },
    { ProductID: 10, ProductName: 'Coffee Milkshake', Price: 3.00, CategoryName: 'Cold Drinks', Description: 'A chilled coffee-flavoured milkshake with smooth texture.', StockLevel: 35, ImagePath: 'Media/c3.png' },
    { ProductID: 11, ProductName: 'Mocha Milkshake', Price: 3.00, CategoryName: 'Cold Drinks', Description: 'A refreshing blend of coffee and chocolate flavours.', StockLevel: 35, ImagePath: 'Media/c4.png' },
    { ProductID: 12, ProductName: 'Iced Chocolate', Price: 3.50, CategoryName: 'Cold Drinks', Description: 'Cold chocolate drink served over ice for a refreshing experience.', StockLevel: 30, ImagePath: 'Media/c5.png' },
    { ProductID: 13, ProductName: 'Iced Coffee', Price: 3.50, CategoryName: 'Cold Drinks', Description: 'A chilled iced coffee drink perfect for warm mornings.', StockLevel: 30, ImagePath: 'Media/c6.png' },

    // BREAKFAST
    { ProductID: 14, ProductName: 'Scone (1 Piece)', Price: 1.00, CategoryName: 'Breakfast', Description: 'Freshly prepared scone served warm as a light breakfast snack.', StockLevel: 70, ImagePath: 'Media/b1.png' },
    { ProductID: 15, ProductName: 'Scone (2 Pieces)', Price: 2.00, CategoryName: 'Breakfast', Description: 'Two freshly prepared scones perfect for a quick breakfast.', StockLevel: 60, ImagePath: 'Media/b2.png' },
    { ProductID: 16, ProductName: 'Toastie', Price: 2.00, CategoryName: 'Breakfast', Description: 'A warm toasted sandwich prepared fresh each morning.', StockLevel: 50, ImagePath: 'Media/b3.png' },

    // EXTRAS
    { ProductID: 17, ProductName: 'Caramel Shot', Price: 0.50, CategoryName: 'Extras', Description: 'Add a caramel flavour shot to customise your drink.', StockLevel: 100, ImagePath: 'Media/e1.png' },
    { ProductID: 18, ProductName: 'Vanilla Shot', Price: 0.50, CategoryName: 'Extras', Description: 'Add a smooth vanilla flavour shot to any beverage.', StockLevel: 100, ImagePath: 'Media/e2.png' },
    { ProductID: 19, ProductName: 'Hazelnut Shot', Price: 0.50, CategoryName: 'Extras', Description: 'Add a sweet hazelnut flavour shot for extra taste.', StockLevel: 100, ImagePath: 'Media/e3.png' }
];

// This stores how many of each item the user added to cart.
let cartQuantities = JSON.parse(localStorage.getItem('cartQuantities')) || {};

function loadCart() {
    // Get saved cart items from storage
    const cartIds = JSON.parse(localStorage.getItem('userCart')) || [];
    
    // Get page elements
    const tableBody = document.getElementById('cart-items-body');
    const grandTotalSpan = document.getElementById('grand-total');
    const subtotalSpan = document.getElementById('summary-subtotal');
    const gstSpan = document.getElementById('gst-amount');
    const cartCount = document.getElementById('cart-count');

    let html = ""; // stores table rows
    let grandTotal = 0; // total price of cart

    // Get only products that are actually in the cart
    const activeItems = ALL_PRODUCTS.filter(p => cartIds.includes(p.ProductID));

    // Loop through each cart item
    activeItems.forEach(item => {

        // If item has no quantity yet, set it to 1
        if (!cartQuantities[item.ProductID]) cartQuantities[item.ProductID] = 1;
        
        const qty = cartQuantities[item.ProductID];
        const rowTotal = item.Price * qty;
        grandTotal += rowTotal;

        // Create a row for each product
        html += `
            <tr>
                <td><img src="${item.ImagePath}" alt="${item.ProductName}" style="width:50px; height:50px; object-fit:contain;"></td>
                <td><strong>${item.ProductName}</strong></td>
                <td>$${item.Price.toFixed(2)}</td>
                <td>
                    <div class="qty-box">
                        <button class="qty-btn" onclick="changeQty(${item.ProductID}, -1)">−</button>
                        <span>${qty}</span>
                        <button class="qty-btn" onclick="changeQty(${item.ProductID}, 1)">+</button>
                    </div>
                </td>
                <td>$${rowTotal.toFixed(2)}</td>
                <td><button class="remove-btn-icon" onclick="removeItem(${item.ProductID})">Remove</button></td>
            </tr>`;
    });

    // GST + TOTAL CALCULATION
    const gst = grandTotal * 0.10;
    const finalTotal = grandTotal + gst;

    // Show message if cart is empty
    if (tableBody) {
        tableBody.innerHTML = html || "<tr><td colspan='6' style='text-align:center; padding:40px;'>Your cart is empty.</td></tr>";
    }
    
    // Show totals
    if (subtotalSpan) subtotalSpan.textContent = `$${grandTotal.toFixed(2)}`;
    if (gstSpan) gstSpan.textContent = `$${gst.toFixed(2)}`;
    if (grandTotalSpan) grandTotalSpan.textContent = `$${finalTotal.toFixed(2)}`;

    // Show number of items in cart (top badge)
    if (cartCount) cartCount.textContent = cartIds.length;

    // Save updated quantities
    localStorage.setItem('cartQuantities', JSON.stringify(cartQuantities));
}

// Increases or decreases item amount
window.changeQty = (id, delta) => {
    cartQuantities[id] = (cartQuantities[id] || 1) + delta;
    if (cartQuantities[id] < 1) cartQuantities[id] = 1;
    loadCart();
};

// Deletes product from cart completely
window.removeItem = (id) => {
    let ids = JSON.parse(localStorage.getItem('userCart')) || [];
    localStorage.setItem('userCart', JSON.stringify(ids.filter(i => i !== id)));
    delete cartQuantities[id];
    loadCart();
};

// Sends user to shipping page if cart is not empty
window.goToShipping = () => {
    const cartIds = JSON.parse(localStorage.getItem('userCart')) || [];
    if (cartIds.length === 0) {
        alert("Your cart is empty!");
    } else {
        window.location.href = "checkout.html";
    }
};

// Run cart loading when page opens
document.addEventListener('DOMContentLoaded', loadCart);