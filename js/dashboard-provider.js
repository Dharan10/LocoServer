/**
 * Provider Dashboard JavaScript
 * Handles all functionality specific to the provider dashboard
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the dashboard
    initDashboard();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial data
    loadDashboardData();
});

/**
 * Initialize the dashboard components
 */
function initDashboard() {
    // Initialize charts if they exist
    initCharts();
    
    // Initialize tabs
    initTabs();
    
    // Initialize modals
    initModals();
}

/**
 * Set up all event listeners for the dashboard
 */
function setupEventListeners() {
    // Navigation event listeners
    setupNavigation();
    
    // Form submission listeners
    setupForms();
    
    // Button click listeners
    setupButtonListeners();
}

/**
 * Set up navigation between dashboard sections
 */
function setupNavigation() {
    const navLinks = document.querySelectorAll('.dashboard-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section
            const targetSection = this.getAttribute('data-section');
            
            // Hide all sections
            document.querySelectorAll('.dashboard-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show the target section
            document.getElementById(targetSection).classList.add('active');
            
            // Update active nav link
            navLinks.forEach(navLink => {
                navLink.parentElement.classList.remove('active');
            });
            this.parentElement.classList.add('active');
            
            // Update URL hash
            window.location.hash = targetSection;
        });
    });
    
    // Check for hash in URL on page load
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const targetLink = document.querySelector(`.dashboard-nav a[data-section="${hash}"]`);
        
        if (targetLink) {
            targetLink.click();
        }
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            document.querySelector('.dashboard-sidebar').classList.toggle('active');
        });
    }
}

/**
 * Set up form submission handlers
 */
function setupForms() {
    // Profile form
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProfileData();
        });
    }
    
    // Password form
    const passwordForm = document.getElementById('password-form');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updatePassword();
        });
    }
    
    // Notification form
    const notificationForm = document.getElementById('notification-form');
    if (notificationForm) {
        notificationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveNotificationPreferences();
        });
    }
    
    // Availability form
    const availabilityForm = document.getElementById('availability-form');
    if (availabilityForm) {
        availabilityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveAvailabilitySettings();
        });
    }
    
    // Service form
    const serviceForm = document.getElementById('service-form');
    if (serviceForm) {
        serviceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveServiceData();
        });
    }
    
    // Qualification form
    const qualificationForm = document.getElementById('qualification-form');
    if (qualificationForm) {
        qualificationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveQualificationData();
        });
    }
    
    // Message form
    const messageForm = document.getElementById('message-form');
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            sendMessage();
        });
    }
}

/**
 * Set up button click listeners
 */
function setupButtonListeners() {
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Call logout function from auth.js
            if (typeof logout === 'function') {
                logout();
            }
        });
    }
    
    // Add service button
    const addServiceBtn = document.getElementById('add-service-btn');
    if (addServiceBtn) {
        addServiceBtn.addEventListener('click', function() {
            openServiceModal();
        });
    }
    
    // Add qualification button
    const addQualificationBtn = document.getElementById('add-qualification-btn');
    if (addQualificationBtn) {
        addQualificationBtn.addEventListener('click', function() {
            openQualificationModal();
        });
    }
    
    // Delete account button
    const deleteAccountBtn = document.getElementById('delete-account-btn');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function() {
            confirmDeleteAccount();
        });
    }
    
    // Change avatar button
    const changeAvatarBtn = document.getElementById('change-avatar-btn');
    if (changeAvatarBtn) {
        changeAvatarBtn.addEventListener('click', function() {
            document.getElementById('avatar-upload').click();
        });
    }
    
    // Close modal buttons
    const closeModalBtns = document.querySelectorAll('.close-modal');
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            closeAllModals();
        });
    });
    
    // Tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // Chart filter buttons
    const chartFilters = document.querySelectorAll('.chart-filter');
    chartFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const period = this.getAttribute('data-period');
            updateEarningsChart(period);
            
            // Update active state
            chartFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

/**
 * Initialize chart.js charts
 */
function initCharts() {
    // Overview earnings chart
    const earningsChartCanvas = document.getElementById('earnings-chart-canvas');
    if (earningsChartCanvas) {
        const ctx = earningsChartCanvas.getContext('2d');
        
        // Sample data - would be replaced with real data
        const earningsData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Earnings',
                data: [1200, 1900, 1500, 2500, 2100, 3000],
                backgroundColor: 'rgba(74, 108, 247, 0.2)',
                borderColor: 'rgba(74, 108, 247, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        };
        
        const earningsChart = new Chart(ctx, {
            type: 'line',
            data: earningsData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return `$${context.raw}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Detailed earnings chart
    const detailedEarningsChart = document.getElementById('detailed-earnings-chart');
    if (detailedEarningsChart) {
        const ctx = detailedEarningsChart.getContext('2d');
        
        // Sample data - would be replaced with real data
        const detailedData = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Earnings',
                data: [150, 220, 180, 200, 250, 300, 100],
                backgroundColor: 'rgba(74, 108, 247, 0.2)',
                borderColor: 'rgba(74, 108, 247, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        };
        
        const earningsDetailChart = new Chart(ctx, {
            type: 'bar',
            data: detailedData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return `$${context.raw}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value;
                            }
                        }
                    }
                }
            }
        });
        
        // Store chart reference for updates
        window.earningsDetailChart = earningsDetailChart;
    }
}

/**
 * Initialize tab functionality
 */
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    if (tabBtns.length > 0) {
        // Set first tab as active by default
        switchTab(tabBtns[0].getAttribute('data-tab'));
    }
}

/**
 * Switch between tabs
 */
function switchTab(tabId) {
    // Hide all tab panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    // Show the selected tab pane
    const targetPane = document.getElementById(`${tabId}-tab`);
    if (targetPane) {
        targetPane.classList.add('active');
    }
    
    // Update active tab button
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelector(`.tab-btn[data-tab="${tabId}"]`).classList.add('active');
}

/**
 * Initialize modal functionality
 */
function initModals() {
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                closeAllModals();
            }
        });
    });
}

/**
 * Open service modal for adding/editing
 */
function openServiceModal(serviceId = null) {
    const modal = document.getElementById('service-modal');
    const modalTitle = document.getElementById('service-modal-title');
    const form = document.getElementById('service-form');
    
    // Reset form
    form.reset();
    
    if (serviceId) {
        // Edit existing service
        modalTitle.textContent = 'Edit Service';
        document.getElementById('service-id').value = serviceId;
        
        // Load service data (mock data for now)
        // In a real app, you would fetch this from your backend
        const mockService = {
            title: 'Plumbing Service',
            category: 'plumbing',
            description: 'Professional plumbing services for residential and commercial properties.',
            price: 75,
            priceType: 'hourly',
            location: 'New York City'
        };
        
        // Populate form
        document.getElementById('service-title').value = mockService.title;
        document.getElementById('service-category').value = mockService.category;
        document.getElementById('service-description').value = mockService.description;
        document.getElementById('service-price').value = mockService.price;
        document.getElementById('service-price-type').value = mockService.priceType;
        document.getElementById('service-location').value = mockService.location;
    } else {
        // Add new service
        modalTitle.textContent = 'Add New Service';
        document.getElementById('service-id').value = '';
    }
    
    // Show modal
    modal.style.display = 'block';
}

/**
 * Open qualification modal for adding/editing
 */
function openQualificationModal(qualificationId = null) {
    const modal = document.getElementById('qualification-modal');
    const form = document.getElementById('qualification-form');
    
    // Reset form
    form.reset();
    
    if (qualificationId) {
        // Edit existing qualification
        document.getElementById('qualification-id').value = qualificationId;
        
        // Load qualification data (mock data for now)
        // In a real app, you would fetch this from your backend
        const mockQualification = {
            title: 'Master Plumber License',
            issuer: 'State Board of Plumbing Examiners',
            date: '2020-05-15',
            expiry: '2025-05-15',
            description: 'Licensed master plumber certification'
        };
        
        // Populate form
        document.getElementById('qualification-title').value = mockQualification.title;
        document.getElementById('qualification-issuer').value = mockQualification.issuer;
        document.getElementById('qualification-date').value = mockQualification.date;
        document.getElementById('qualification-expiry').value = mockQualification.expiry;
        document.getElementById('qualification-description').value = mockQualification.description;
    } else {
        // Add new qualification
        document.getElementById('qualification-id').value = '';
    }
    
    // Show modal
    modal.style.display = 'block';
}

/**
 * Close all modals
 */
function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

/**
 * Load dashboard data
 */
function loadDashboardData() {
    // Load user data
    loadUserData();
    
    // Load stats
    loadDashboardStats();
    
    // Load recent activity
    loadRecentActivity();
    
    // Load upcoming bookings
    loadUpcomingBookings();
    
    // Load services
    loadServices();
    
    // Load bookings
    loadBookings();
    
    // Load earnings data
    loadEarningsData();
    
    // Load reviews
    loadReviews();
    
    // Load conversations
    loadConversations();
    
    // Load profile data
    loadProfileData();
}

/**
 * Load user data
 */
function loadUserData() {
    // Mock user data - would be fetched from backend in a real app
    const userData = {
        name: 'John Smith',
        email: 'john.smith@example.com',
        avatar: '../assets/images/default-avatar.jpg',
        memberSince: 'January 2022'
    };
    
    // Update UI with user data
    document.getElementById('user-name').textContent = userData.name;
    document.getElementById('user-email').textContent = userData.email;
    
    const avatarElements = document.querySelectorAll('#user-avatar, #profile-avatar');
    avatarElements.forEach(el => {
        el.src = userData.avatar;
    });
    
    // Update profile section
    document.getElementById('profile-name').textContent = userData.name;
    document.getElementById('profile-email').textContent = userData.email;
    document.getElementById('profile-member-since').textContent = `Member since: ${userData.memberSince}`;
}

/**
 * Load dashboard stats
 */
function loadDashboardStats() {
    // Mock stats data - would be fetched from backend in a real app
    const stats = {
        activeBookings: 5,
        completedBookings: 42,
        totalEarnings: 3750,
        averageRating: 4.8
    };
    
    // Update UI with stats
    document.getElementById('active-bookings-count').textContent = stats.activeBookings;
    document.getElementById('completed-bookings-count').textContent = stats.completedBookings;
    document.getElementById('total-earnings').textContent = `$${stats.totalEarnings}`;
    document.getElementById('average-rating').textContent = stats.averageRating.toFixed(1);
    
    // Update earnings section
    document.getElementById('total-earnings-amount').textContent = `$${stats.totalEarnings.toFixed(2)}`;
    document.getElementById('month-earnings').textContent = '$1,250.00';
    document.getElementById('pending-payments').textContent = '$350.00';
    document.getElementById('available-withdrawal').textContent = '$900.00';
}

/**
 * Load recent activity
 */
function loadRecentActivity() {
    const activityList = document.getElementById('recent-activity-list');
    
    // Mock activity data - would be fetched from backend in a real app
    const activities = [
        { type: 'booking', title: 'New booking request', description: 'Plumbing service requested by Sarah Johnson', time: '2 hours ago' },
        { type: 'review', title: 'New review received', description: '5-star review from Michael Brown', time: '1 day ago' },
        { type: 'payment', title: 'Payment received', description: '$120 payment for electrical repair service', time: '2 days ago' },
        { type: 'booking', title: 'Booking completed', description: 'Carpentry job for David Wilson marked as completed', time: '3 days ago' }
    ];
    
    // Clear loading spinner
    activityList.innerHTML = '';
    
    // Add activities to the list
    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        
        let iconClass = 'fa-calendar-check';
        if (activity.type === 'review') iconClass = 'fa-star';
        if (activity.type === 'payment') iconClass = 'fa-dollar-sign';
        
        activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="fas ${iconClass}"></i>
            </div>
            <div class="activity-info">
                <h4>${activity.title}</h4>
                <p>${activity.description}</p>
            </div>
            <div class="activity-time">${activity.time}</div>
        `;
        
        activityList.appendChild(activityItem);
    });
}

/**
 * Load upcoming bookings
 */
function loadUpcomingBookings() {
    const bookingsList = document.getElementById('upcoming-bookings-list');
    
    // Mock bookings data - would be fetched from backend in a real app
    const bookings = [
        { id: 1, service: 'Plumbing Repair', client: 'Sarah Johnson', date: 'Tomorrow, 10:00 AM', status: 'confirmed' },
        { id: 2, service: 'Electrical Wiring', client: 'Robert Davis', date: 'May 15, 2:30 PM', status: 'confirmed' },
        { id: 3, service: 'Kitchen Renovation', client: 'Emily Wilson', date: 'May 18, 9:00 AM', status: 'pending' }
    ];
    
    // Clear loading spinner
    bookingsList.innerHTML = '';
    
    // Add bookings to the list
    bookings.forEach(booking => {
        const bookingItem = document.createElement('div');
        bookingItem.className = 'booking-item';
        
        let statusClass = 'badge-primary';
        if (booking.status === 'confirmed') statusClass = 'badge-success';
        if (booking.status === 'pending') statusClass = 'badge-warning';
        
        bookingItem.innerHTML = `
            <div class="booking-icon">
                <i class="fas fa-calendar-alt"></i>
            </div>
            <div class="booking-info">
                <h4>${booking.service}</h4>
                <p>Client: ${booking.client}</p>
                <p>${booking.date}</p>
            </div>
            <div class="booking-status">
                <span class="badge ${statusClass}">${booking.status}</span>
            </div>
        `;
        
        bookingsList.appendChild(bookingItem);
    });
}

/**
 * Load services
 */
function loadServices() {
    const servicesList = document.getElementById('provider-services-list');
    if (!servicesList) return;
    
    // Mock services data - would be fetched from backend in a real app
    const services = [
        { id: 1, title: 'Plumbing Services', category: 'plumbing', price: 75, priceType: 'hourly', bookings: 12, rating: 4.8 },
        { id: 2, title: 'Electrical Repairs', category: 'electrical', price: 85, priceType: 'hourly', bookings: 8, rating: 4.7 },
        { id: 3, title: 'Kitchen Renovation', category: 'carpentry', price: 2500, priceType: 'fixed', bookings: 3, rating: 5.0 }
    ];
    
    // Clear loading spinner
    servicesList.innerHTML = '';
    
    // Create service cards
    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        
        let priceDisplay = `$${service.price}`;
        if (service.priceType === 'hourly') priceDisplay += '/hr';
        if (service.priceType === 'starting') priceDisplay = `From ${priceDisplay}`;
        
        serviceCard.innerHTML = `
            <div class="service-card-header">
                <img src="../assets/images/services/${service.category}.jpg" alt="${service.title}" onerror="this.src='../assets/images/service-placeholder.jpg'">
                <div class="service-card-price">${priceDisplay}</div>
            </div>
            <div class="service-card-body">
                <h3>${service.title}</h3>
                <p>Category: ${service.category.charAt(0).toUpperCase() + service.category.slice(1)}</p>
                <p>Bookings: ${service.bookings}</p>
            </div>
            <div class="service-card-footer">
                <div class="service-card-rating">
                    <i class="fas fa-star"></i>
                    <span>${service.rating.toFixed(1)} (${service.bookings} reviews)</span>
                </div>
                <div class="service-card-actions">
                    <button class="btn btn-sm btn-outline-primary edit-service-btn" data-id="${service.id}">Edit</button>
                </div>
            </div>
        `;
        
        servicesList.appendChild(serviceCard);
    });
    
    // Add event listeners to edit buttons
    const editButtons = document.querySelectorAll('.edit-service-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-id');
            openServiceModal(serviceId);
        });
    });
}

/**
 * Load bookings for different tabs
 */
function loadBookings() {
    // Mock bookings data - would be fetched from backend in a real app
    const bookings = {
        new: [
            { id: 101, service: 'Plumbing Repair', client: 'Sarah Johnson', date: 'Requested for May 14, 10:00 AM', price: '$75' }
        ],
        upcoming: [
            { id: 102, service: 'Electrical Wiring', client: 'Robert Davis', date: 'May 15, 2:30 PM', price: '$150' },
            { id: 103, service: 'Kitchen Renovation', client: 'Emily Wilson', date: 'May 18, 9:00 AM', price: '$2,500' }
        ],
        ongoing: [
            { id: 104, service: 'Bathroom Remodel', client: 'James Thompson', date: 'Started May 1', price: '$1,800' }
        ],
        completed: [
            { id: 105, service: 'Plumbing Repair', client: 'Michael Brown', date: 'April 28, 2023', price: '$95' },
            { id: 106, service: 'Electrical Repair', client: 'Jennifer Lee', date: 'April 15, 2023', price: '$120' },
            { id: 107, service: 'Furniture Assembly', client: 'David Wilson', date: 'April 10, 2023', price: '$200' }
        ],
        cancelled: [
            { id: 108, service: 'Window Repair', client: 'Lisa Anderson', date: 'Cancelled on April 5, 2023', price: '$150' }
        ]
    };
    
    // Load bookings for each tab
    Object.keys(bookings).forEach(status => {
        const bookingsList = document.getElementById(`${status}-booking-requests`) || document.getElementById(`${status}-bookings`);
        if (!bookingsList) return;
        
        // Clear loading spinner
        bookingsList.innerHTML = '';
        
        if (bookings[status].length === 0) {
            bookingsList.innerHTML = `<div class="empty-state">No ${status} bookings found.</div>`;
            return;
        }
        
        // Add bookings to the list
        bookings[status].forEach(booking => {
            const bookingItem = document.createElement('div');
            bookingItem.className = 'booking-item';
            
            let actionButtons = '';
            
            if (status === 'new') {
                actionButtons = `
                    <button class="btn btn-sm btn-success accept-booking-btn" data-id="${booking.id}">Accept</button>
                    <button class="btn btn-sm btn-danger decline-booking-btn" data-id="${booking.id}">Decline</button>
                `;
            } else if (status === 'upcoming') {
                actionButtons = `
                    <button class="btn btn-sm btn-primary start-booking-btn" data-id="${booking.id}">Start Job</button>
                    <button class="btn btn-sm btn-outline-danger cancel-booking-btn" data-id="${booking.id}">Cancel</button>
                `;
            } else if (status === 'ongoing') {
                actionButtons = `
                    <button class="btn btn-sm btn-success complete-booking-btn" data-id="${booking.id}">Complete</button>
                `;
            }
            
            bookingItem.innerHTML = `
                <div class="booking-info">
                    <h4>${booking.service}</h4>
                    <p>Client: ${booking.client}</p>
                    <p>${booking.date}</p>
                    <p>Price: ${booking.price}</p>
                </div>
                <div class="booking-actions">
                    ${actionButtons}
                    <button class="btn btn-sm btn-outline-primary view-booking-btn" data-id="${booking.id}">Details</button>
                </div>
            `;
            
            bookingsList.appendChild(bookingItem);
        });
    });
    
    // Add event listeners to booking action buttons
    setupBookingActionButtons();
}

/**
 * Set up event listeners for booking action buttons
 */
function setupBookingActionButtons() {
    // Accept booking
    const acceptButtons = document.querySelectorAll('.accept-booking-btn');
    acceptButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookingId = this.getAttribute('data-id');
            acceptBooking(bookingId);
        });
    });
    
    // Decline booking
    const declineButtons = document.querySelectorAll('.decline-booking-btn');
    declineButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookingId = this.getAttribute('data-id');
            declineBooking(bookingId);
        });
    });
    
    // Start job
    const startButtons = document.querySelectorAll('.start-booking-btn');
    startButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookingId = this.getAttribute('data-id');
            startJob(bookingId);
        });
    });
    
    // Complete job
    const completeButtons = document.querySelectorAll('.complete-booking-btn');
    completeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookingId = this.getAttribute('data-id');
            completeJob(bookingId);
        });
    });
    
    // Cancel booking
    const cancelButtons = document.querySelectorAll('.cancel-booking-btn');
    cancelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookingId = this.getAttribute('data-id');
            cancelBooking(bookingId);
        });
    });
    
    // View booking details
    const viewButtons = document.querySelectorAll('.view-booking-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookingId = this.getAttribute('data-id');
            viewBookingDetails(bookingId);
        });
    });
}

/**
 * Load earnings data
 */
function loadEarningsData() {
    // This function would fetch earnings data from the backend
    // For now, we're using the mock data in the charts initialization
}

/**
 * Update earnings chart based on selected period
 */
function updateEarningsChart(period) {
    if (!window.earningsDetailChart) return;
    
    let labels, data;
    
    switch(period) {
        case 'week':
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            data = [150, 220, 180, 200, 250, 300, 100];
            break;
        case 'month':
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            data = [1200, 950, 1400, 1100];
            break;
        case 'year':
            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            data = [1200, 1900, 1500, 2500, 2100, 3000, 2800, 3200, 2700, 2900, 3500, 4000];
            break;
        default:
            return;
    }
    
    window.earningsDetailChart.data.labels = labels;
    window.earningsDetailChart.data.datasets[0].data = data;
    window.earningsDetailChart.update();
}

/**
 * Load reviews
 */
function loadReviews() {
    const reviewsList = document.getElementById('provider-reviews-list');
    if (!reviewsList) return;
    
    // Mock reviews data - would be fetched from backend in a real app
    const reviews = [
        { id: 1, client: 'Sarah Johnson', service: 'Plumbing Repair', rating: 5, comment: 'Excellent service! Fixed my leaky pipe quickly and professionally.', date: '2 days ago' },
        { id: 2, client: 'Michael Brown', service: 'Electrical Wiring', rating: 4, comment: 'Good work, arrived on time and completed the job as expected.', date: '1 week ago' },
        { id: 3, client: 'Emily Wilson', service: 'Kitchen Renovation', rating: 5, comment: 'Transformed my kitchen completely! Very satisfied with the results.', date: '2 weeks ago' },
        { id: 4, client: 'David Thompson', service: 'Plumbing Service', rating: 4, comment: 'Professional and knowledgeable. Would hire again.', date: '1 month ago' }
    ];
    
    // Clear loading spinner
    reviewsList.innerHTML = '';
    
    // Add reviews to the list
    reviews.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        
        // Generate stars based on rating
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= review.rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        reviewItem.innerHTML = `
            <div class="review-header">
                <div class="review-avatar">
                    <img src="../assets/images/default-avatar.jpg" alt="${review.client}">
                </div>
                <div class="review-info">
                    <h4>${review.client}</h4>
                    <p>${review.service}</p>
                </div>
                <div class="review-rating">
                    ${stars}
                </div>
            </div>
            <div class="review-content">
                <p>${review.comment}</p>
            </div>
            <div class="review-footer">
                <div class="review-date">${review.date}</div>
                <div class="review-actions">
                    <button class="reply-review-btn" data-id="${review.id}"><i class="fas fa-reply"></i> Reply</button>
                </div>
            </div>
        `;
        
        reviewsList.appendChild(reviewItem);
    });
    
    // Add event listeners to reply buttons
    const replyButtons = document.querySelectorAll('.reply-review-btn');
    replyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const reviewId = this.getAttribute('data-id');
            replyToReview(reviewId);
        });
    });
}

/**
 * Reply to a review
 */
function replyToReview(reviewId) {
    // In a real app, this would open a modal or form to reply
    alert(`Reply to review ${reviewId} functionality would be implemented here.`);
}

/**
 * Load conversations
 */
function loadConversations() {
    const conversationsList = document.getElementById('conversations-list');
    if (!conversationsList) return;
    
    // Mock conversations data - would be fetched from backend in a real app
    const conversations = [
        { id: 1, client: 'Sarah Johnson', avatar: '../assets/images/default-avatar.jpg', lastMessage: 'What time will you arrive tomorrow?', time: '10:30 AM', unread: true },
        { id: 2, client: 'Michael Brown', avatar: '../assets/images/default-avatar.jpg', lastMessage: 'Thanks for the quick service!', time: 'Yesterday', unread: false },
        { id: 3, client: 'Emily Wilson', avatar: '../assets/images/default-avatar.jpg', lastMessage: 'Can you provide a quote for additional work?', time: '2 days ago', unread: false }
    ];
    
    // Clear loading spinner
    conversationsList.innerHTML = '';
    
    // Add conversations to the list
    conversations.forEach(conversation => {
        const conversationItem = document.createElement('div');
        conversationItem.className = 'conversation-item';
        if (conversation.unread) conversationItem.classList.add('unread');
        
        conversationItem.innerHTML = `
            <div class="conversation-avatar">
                <img src="${conversation.avatar}" alt="${conversation.client}">
            </div>
            <div class="conversation-info">
                <h4>${conversation.client}</h4>
                <p>${conversation.lastMessage}</p>
            </div>
            <div class="conversation-time">${conversation.time}</div>
        `;
        
        conversationItem.addEventListener('click', function() {
            loadConversation(conversation.id);
        });
        
        conversationsList.appendChild(conversationItem);
    });
}

/**
 * Load a specific conversation
 */
function loadConversation(conversationId) {
    const messageContent = document.getElementById('message-content');
    if (!messageContent) return;
    
    // Show the message content on mobile
    document.querySelector('.conversations-list').classList.remove('active');
    messageContent.classList.add('active');
    
    // Mock conversation data - would be fetched from backend in a real app
    const conversation = {
        id: conversationId,
        client: 'Sarah Johnson',
        avatar: '../assets/images/default-avatar.jpg',
        messages: [
            { sender: 'client', content: 'Hi, I need help with my plumbing issue.', time: '10:15 AM' },
            { sender: 'provider', content: 'Hello! I\'d be happy to help. Can you describe the issue?', time: '10:18 AM' },
            { sender: 'client', content: 'I have a leaky faucet in my kitchen.', time: '10:20 AM' },
            { sender: 'provider', content: 'I can fix that for you. When would be a good time to come by?', time: '10:22 AM' },
            { sender: 'client', content: 'Would tomorrow morning work?', time: '10:25 AM' },
            { sender: 'provider', content: 'Yes, I can come by around 10:00 AM. Does that work for you?', time: '10:28 AM' },
            { sender: 'client', content: 'What time will you arrive tomorrow?', time: '10:30 AM' }
        ]
    };
    
    // Update conversation header
    document.getElementById('conversation-client-name').textContent = conversation.client;
    document.getElementById('conversation-client-avatar').src = conversation.avatar;
    
    // Clear previous messages
    const messagesContainer = document.getElementById('messages-container');
    messagesContainer.innerHTML = '';
    
    // Add messages to the container
    conversation.messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.sender === 'provider' ? 'sent' : 'received'}`;
        
        messageElement.innerHTML = `
            <div class="message-content">${message.content}</div>
            <div class="message-time">${message.time}</div>
        `;
        
        messagesContainer.appendChild(messageElement);
    });
    
    // Scroll to bottom of messages
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Set active conversation
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`.conversation-item[data-id="${conversationId}"]`).classList.add('active');
}

/**
 * Send a message
 */
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    
    if (message === '') return;
    
    // In a real app, this would send the message to the backend
    // For now, we'll just add it to the UI
    const messagesContainer = document.getElementById('messages-container');
    const messageElement = document.createElement('div');
    messageElement.className = 'message sent';
    
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;
    
    messageElement.innerHTML = `
        <div class="message-content">${message}</div>
        <div class="message-time">${time}</div>
    `;
    
    messagesContainer.appendChild(messageElement);
    
    // Clear input
    messageInput.value = '';
    
    // Scroll to bottom of messages
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Load profile data
 */
function loadProfileData() {
    // Mock profile data - would be fetched from backend in a real app
    const profileData = {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@example.com',
        phone: '(555) 123-4567',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        bio: 'Professional plumber with over 10 years of experience in residential and commercial plumbing services.',
        qualifications: [
            { id: 1, title: 'Master Plumber License', issuer: 'State Board of Plumbing Examiners', date: '2020-05-15', expiry: '2025-05-15', description: 'Licensed master plumber certification' },
            { id: 2, title: 'Certified Electrician', issuer: 'National Electrical Contractors Association', date: '2018-03-10', expiry: '2024-03-10', description: 'Certified for residential and commercial electrical work' }
        ]
    };
    
    // Populate profile form
    document.getElementById('first-name').value = profileData.firstName;
    document.getElementById('last-name').value = profileData.lastName;
    document.getElementById('email').value = profileData.email;
    document.getElementById('phone').value = profileData.phone;
    document.getElementById('address').value = profileData.address;
    document.getElementById('city').value = profileData.city;
    document.getElementById('state').value = profileData.state;
    document.getElementById('zip').value = profileData.zip;
    document.getElementById('bio').value = profileData.bio;
    
    // Load qualifications
    const qualificationsContainer = document.getElementById('qualifications-container');
    if (qualificationsContainer) {
        qualificationsContainer.innerHTML = '';
        
        profileData.qualifications.forEach(qualification => {
            const qualificationItem = document.createElement('div');
            qualificationItem.className = 'qualification-item';
            
            const expiryText = qualification.expiry ? `Expires: ${formatDate(qualification.expiry)}` : 'No expiration date';
            
            qualificationItem.innerHTML = `
                <div class="qualification-header">
                    <h4>${qualification.title}</h4>
                    <div class="qualification-actions">
                        <button class="btn btn-sm btn-outline-primary edit-qualification-btn" data-id="${qualification.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger delete-qualification-btn" data-id="${qualification.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="qualification-body">
                    <p><strong>Issuer:</strong> ${qualification.issuer}</p>
                    <p><strong>Date Obtained:</strong> ${formatDate(qualification.date)}</p>
                    <p><strong>${expiryText}</strong></p>
                    <p>${qualification.description}</p>
                </div>
            `;
            
            qualificationsContainer.appendChild(qualificationItem);
        });
        
        // Add event listeners to qualification buttons
        const editQualificationBtns = document.querySelectorAll('.edit-qualification-btn');
        editQualificationBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const qualificationId = this.getAttribute('data-id');
                openQualificationModal(qualificationId);
            });
        });
        
        const deleteQualificationBtns = document.querySelectorAll('.delete-qualification-btn');
        deleteQualificationBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const qualificationId = this.getAttribute('data-id');
                deleteQualification(qualificationId);
            });
        });
    }
}

/**
 * Format a date string
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

/**
 * Save profile data
 */
function saveProfileData() {
    // Get form data
    const profileData = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        bio: document.getElementById('bio').value
    };
    
    // In a real app, this would send the data to the backend
    console.log('Saving profile data:', profileData);
    
    // Show success message
    showNotification('Profile updated successfully', 'success');
}

/**
 * Save qualification data
 */
function saveQualificationData() {
    // Get form data
    const qualificationData = {
        id: document.getElementById('qualification-id').value,
        title: document.getElementById('qualification-title').value,
        issuer: document.getElementById('qualification-issuer').value,
        date: document.getElementById('qualification-date').value,
        expiry: document.getElementById('qualification-expiry').value,
        description: document.getElementById('qualification-description').value
    };
    
    // In a real app, this would send the data to the backend
    console.log('Saving qualification data:', qualificationData);
    
    // Close modal
    closeAllModals();
    
    // Reload qualifications
    loadProfileData();
    
    // Show success message
    showNotification('Qualification saved successfully', 'success');
}

/**
 * Delete a qualification
 */
function deleteQualification(qualificationId) {
    if (confirm('Are you sure you want to delete this qualification?')) {
        // In a real app, this would send a delete request to the backend
        console.log('Deleting qualification:', qualificationId);
        
        // Reload qualifications
        loadProfileData();
        
        // Show success message
        showNotification('Qualification deleted successfully', 'success');
    }
}

/**
 * Update password
 */
function updatePassword() {
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmNewPassword = document.getElementById('confirm-new-password').value;
    
    // Validate passwords
    if (newPassword !== confirmNewPassword) {
        showNotification('New passwords do not match', 'error');
        return;
    }
    
    // In a real app, this would send the data to the backend
    console.log('Updating password');
    
    // Reset form
    document.getElementById('password-form').reset();
    
    // Show success message
    showNotification('Password updated successfully', 'success');
}

/**
 * Save notification preferences
 */
function saveNotificationPreferences() {
    // Get form data
    const notificationPreferences = {
        emailNotifications: document.getElementById('email-notifications').checked,
        smsNotifications: document.getElementById('sms-notifications').checked,
        bookingReminders: document.getElementById('booking-reminders').checked,
        newBookingAlerts: document.getElementById('new-booking-alerts').checked,
        marketingEmails: document.getElementById('marketing-emails').checked
    };
    
    // In a real app, this would send the data to the backend
    console.log('Saving notification preferences:', notificationPreferences);
    
    // Show success message
    showNotification('Notification preferences saved', 'success');
}

/**
 * Save availability settings
 */
function saveAvailabilitySettings() {
    // Get form data for each day
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const availabilitySettings = {};
    
    days.forEach(day => {
        const available = document.getElementById(`${day}-available`);
        if (available) {
            availabilitySettings[day] = {
                available: available.checked,
                startTime: document.getElementById(`${day}-start`).value,
                endTime: document.getElementById(`${day}-end`).value
            };
        }
    });
    
    // In a real app, this would send the data to the backend
    console.log('Saving availability settings:', availabilitySettings);
    
    // Show success message
    showNotification('Availability settings saved', 'success');
}

/**
 * Save service data
 */
function saveServiceData() {
    // Get form data
    const serviceData = {
        id: document.getElementById('service-id').value,
        title: document.getElementById('service-title').value,
        category: document.getElementById('service-category').value,
        description: document.getElementById('service-description').value,
        price: document.getElementById('service-price').value,
        priceType: document.getElementById('service-price-type').value,
        location: document.getElementById('service-location').value
    };
    
    // In a real app, this would send the data to the backend
    console.log('Saving service data:', serviceData);
    
    // Close modal
    closeAllModals();
    
    // Reload services
    loadServices();
    
    // Show success message
    showNotification('Service saved successfully', 'success');
}

/**
 * Accept a booking
 */
function acceptBooking(bookingId) {
    // In a real app, this would send a request to the backend
    console.log('Accepting booking:', bookingId);
    
    // Reload bookings
    loadBookings();
    
    // Show success message
    showNotification('Booking accepted', 'success');
}

/**
 * Decline a booking
 */
function declineBooking(bookingId) {
    if (confirm('Are you sure you want to decline this booking?')) {
        // In a real app, this would send a request to the backend
        console.log('Declining booking:', bookingId);
        
        // Reload bookings
        loadBookings();
        
        // Show success message
        showNotification('Booking declined', 'success');
    }
}

/**
 * Start a job
 */
function startJob(bookingId) {
    // In a real app, this would send a request to the backend
    console.log('Starting job:', bookingId);
    
    // Reload bookings
    loadBookings();
    
    // Show success message
    showNotification('Job started', 'success');
}

/**
 * Complete a job
 */
function completeJob(bookingId) {
    // In a real app, this would send a request to the backend
    console.log('Completing job:', bookingId);
    
    // Reload bookings
    loadBookings();
    
    // Show success message
    showNotification('Job completed', 'success');
}

/**
 * Cancel a booking
 */
function cancelBooking(bookingId) {
    if (confirm('Are you sure you want to cancel this booking?')) {
        // In a real app, this would send a request to the backend
        console.log('Cancelling booking:', bookingId);
        
        // Reload bookings
        loadBookings();
        
        // Show success message
        showNotification('Booking cancelled', 'success');
    }
}

/**
 * View booking details
 */
function viewBookingDetails(bookingId) {
    // In a real app, this would open a modal with booking details
    alert(`View details for booking ${bookingId} functionality would be implemented here.`);
}

/**
 * Confirm account deletion
 */
function confirmDeleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        if (confirm('All your data will be permanently deleted. Type "DELETE" to confirm.')) {
            // In a real app, this would send a request to the backend
            console.log('Deleting account');
            
            // Redirect to homepage or login page
            window.location.href = '../index.html';
        }
    }
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="close-notification">&times;</button>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Add event listener to close button
    notification.querySelector('.close-notification').addEventListener('click', function() {
        notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}