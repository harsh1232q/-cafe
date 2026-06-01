// This array stores all products displayed in the shop.
// Each product contains details like name, price, category, description, stock, and image.
const PRODUCT_DATA = [

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
{ ProductID: 13, ProductName: 'Coffee Iced', Price: 3.50, CategoryName: 'Cold Drinks', Description: 'A chilled iced coffee drink perfect for warm mornings.', StockLevel: 30, ImagePath: 'Media/c6.png' },

// BREAKFAST
{ ProductID: 14, ProductName: 'Scone (1 Piece)', Price: 1.00, CategoryName: 'Breakfast', Description: 'Freshly prepared scone served warm as a light breakfast snack.', StockLevel: 70, ImagePath: 'Media/b1.png' },
{ ProductID: 15, ProductName: 'Scone (2 Pieces)', Price: 2.00, CategoryName: 'Breakfast', Description: 'Two freshly prepared scones perfect for a quick breakfast.', StockLevel: 60, ImagePath: 'Media/b2.png' },
{ ProductID: 16, ProductName: 'Toastie', Price: 2.00, CategoryName: 'Breakfast', Description: 'A warm toasted sandwich prepared fresh each morning.', StockLevel: 50, ImagePath: 'Media/b3.png' },

// EXTRAS
{ ProductID: 17, ProductName: 'Caramel Shot', Price: 0.50, CategoryName: 'Extras', Description: 'Add a caramel flavour shot for extra tast in your hot chocolate.', StockLevel: 100, ImagePath: 'Media/e1.png' },
{ ProductID: 18, ProductName: 'Vanilla Shot', Price: 0.50, CategoryName: 'Extras', Description: 'Add a smooth vanilla flavour shot for extra taste in your hot chocolate.', StockLevel: 100, ImagePath: 'Media/e2.png' },
{ ProductID: 19, ProductName: 'Hazelnut Shot', Price: 0.50, CategoryName: 'Extras', Description: 'Add a sweet hazelnut flavour shot for extra taste in your hot chocolate.', StockLevel: 100, ImagePath: 'Media/e3.png' }
];

// Runs once the page has fully loaded
// Getting things from the page (like search bar, buttons, etc.)
document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('product-list'); 
    const searchInput = document.getElementById('search-input');
    const cartCountLabel = document.getElementById('cart-count');
    const sortButtons = document.querySelectorAll('.sort');
    const filterButtons = document.querySelectorAll('.filter');

    // Keeps track of what user is doing
    let currentSort = 'default'; // how products are sorted
    let currentFilter = 'all'; // category filter
    let cart = JSON.parse(localStorage.getItem('userCart')) || []; // saved cart
    
    // Shows how many items are in cart
    function updateCartUI() {
        if (cartCountLabel) {
            cartCountLabel.textContent = cart.length;
            cartCountLabel.style.display = cart.length > 0 ? 'inline-block' : 'none';
        }
    }

    // Displays all products on the page
function renderShop(productsToRender) {
    productsContainer.innerHTML = productsToRender.map(product => {
        const isAdded = cart.includes(product.ProductID);
        return `
            <div class="product-card">
                <div class="product-card-image-wrapper">
                    <img src="${product.ImagePath}" alt="${product.ProductName}" class="product-image">
                </div>
                <div class="product-card-body">
                    <h3 class="product-name">${product.ProductName}</h3>
                    <span class="product-category">${product.CategoryName}</span>
                    <p class="product-description">${product.Description}</p>
                    <div class="product-footer">
                        <p class="product-price">$${product.Price.toFixed(2)}</p>
                        <button class="cart-btn ${isAdded ? 'remove' : ''}" onclick="toggleCart(${product.ProductID})">
                            🛒 ${isAdded ? 'Remove' : 'Add'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ADD / REMOVE CART 
    window.toggleCart = (id) => {
        const index = cart.indexOf(id);
        if (index > -1) cart.splice(index, 1);
        else cart.push(id);
        localStorage.setItem('userCart', JSON.stringify(cart));
        updateCartUI();
        applyFilters(); 
    };

     // SHOW STOCK ALERT 
    window.checkStock = (level) => alert(`BBHS Café Stock: ${level} items available.`);

    // SEARCH + FILTER + SORT 
    function applyFilters() {
        let results = [...PRODUCT_DATA];
        const query = searchInput.value.toLowerCase();

    // search products
        if (query) {
            results = results.filter(p => p.ProductName.toLowerCase().includes(query));
        }

    // filter by category
        if (currentFilter !== 'all') {
            results = results.filter(p => p.CategoryName === currentFilter);
        }
        
    // sort prices
        if (currentSort === 'low-to-high') results.sort((a, b) => a.Price - b.Price);
        else if (currentSort === 'high-to-low') results.sort((a, b) => b.Price - a.Price);

        renderShop(results);
    }

    // typing in search bar
    searchInput.addEventListener('input', applyFilters);

    // sorting buttons
    sortButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            sortButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSort = btn.getAttribute('data-sort');
            applyFilters();
        });
    });

    // category buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            applyFilters();
        });
    });

    // LOAD PAGE FIRST TIME 
    updateCartUI();
    applyFilters();
});