/**
 * LocoServe Dashboard JavaScript
 * Handles all dashboard functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard components
    initPageLoader();
    initUserMenu();
    initMobileMenu();
    initBookingActions();
    initProviderActions();
    initScrollToTop();
});

/**
 * Page Loader Animation
 */
function initPageLoader() {
    const loader = document.querySelector('.page-loader');
    const loaderProgressBar = document.querySelector('.progress-bar');
    let width = 0;
    
    // Simulate loading progress
    const interval = setInterval(function() {
        if (width >= 100) {
            clearInterval(interval);
            // Hide loader after progress reaches 100%
            setTimeout(function() {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                document.body.style.overflow = 'visible';
            }, 500);
        } else {
            width += Math.floor(Math.random() * 10) + 1;
            if (width > 100) width = 100;
            loaderProgressBar.style.width = width + '%';
        }
    }, 200);
    
    // Ensure loader is hidden even if something goes wrong
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            document.body.style.overflow = 'visible';
        }, 1000);
    });
}

/**
 * User Menu Toggle
 */
function initUserMenu() {
    const userAvatar = document.querySelector('.user-avatar');
    const userDropdown = document.querySelector('.user-dropdown');
    
    if (userAvatar) {
        userAvatar.addEventListener('click', function() {
            userDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.user-menu')) {
                userDropdown.classList.remove('active');
            }
        });
    }
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    mobileMenuClose.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
}

/**
 * Booking Card Actions
 */
function initBookingActions() {
    // View Details buttons
    const viewDetailsButtons = document.querySelectorAll('.booking-actions .btn-primary, .booking-actions .btn-outline:last-child');
    
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookingId = this.closest('.booking-card').querySelector('.booking-id').textContent.split(': ')[1];
            alert(`Viewing details for booking ${bookingId}`);
            // In a real app, this would navigate to a booking details page
            // window.location.href = `booking-details.html?id=${bookingId}`;
        });
    });
    
    // Reschedule buttons
    const rescheduleButtons = document.querySelectorAll('.booking-actions .btn-outline:first-child');
    
    rescheduleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookingId = this.closest('.booking-card').querySelector('.booking-id').textContent.split(': ')[1];
            alert(`Reschedule booking ${bookingId}`);
            // In a real app, this would open a reschedule modal or navigate to a reschedule page
        });
    });
    
    // Cancel buttons
    const cancelButtons = document.querySelectorAll('.booking-actions .btn-danger');
    
    cancelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookingId = this.closest('.booking-card').querySelector('.booking-id').textContent.split(': ')[1];
            if (confirm(`Are you sure you want to cancel booking ${bookingId}?`)) {
                alert(`Booking ${bookingId} has been cancelled.`);
                // In a real app, this would send a request to the backend to cancel the booking
                this.closest('.booking-card').style.opacity = '0.5';
            }
        });
    });
    
    // Review buttons
    const reviewButtons = document.querySelectorAll('.booking-actions .btn-primary:not(:first-child)');
    
    reviewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookingId = this.closest('.booking-card').querySelector('.booking-id').textContent.split(': ')[1];
            const providerName = this.closest('.booking-card').querySelector('.booking-info-item:first-child span').textContent;
            alert(`Leave a review for ${providerName} (Booking ${bookingId})`);
            // In a real app, this would open a review modal or navigate to a review page
        });
    });
    
    // Book Again buttons
    const bookAgainButtons = document.querySelectorAll('.booking-actions .btn-outline:nth-child(1):not(:last-child)');
    
    bookAgainButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceName = this.closest('.booking-card').querySelector('.booking-service h3').textContent;
            alert(`Booking ${serviceName} again`);
            // In a real app, this would navigate to the booking page with pre-filled service
            // window.location.href = `booking.html?service=${encodeURIComponent(serviceName)}`;
        });
    });
}

/**
 * Provider Card Actions
 */
function initProviderActions() {
    // Book Now buttons
    const bookNowButtons = document.querySelectorAll('.provider-actions .btn-primary');
    
    bookNowButtons.forEach(button => {
        button.addEventListener('click', function() {
            const providerName = this.closest('.provider-card').querySelector('.provider-name').textContent;
            alert(`Booking with ${providerName}`);
            // In a real app, this would navigate to the booking page with pre-selected provider
            // window.location.href = `booking.html?provider=${encodeURIComponent(providerName)}`;
        });
    });
    
    // View Profile buttons
    const viewProfileButtons = document.querySelectorAll('.provider-actions .btn-outline');
    
    viewProfileButtons.forEach(button => {
        button.addEventListener('click', function() {
            const providerName = this.closest('.provider-card').querySelector('.provider-name').textContent;
            alert(`Viewing profile of ${providerName}`);
            // In a real app, this would navigate to the provider profile page
            // window.location.href = `provider-profile.html?name=${encodeURIComponent(providerName)}`;
        });
    });
}

/**
 * Scroll to Top Button
 */
function initScrollToTop() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Dashboard Data Visualization (can be expanded in the future)
 */
function initDashboardCharts() {
    // This function can be used to initialize charts or graphs
    // For example, using Chart.js or other visualization libraries
    console.log('Dashboard charts initialized');
}

/**
 * Notification System (placeholder for future implementation)
 */
function initNotifications() {
    // This function can be used to initialize a notification system
    console.log('Notification system initialized');
}