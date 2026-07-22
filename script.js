// ===== PRODUCT DATA WITH IMAGES =====
// ===== DARK MODE FUNCTIONALITY =====
(function initDarkMode() {
    // Check saved preference
    const darkMode = localStorage.getItem('darkMode') === 'true';
    
    // Apply dark mode if saved
    if (darkMode) {
        document.body.classList.add('dark-mode');
        // Update toggle button icon if it exists
        const toggle = document.getElementById('darkModeToggle');
        if (toggle) toggle.textContent = '☀️';
    }
    
    // Add toggle functionality
    document.addEventListener('DOMContentLoaded', function() {
        const toggle = document.getElementById('darkModeToggle');
        if (toggle) {
            toggle.addEventListener('click', function() {
                const isDark = document.body.classList.toggle('dark-mode');
                localStorage.setItem('darkMode', isDark);
                this.textContent = isDark ? '☀️' : '🌙';
            });
        }
    });
})();

// ===== REST OF YOUR EXISTING CODE GOES BELOW =====
// ... (all your existing product data, login, search, etc.)
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

// ===== USER MANAGEMENT =====
function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function findUser(email) {
    const users = getUsers();
    return users.find(u => u.email === email);
}

function createUser(name, email, password) {
    const users = getUsers();
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        created: new Date().toISOString()
    };
    users.push(newUser);
    saveUsers(users);
    return newUser;
}

function validateUser(email, password) {
    const user = findUser(email);
    if (user && user.password === password) {
        return user;
    }
    return null;
}

// ===== DISPLAY PRODUCTS FUNCTION =====
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

// ========================================
// ===== LOGIN PAGE LOGIC =====
// ========================================
if (document.getElementById('loginForm')) {
    
    // ===== TAB SWITCHING =====
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const loginContainer = document.getElementById('loginFormContainer');
    const signupContainer = document.getElementById('signupFormContainer');
    
    loginTab.addEventListener('click', function() {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginContainer.style.display = 'block';
        signupContainer.style.display = 'none';
        // Clear errors
        document.getElementById('loginError').textContent = '';
        document.getElementById('signupError').textContent = '';
        document.getElementById('signupSuccess').textContent = '';
    });
    
    signupTab.addEventListener('click', function() {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        loginContainer.style.display = 'none';
        signupContainer.style.display = 'block';
        // Clear errors
        document.getElementById('loginError').textContent = '';
        document.getElementById('signupError').textContent = '';
        document.getElementById('signupSuccess').textContent = '';
    });
    
    // ===== LOGIN FORM =====
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const errorEl = document.getElementById('loginError');
        
        // Clear previous error
        errorEl.textContent = '';
        
        // Validate
        if (!email || !password) {
            errorEl.textContent = '⚠️ Please fill in all fields';
            return;
        }
        
        // Check user
        const user = validateUser(email, password);
        
        if (user) {
            // Login successful
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userName', user.name);
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'index.html';
        } else {
            errorEl.textContent = '❌ Invalid email or password';
            document.getElementById('loginPassword').value = '';
            document.getElementById('loginPassword').focus();
        }
    });
    
    // ===== SIGNUP FORM =====
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        const errorEl = document.getElementById('signupError');
        const successEl = document.getElementById('signupSuccess');
        
        // Clear previous messages
        errorEl.textContent = '';
        successEl.textContent = '';
        
        // ===== VALIDATION =====
        
        // 1. Check all fields filled
        if (!name || !email || !password || !confirmPassword) {
            errorEl.textContent = '⚠️ Please fill in all fields';
            return;
        }
        
        // 2. Check name length
        if (name.length < 2) {
            errorEl.textContent = '⚠️ Name must be at least 2 characters';
            return;
        }
        
        // 3. Check email format
        if (!email.includes('@') || !email.includes('.')) {
            errorEl.textContent = '⚠️ Please enter a valid email address';
            return;
        }
        
        // 4. Check password length
        if (password.length < 6) {
            errorEl.textContent = '⚠️ Password must be at least 6 characters';
            return;
        }
        
        // 5. Check password match
        if (password !== confirmPassword) {
            errorEl.textContent = '⚠️ Passwords do not match';
            document.getElementById('signupConfirmPassword').value = '';
            document.getElementById('signupConfirmPassword').focus();
            return;
        }
        
        // 6. Check if user already exists
        if (findUser(email)) {
            errorEl.textContent = '⚠️ Email already registered. Please sign in.';
            return;
        }
        
        // ===== CREATE ACCOUNT =====
        try {
            const newUser = createUser(name, email, password);
            
            // Success message
            successEl.textContent = '✅ Account created successfully! Please sign in.';
            
            // Clear form
            document.getElementById('signupName').value = '';
            document.getElementById('signupEmail').value = '';
            document.getElementById('signupPassword').value = '';
            document.getElementById('signupConfirmPassword').value = '';
            
            // Switch to login tab after 2 seconds
            setTimeout(() => {
                loginTab.click();
                document.getElementById('loginEmail').value = email;
                successEl.textContent = '';
            }, 2000);
            
        } catch (error) {
            errorEl.textContent = '❌ Error creating account. Please try again.';
            console.error('Signup error:', error);
        }
    });
}

// ========================================
// ===== MAIN PAGE LOGIC =====
// ========================================
if (document.getElementById('searchBtn')) {
    // ===== CHECK LOGIN =====
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
    }
    
    // ===== SHOW USER NAME =====
    const userName = localStorage.getItem('userName') || 'User';
    document.getElementById('userDisplay').textContent = '👤 ' + userName;
    
    // ===== SEARCH FUNCTIONALITY =====
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    // Display all products on page load
    displayProducts(products);
    
    function searchProducts(query) {
        if (!query || query.trim() === '') {
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
    
    // ===== LOGOUT =====
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