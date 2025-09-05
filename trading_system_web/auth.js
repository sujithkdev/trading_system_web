// Simple user database simulation
let users = JSON.parse(localStorage.getItem('users')) || [];

// Signup functionality
document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('newUsername').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    if (users.some(user => user.username === username)) {
        alert('Username already exists!');
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', username);
    
    alert('Account created successfully!');
    window.location.href = 'home.html';
});

// Login functionality
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', username);
        window.location.href = 'home.html';
    } else {
        alert('Invalid username or password!');
    }
});

// Check if user is logged in
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser && !window.location.pathname.includes('login.html') && 
        !window.location.pathname.includes('signup.html')) {
        window.location.href = 'login.html';
    }
    return currentUser;
}

// Logout functionality
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Initialize auth check on page load
window.onload = function() {
    const user = checkAuth();
    if (user) {
        const loginLinks = document.querySelectorAll('.login-link');
        const signupLinks = document.querySelectorAll('.signup-link');
        const logoutLinks = document.querySelectorAll('.logout-link');
        const userDisplay = document.querySelectorAll('.user-display');

        loginLinks.forEach(link => link.style.display = 'none');
        signupLinks.forEach(link => link.style.display = 'none');
        logoutLinks.forEach(link => link.style.display = 'block');
        userDisplay.forEach(el => {
            el.style.display = 'block';
            el.textContent = user;
        });
    }
};
