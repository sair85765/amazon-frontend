// ===== PRODUCT DATA WITH IMAGES =====
const products = [
    { 
        name: "iPhone 15 Pro", 
        category: "Electronics", 
        price: "$999", 
        rating: "⭐⭐⭐⭐⭐",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=300&fit=crop"
    },
    { 
        name: "Samsung Galaxy S24", 
        category: "Electronics", 
        price: "$899", 
        rating: "⭐⭐⭐⭐",
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=300&fit=crop"
    },
    { 
        name: "MacBook Air M3", 
        category: "Computers", 
        price: "$1,099", 
        rating: "⭐⭐⭐⭐⭐",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop"
    },
    { 
        name: "Dell XPS 13", 
        category: "Computers", 
        price: "$999", 
        rating: "⭐⭐⭐⭐",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&h=300&fit=crop"
    },
    { 
        name: "Sony WH-1000XM5", 
        category: "Audio", 
        price: "$399", 
        rating: "⭐⭐⭐⭐⭐",
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&h=300&fit=crop"
    },
    { 
        name: "Apple AirPods Pro 2", 
        category: "Audio", 
        price: "$249", 
        rating: "⭐⭐⭐⭐",
        image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=300&h=300&fit=crop"
    },
    { 
        name: "The Lean Startup", 
        category: "Books", 
        price: "$24.99", 
        rating: "⭐⭐⭐⭐",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop"
    },
    { 
        name: "Atomic Habits", 
        category: "Books", 
        price: "$16.99", 
        rating: "⭐⭐⭐⭐⭐",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop"
    },
    { 
        name: "Nike Air Max", 
        category: "Clothing", 
        price: "$120", 
        rating: "⭐⭐⭐⭐",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop"
    },
    { 
        name: "Levi's Jeans", 
        category: "Clothing", 
        price: "$69.99", 
        rating: "⭐⭐⭐",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=300&fit=crop"
    },
    { 
        name: "PlayStation 5", 
        category: "Gaming", 
        price: "$499", 
        rating: "⭐⭐⭐⭐⭐",
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&h=300&fit=crop"
    },
    { 
        name: "Xbox Series X", 
        category: "Gaming", 
        price: "$499", 
        rating: "⭐⭐⭐⭐",
        image: "https://images.unsplash.com/photo-1621259182978-fbf93132d3d4?w=300&h=300&fit=crop"
    }
];

// ===== FUNCTION TO DISPLAY PRODUCTS =====
function displayProducts(productList) {
    const resultsDiv = document.getElementById('results');
    
    if (!resultsDiv) return;
    
    if (productList.length === 0) {
        resultsDiv.innerHTML = `
            <div class="no-results">
                <h3>😕 No products found</h3>
                <p>Try a different search term</p>
            </div>
        `;
        return;
    }
    
    let html = `<div class="product-grid">`;
    productList.forEach(p => {
        html += `
            <div class="product-card">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
                <h3>${p.name}</h3>
                <div class="price">${p.price}</div>
                <div class="rating">${p.rating}</div>
                <div class="category">${p.category}</div>
            </div>
        `;
    });
    html += `</div>`;
    resultsDiv.innerHTML = html;
}

// ===== LOGIN =====
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (email && password) {
            localStorage.setItem('userEmail', email);
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'index.html';
        } else {
            alert('Please fill in all fields');
        }
    });
}

// ===== MAIN PAGE =====
if (document.getElementById('searchBtn')) {
    // Check login
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
    }
    
    // Show user
    document.getElementById('userDisplay').textContent = '👤 ' + localStorage.getItem('userEmail');
    
    // Search
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    // ===== DISPLAY ALL PRODUCTS ON PAGE LOAD =====
    displayProducts(products);
    
    function searchProducts(query) {
        if (!query || query.trim() === '') {
            // Show all products if search is empty
            displayProducts(products);
            return;
        }
        
        const term = query.toLowerCase().trim();
        const results = products.filter(p => 
            p.name.toLowerCase().includes(term) || 
            p.category.toLowerCase().includes(term)
        );
        
        displayProducts(results);
    }
    
    // Event listeners
    searchBtn.addEventListener('click', () => searchProducts(searchInput.value));
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchProducts(searchInput.value);
    });
    
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.clear();
        window.location.href = 'login.html';
    });
}

// ===== AUTO-REDIRECT =====
if (window.location.pathname.includes('login.html')) {
    if (localStorage.getItem('isLoggedIn')) {
        window.location.href = 'index.html';
    }
}