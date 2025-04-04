/**
 * UI JavaScript
 * Handles common UI functionality across the LocoServe application
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize UI components
    initUI();
});

/**
 * Initialize all UI components
 */
function initUI() {
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize dropdowns
    initDropdowns();
    
    // Initialize modals
    initModals();
    
    // Initialize tooltips
    initTooltips();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize notifications
    initNotifications();
}

/**
 * Initialize mobile navigation
 */
function initMobileNav() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && e.target !== mobileMenuToggle) {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });
    
    // Dashboard sidebar toggle
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const dashboardSidebar = document.querySelector('.dashboard-sidebar');
    
    if (sidebarToggle && dashboardSidebar) {
        sidebarToggle.addEventListener('click', function() {
            dashboardSidebar.classList.toggle('collapsed');
            document.querySelector('.dashboard-main').classList.toggle('expanded');
        });
    }
}

/**
 * Initialize dropdown menus
 */
function initDropdowns() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdown = this.nextElementSibling;
            
            // Close all other dropdowns
            document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
                if (menu !== dropdown) {
                    menu.classList.remove('active');
                }
            });
            
            // Toggle this dropdown
            dropdown.classList.toggle('active');
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
                menu.classList.remove('active');
            });
        }
    });
}

/**
 * Initialize modals
 */
function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                openModal(modal);
            }
        });
    });
    
    // Close modal buttons
    const closeButtons = document.querySelectorAll('.close-modal, .modal-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal.active');
            openModals.forEach(modal => {
                closeModal(modal);
            });
        }
    });
}

/**
 * Open a modal
 */
function openModal(modal) {
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    
    // Focus the first input in the modal
    setTimeout(() => {
        const firstInput = modal.querySelector('input, textarea, select, button:not(.close-modal)');
        if (firstInput) {
            firstInput.focus();
        }
    }, 100);
}

/**
 * Close a modal
 */
function closeModal(modal) {
    modal.classList.remove('active');
    
    // Check if there are other open modals
    const openModals = document.querySelectorAll('.modal.active');
    if (openModals.length === 0) {
        document.body.classList.remove('modal-open');
    }
}

/**
 * Initialize tooltips
 */
function initTooltips() {
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    
    tooltipTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            
            // Create tooltip element
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            
            // Position tooltip
            document.body.appendChild(tooltip);
            
            const triggerRect = this.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            
            const top = triggerRect.top - tooltipRect.height - 10;
            const left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
            
            tooltip.style.top = `${top + window.scrollY}px`;
            tooltip.style.left = `${left}px`;
            
            // Store tooltip reference
            this._tooltip = tooltip;
        });
        
        trigger.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                this._tooltip = null;
            }
        });
    });
}

/**
 * Initialize form validation
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const isValid = validateForm(this);
            
            if (!isValid) {
                e.preventDefault();
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });
        });
    });
}

/**
 * Validate a form
 */
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Validate a single input
 */
function validateInput(input) {
    // Skip inputs that don't need validation
    if (input.type === 'button' || input.type === 'submit' || input.type === 'reset' || input.type === 'hidden') {
        return true;
    }
    
    let isValid = true;
    const errorElement = input.nextElementSibling?.classList.contains('error-message') 
        ? input.nextElementSibling 
        : null;
    
    // Remove existing error
    if (errorElement) {
        errorElement.textContent = '';
    }
    
    // Required validation
    if (input.hasAttribute('required') && input.value.trim() === '') {
        isValid = false;
        showInputError(input, 'This field is required');
    }
    
    // Email validation
    if (input.type === 'email' && input.value.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            isValid = false;
            showInputError(input, 'Please enter a valid email address');
        }
    }
    
    // Password validation
    if (input.type === 'password' && input.hasAttribute('data-min-length') && input.value !== '') {
        const minLength = parseInt(input.getAttribute('data-min-length'));
        if (input.value.length < minLength) {
            isValid = false;
            showInputError(input, `Password must be at least ${minLength} characters`);
        }
    }
    
    // Password confirmation
    if (input.hasAttribute('data-confirm-password')) {
        const passwordInput = document.getElementById(input.getAttribute('data-confirm-password'));
        if (passwordInput && input.value !== passwordInput.value) {
            isValid = false;
            showInputError(input, 'Passwords do not match');
        }
    }
    
    // Number validation
    if (input.type === 'number') {
        if (input.hasAttribute('min') && input.value !== '') {
            const min = parseFloat(input.getAttribute('min'));
            if (parseFloat(input.value) < min) {
                isValid = false;
                showInputError(input, `Value must be at least ${min}`);
            }
        }
        
        if (input.hasAttribute('max') && input.value !== '') {
            const max = parseFloat(input.getAttribute('max'));
            if (parseFloat(input.value) > max) {
                isValid = false;
                showInputError(input, `Value must be at most ${max}`);
            }
        }
    }
    
    // Custom pattern validation
    if (input.hasAttribute('pattern') && input.value !== '') {
        const pattern = new RegExp(input.getAttribute('pattern'));
        if (!pattern.test(input.value)) {
            isValid = false;
            const errorMessage = input.getAttribute('data-pattern-error') || 'Please enter a valid value';
            showInputError(input, errorMessage);
        }
    }
    
    // Toggle valid/invalid classes
    if (isValid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
    }
    
    return isValid;
}

/**
 * Show an error message for an input
 */
function showInputError(input, message) {
    let errorElement = input.nextElementSibling;
    
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    
    errorElement.textContent = message;
}

/**
 * Initialize scroll effects
 */
function initScrollEffects() {
    // Sticky header
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }
    
    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Initialize notifications system
 */
function initNotifications() {
    // Create notifications container if it doesn't exist
    let notificationsContainer = document.querySelector('.notifications-container');
    
    if (!notificationsContainer) {
        notificationsContainer = document.createElement('div');
        notificationsContainer.className = 'notifications-container';
        document.body.appendChild(notificationsContainer);
    }
}

/**
 * Show a notification
 */
function showNotification(message, type = 'info', duration = 5000) {
    // Create notifications container if it doesn't exist
    let notificationsContainer = document.querySelector('.notifications-container');
    
    if (!notificationsContainer) {
        notificationsContainer = document.createElement('div');
        notificationsContainer.className = 'notifications-container';
        document.body.appendChild(notificationsContainer);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Set icon based on type
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        </div>
        <button class="close-notification">&times;</button>
    `;
    
    // Add to container
    notificationsContainer.appendChild(notification);
    
    // Add event listener to close button
    notification.querySelector('.close-notification').addEventListener('click', function() {
        closeNotification(notification);
    });
    
    // Auto-close after duration
    if (duration > 0) {
        setTimeout(() => {
            closeNotification(notification);
        }, duration);
    }
    
    return notification;
}

/**
 * Close a notification
 */
function closeNotification(notification) {
    notification.classList.add('fade-out');
    
    setTimeout(() => {
        notification.remove();
    }, 300);
}

/**
 * Show a confirmation dialog
 */
function showConfirmDialog(message, confirmCallback, cancelCallback) {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'modal confirm-dialog';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Confirmation</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <p>${message}</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary cancel-btn">Cancel</button>
                <button class="btn btn-primary confirm-btn">Confirm</button>
            </div>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Add event listeners
    modal.querySelector('.close-modal').addEventListener('click', function() {
        closeConfirmDialog(modal, false);
    });
    
    modal.querySelector('.cancel-btn').addEventListener('click', function() {
        closeConfirmDialog(modal, false);
    });
    
    modal.querySelector('.confirm-btn').addEventListener('click', function() {
        closeConfirmDialog(modal, true);
    });
    
    // Close dialog function
    function closeConfirmDialog(modal, confirmed) {
        modal.classList.remove('active');
        
        setTimeout(() => {
            modal.remove();
            
            if (confirmed && typeof confirmCallback === 'function') {
                confirmCallback();
            } else if (!confirmed && typeof cancelCallback === 'function') {
                cancelCallback();
            }
        }, 300);
    }
}

/**
 * Toggle password visibility
 */
function togglePasswordVisibility(inputId, toggleBtnId) {
    const passwordInput = document.getElementById(inputId);
    const toggleBtn = document.getElementById(toggleBtnId);
    
    if (passwordInput && toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle icon
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }
}

/**
 * Format currency
 */
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

/**
 * Format date
 */
function formatDate(date, format = 'long') {
    const dateObj = new Date(date);
    
    if (format === 'long') {
        return dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } else if (format === 'short') {
        return dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } else if (format === 'relative') {
        const now = new Date();
        const diffTime = Math.abs(now - dateObj);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
            return 'Today';
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else if (diffDays < 30) {
            const diffWeeks = Math.floor(diffDays / 7);
            return `${diffWeeks} ${diffWeeks === 1 ? 'week' : 'weeks'} ago`;
        } else if (diffDays < 365) {
            const diffMonths = Math.floor(diffDays / 30);
            return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
        } else {
            const diffYears = Math.floor(diffDays / 365);
            return `${diffYears} ${diffYears === 1 ? 'year' : 'years'} ago`;
        }
    }
    
    return dateObj.toLocaleDateString();
}

/**
 * Truncate text
 */
function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    
    return text.substring(0, maxLength) + '...';
}

/**
 * Debounce function
 */
function debounce(func, delay) {
    let timeout;
    
    return function() {
        const context = this;
        const args = arguments;
        
        clearTimeout(timeout);
        
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, delay);
    };
}

/**
 * Export public functions
 */
window.UI = {
    showNotification,
    closeNotification,
    showConfirmDialog,
    openModal,
    closeModal,
    formatCurrency,
    formatDate,
    truncateText,
    debounce,
    togglePasswordVisibility
};