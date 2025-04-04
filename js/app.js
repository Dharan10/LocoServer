// Main Application JavaScript

// Global Variables
const API_URL = 'https://api.locoserve.com/v1'; // Replace with your actual API URL
let currentUser = null;
let isAuthenticated = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize UI components
    initUI();
    
    // Check authentication status
    checkAuthStatus();
    
    // Initialize mobile menu
    initMobileMenu();
});

// Check if user is authenticated
function checkAuthStatus() {
    const token = localStorage.getItem('authToken');
    
    if (token) {
        // For demo purposes, we'll just set isAuthenticated to true
        // In a real app, you would validate the token with your backend
        isAuthenticated = true;
        
        // Get user data
        getUserData();
    } else {
        isAuthenticated = false;
        updateAuthUI();
    }
}

// Get user data from API
function getUserData() {
    // For demo purposes, we'll use mock data
    // In a real app, you would fetch this from your API
    currentUser = {
        id: '123456',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'customer', // or 'provider'
        avatar: '../assets/images/default-avatar.jpg',
        memberSince: '2023-01-15'
    };
    
    updateAuthUI();
}

// Update UI based on authentication status
function updateAuthUI() {
    const authLinks = document.querySelector('.auth-links');
    
    if (!authLinks) return;
    
    if (isAuthenticated) {
        // User is logged in
        authLinks.innerHTML = `
            <li class="dropdown">
                <a href="#" class="dropdown-toggle">
                    <img src="${currentUser.avatar}" alt="${currentUser.name}" class="user-avatar-small">
                    <span>${currentUser.name}</span>
                </a>
                <ul class="dropdown-menu">
                    <li><a href="pages/dashboard-${currentUser.role}.html">Dashboard</a></li>
                    <li><a href="pages/profile.html">Profile</a></li>
                    <li><a href="#" id="logout-link">Logout</a></li>
                </ul>
            </li>
        `;
        
        // Add event listener to logout link
        document.getElementById('logout-link').addEventListener('click', logout);
    } else {
        // User is not logged in
        authLinks.innerHTML = `
            <li><a href="pages/login.html" class="btn btn-outline">Login</a></li>
            <li><a href="pages/register.html" class="btn btn-primary">Sign Up</a></li>
        `;
    }
}

// Logout function
function logout(e) {
    e.preventDefault();
    
    // Clear authentication data
    localStorage.removeItem('authToken');
    currentUser = null;
    isAuthenticated = false;
    
    // Update UI
    updateAuthUI();
    
    // Redirect to home page
    window.location.href = 'index.html';
}

// Initialize mobile menu
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (!mobileMenuToggle) return;
    
    // Create mobile menu if it doesn't exist
    if (!document.querySelector('.mobile-menu')) {
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        
        // Clone navigation items
        const mainNav = document.querySelector('.main-nav ul').cloneNode(true);
        const authNav = document.querySelector('.auth-links').cloneNode(true);
        
        mobileMenu.appendChild(mainNav);
        mobileMenu.appendChild(authNav);
        
        document.body.appendChild(mobileMenu);
    }
    
    const mobileMenu = document.querySelector('.mobile-menu');
    
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Toggle body scroll
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// Initialize UI components
function initUI() {
    // Initialize dropdowns
    initDropdowns();
    
    // Initialize tabs
    initTabs();
    
    // Initialize modals
    initModals();
}

// Initialize dropdown menus
function initDropdowns() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            const dropdown = this.parentElement;
            dropdown.classList.toggle('active');
            
            // Close other dropdowns
            dropdownToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    otherToggle.parentElement.classList.remove('active');
                }
            });
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdownToggles.forEach(toggle => {
                toggle.parentElement.classList.remove('active');
            });
        }
    });
}

// Initialize tabs
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            const tabContainer = this.closest('.bookings-tabs').nextElementSibling;
            const tabPane = document.getElementById(`${tabId}-tab`);
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            const tabPanes = tabContainer.querySelectorAll('.tab-pane');
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current button and pane
            this.classList.add('active');
            tabPane.classList.add('active');
        });
    });
}

// Initialize modals
function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            
            const modalId = this.dataset.modal;
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

// Helper function to format currency
function formatCurrency(amount) {
    return '$' + parseFloat(amount).toFixed(2);
}

// Helper function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Helper function to format time
function formatTime(timeString) {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', options);
}

// Helper function to create star rating display
function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Add half star if needed
    if (halfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}