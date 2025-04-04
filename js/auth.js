// Authentication JavaScript

// DOM Elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const forgotPasswordForm = document.getElementById('forgot-password-form');
const resetPasswordForm = document.getElementById('reset-password-form');

// Event Listeners
if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
}

if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
}

if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', handleForgotPassword);
}

if (resetPasswordForm) {
    resetPasswordForm.addEventListener('submit', handleResetPassword);
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Validate form
    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }
    
    // For demo purposes, we'll just set a token in localStorage
    // In a real app, you would send a request to your API
    localStorage.setItem('authToken', 'demo-token');
    
    // Redirect based on user role
    // For demo, we'll check the email to determine the role
    if (email.includes('provider')) {
        window.location.href = 'dashboard-provider.html';
    } else {
        window.location.href = 'dashboard-customer.html';
    }
}

// Handle register form submission
function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const role = document.querySelector('input[name="user-role"]:checked').value;
    
    // Validate form
    if (!name || !email || !password || !confirmPassword) {
        showError('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    
    // For demo purposes, we'll just set a token in localStorage
    // In a real app, you would send a request to your API
    localStorage.setItem('authToken', 'demo-token');
    
    // Redirect based on user role
    if (role === 'provider') {
        window.location.href = 'dashboard-provider.html';
    } else {
        window.location.href = 'dashboard-customer.html';
    }
}

// Handle forgot password form submission
function handleForgotPassword(e) {
    e.preventDefault();
    
    const email = document.getElementById('forgot-email').value;
    
    // Validate form
    if (!email) {
        showError('Please enter your email address');
        return;
    }
    
    // Show success message
    showSuccess('Password reset instructions have been sent to your email');
    
    // Clear form
    forgotPasswordForm.reset();
}

// Handle reset password form submission
function handleResetPassword(e) {
    e.preventDefault();
    
    const password = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-new-password').value;
    
    // Validate form
    if (!password || !confirmPassword) {
        showError('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    
    // Show success message
    showSuccess('Your password has been reset successfully');
    
    // Redirect to login page after a delay
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

// Show error message
function showError(message) {
    const errorElement = document.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // Hide error after 3 seconds
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 3000);
    } else {
        alert(message);
    }
}

// Show success message
function showSuccess(message) {
    const successElement = document.querySelector('.success-message');
    
    if (successElement) {
        successElement.textContent = message;
        successElement.style.display = 'block';
        
        // Hide success after 3 seconds
        setTimeout(() => {
            successElement.style.display = 'none';
        }, 3000);
    } else {
        alert(message);
    }
}