// Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard components
    initDashboardTabs();
    initBookingActions();
    initServiceManagement();
    initCharts();
    initNotifications();
});

// Initialize dashboard tabs
function initDashboardTabs() {
    const tabButtons = document.querySelectorAll('.dashboard-tab-btn');
    
    if (tabButtons.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            const tabContainer = document.querySelector('.dashboard-content');
            const tabPane = document.getElementById(`${tabId}-tab`);
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            const tabPanes = tabContainer.querySelectorAll('.dashboard-tab-pane');
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current button and pane
            this.classList.add('active');
            tabPane.classList.add('active');
        });
    });
}

// Initialize booking actions (accept, decline, complete)
function initBookingActions() {
    const actionButtons = document.querySelectorAll('.booking-action');
    
    if (actionButtons.length === 0) return;
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const action = this.dataset.action;
            const bookingId = this.dataset.bookingId;
            
            // Show confirmation modal
            const modal = document.getElementById('confirm-action-modal');
            const confirmButton = document.getElementById('confirm-action-btn');
            const actionText = document.getElementById('action-text');
            
            if (modal && confirmButton && actionText) {
                // Set action text
                switch (action) {
                    case 'accept':
                        actionText.textContent = 'accept this booking';
                        break;
                    case 'decline':
                        actionText.textContent = 'decline this booking';
                        break;
                    case 'complete':
                        actionText.textContent = 'mark this booking as complete';
                        break;
                    case 'cancel':
                        actionText.textContent = 'cancel this booking';
                        break;
                    default:
                        actionText.textContent = 'perform this action';
                }
                
                // Show modal
                modal.style.display = 'block';
                
                // Set confirm button action
                confirmButton.onclick = function() {
                    // For demo purposes, we'll just update the UI
                    // In a real app, you would send this to your API
                    updateBookingStatus(bookingId, action);
                    
                    // Hide modal
                    modal.style.display = 'none';
                };
            } else {
                // If modal not found, just update the booking status
                updateBookingStatus(bookingId, action);
            }
        });
    });
}

// Update booking status in UI
function updateBookingStatus(bookingId, action) {
    const bookingItem = document.querySelector(`.booking-item[data-booking-id="${bookingId}"]`);
    
    if (!bookingItem) return;
    
    switch (action) {
        case 'accept':
            bookingItem.classList.remove('pending');
            bookingItem.classList.add('accepted');
            bookingItem.querySelector('.booking-status').textContent = 'Accepted';
            break;
        case 'decline':
            bookingItem.classList.remove('pending');
            bookingItem.classList.add('declined');
            bookingItem.querySelector('.booking-status').textContent = 'Declined';
            break;
        case 'complete':
            bookingItem.classList.remove('accepted');
            bookingItem.classList.add('completed');
            bookingItem.querySelector('.booking-status').textContent = 'Completed';
            break;
        case 'cancel':
            bookingItem.classList.remove('pending', 'accepted');
            bookingItem.classList.add('cancelled');
            bookingItem.querySelector('.booking-status').textContent = 'Cancelled';
            break;
    }
    
    // Update action buttons
    const actionButtons = bookingItem.querySelectorAll('.booking-action');
    
    if (action === 'accept') {
        // Show complete button, hide accept/decline buttons
        actionButtons.forEach(button => {
            if (button.dataset.action === 'complete') {
                button.style.display = 'inline-block';
            } else if (button.dataset.action === 'accept' || button.dataset.action === 'decline') {
                button.style.display = 'none';
            }
        });
    } else if (action === 'decline' || action === 'complete' || action === 'cancel') {
        // Hide all action buttons
        actionButtons.forEach(button => {
            button.style.display = 'none';
        });
    }
}

// Initialize service management (add, edit, delete)
function initServiceManagement() {
    // Add service form
    const addServiceForm = document.getElementById('add-service-form');
    
    if (addServiceForm) {
        addServiceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const serviceData = {
                title: formData.get('service-title'),
                category: formData.get('service-category'),
                price: formData.get('service-price'),
                priceUnit: formData.get('service-price-unit'),
                description: formData.get('service-description'),
                location: formData.get('service-location')
            };
            
            // For demo purposes, we'll just add it to the UI
            // In a real app, you would send this to your API
            addServiceToUI(serviceData);
            
            // Reset form
            this.reset();
            
            // Hide modal
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Edit service buttons
    const editButtons = document.querySelectorAll('.edit-service-btn');
    
    if (editButtons.length > 0) {
        editButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const serviceId = this.dataset.serviceId;
                const serviceItem = document.querySelector(`.service-item[data-service-id="${serviceId}"]`);
                
                if (!serviceItem) return;
                
                // Get service data
                const serviceData = {
                    id: serviceId,
                    title: serviceItem.querySelector('.service-title').textContent,
                    category: serviceItem.dataset.category,
                    price: serviceItem.querySelector('.service-price').dataset.price,
                    priceUnit: serviceItem.querySelector('.service-price').dataset.unit,
                    description: serviceItem.querySelector('.service-description').textContent,
                    location: serviceItem.querySelector('.service-location').textContent
                };
                
                // Populate edit form
                const editForm = document.getElementById('edit-service-form');
                
                if (editForm) {
                    editForm.elements['service-id'].value = serviceData.id;
                    editForm.elements['service-title'].value = serviceData.title;
                    editForm.elements['service-category'].value = serviceData.category;
                    editForm.elements['service-price'].value = serviceData.price;
                    editForm.elements['service-price-unit'].value = serviceData.priceUnit;
                    editForm.elements['service-description'].value = serviceData.description;
                    editForm.elements['service-location'].value = serviceData.location;
                    
                    // Show edit modal
                    const modal = document.getElementById('edit-service-modal');
                    if (modal) {
                        modal.style.display = 'block';
                    }
                }
            });
        });
    }
    
    // Edit service form
    const editServiceForm = document.getElementById('edit-service-form');
    
    if (editServiceForm) {
        editServiceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const serviceData = {
                id: formData.get('service-id'),
                title: formData.get('service-title'),
                category: formData.get('service-category'),
                price: formData.get('service-price'),
                priceUnit: formData.get('service-price-unit'),
                description: formData.get('service-description'),
                location: formData.get('service-location')
            };
            
            // For demo purposes, we'll just update the UI
            // In a real app, you would send this to your API
            updateServiceInUI(serviceData);
            
            // Hide modal
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Delete service buttons
    const deleteButtons = document.querySelectorAll('.delete-service-btn');
    
    if (deleteButtons.length > 0) {
        deleteButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const serviceId = this.dataset.serviceId;
                
                // Show confirmation modal
                const modal = document.getElementById('confirm-delete-modal');
                const confirmButton = document.getElementById('confirm-delete-btn');
                
                if (modal && confirmButton) {
                    // Show modal
                    modal.style.display = 'block';
                    
                    // Set confirm button action
                    confirmButton.onclick = function() {
                        // For demo purposes, we'll just remove it from the UI
                        // In a real app, you would send this to your API
                        deleteServiceFromUI(serviceId);
                        
                        // Hide modal
                        modal.style.display = 'none';
                    };
                } else {
                    // If modal not found, just delete the service
                    deleteServiceFromUI(serviceId);
                }
            });
        });
    }
}

// Add service to UI
function addServiceToUI(serviceData) {
    const servicesList = document.querySelector('.services-list');
    
    if (!servicesList) return;
    
    // Generate unique ID for new service
    const serviceId = Date.now().toString();
    
    // Create service item
    const serviceItem = document.createElement('div');
    serviceItem.className = 'service-item';
    serviceItem.dataset.serviceId = serviceId;
    serviceItem.dataset.category = serviceData.category;
    
    serviceItem.innerHTML = `
        <div class="service-header">
            <h3 class="service-title">${serviceData.title}</h3>
            <div class="service-actions">
                <button class="btn btn-sm btn-outline edit-service-btn" data-service-id="${serviceId}">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-sm btn-danger delete-service-btn" data-service-id="${serviceId}">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
        <div class="service-details">
            <div class="service-category">${serviceData.category.charAt(0).toUpperCase() + serviceData.category.slice(1)}</div>
            <div class="service-price" data-price="${serviceData.price}" data-unit="${serviceData.priceUnit}">
                $${serviceData.price} / ${serviceData.priceUnit}
            </div>
            <div class="service-location">${serviceData.location}</div>
            <div class="service-description">${serviceData.description}</div>
        </div>
    `;
    
    // Add to services list
    servicesList.appendChild(serviceItem);
    
    // Add event listeners to new buttons
    const editButton = serviceItem.querySelector('.edit-service-btn');
    const deleteButton = serviceItem.querySelector('.delete-service-btn');
    
    editButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const serviceId = this.dataset.serviceId;
        const serviceItem = document.querySelector(`.service-item[data-service-id="${serviceId}"]`);
        
        if (!serviceItem) return;
        
        // Get service data
        const serviceData = {
            id: serviceId,
            title: serviceItem.querySelector('.service-title').textContent,
            category: serviceItem.dataset.category,
            price: serviceItem.querySelector('.service-price').dataset.price,
            priceUnit: serviceItem.querySelector('.service-price').dataset.unit,
            description: serviceItem.querySelector('.service-description').textContent,
            location: serviceItem.querySelector('.service-location').textContent
        };
        
        // Populate edit form
        const editForm = document.getElementById('edit-service-form');
        
        if (editForm) {
            editForm.elements['service-id'].value = serviceData.id;
            editForm.elements['service-title'].value = serviceData.title;
            editForm.elements['service-category'].value = serviceData.category;
            editForm.elements['service-price'].value = serviceData.price;
            editForm.elements['service-price-unit'].value = serviceData.priceUnit;
            editForm.elements['service-description'].value = serviceData.description;
            editForm.elements['service-location'].value = serviceData.location;
            
            // Show edit modal
            const modal = document.getElementById('edit-service-modal');
            if (modal) {
                modal.style.display = 'block';
            }
        }
    });
    
    deleteButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const serviceId = this.dataset.serviceId;
        
        // Show confirmation modal
        const modal = document.getElementById('confirm-delete-modal');
        const confirmButton = document.getElementById('confirm-delete-btn');
        
        if (modal && confirmButton) {
            // Show modal
            modal.style.display = 'block';
            
            // Set confirm button action
            confirmButton.onclick = function() {
                // For demo purposes, we'll just remove it from the UI
                // In a real app, you would send this to your API
                deleteServiceFromUI(serviceId);
                
                // Hide modal
                modal.style.display = 'none';
            };
        } else {
            // If modal not found, just delete the service
            deleteServiceFromUI(serviceId);
        }
    });
}

// Update service in UI
function updateServiceInUI(serviceData) {
    const serviceItem = document.querySelector(`.service-item[data-service-id="${serviceData.id}"]`);
    
    if (!serviceItem) return;
    
    // Update service item
    serviceItem.dataset.category = serviceData.category;
    serviceItem.querySelector('.service-title').textContent = serviceData.title;
    serviceItem.querySelector('.service-category').textContent = serviceData.category.charAt(0).toUpperCase() + serviceData.category.slice(1);
    
    const servicePriceElement = serviceItem.querySelector('.service-price');
    servicePriceElement.dataset.price = serviceData.price;
    servicePriceElement.dataset.unit = serviceData.priceUnit;
    servicePriceElement.textContent = `$${serviceData.price} / ${serviceData.priceUnit}`;
    
    serviceItem.querySelector('.service-location').textContent = serviceData.location;
    serviceItem.querySelector('.service-description').textContent = serviceData.description;
}

// Delete service from UI
function deleteServiceFromUI(serviceId) {
    const serviceItem = document.querySelector(`.service-item[data-service-id="${serviceId}"]`);
    
    if (!serviceItem) return;
    
    // Remove service item with animation
    serviceItem.style.opacity = '0';
    serviceItem.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        serviceItem.remove();
    }, 300);
}

// Initialize charts
function initCharts() {
    // Earnings chart
    const earningsChart = document.getElementById('earnings-chart');
    
    if (earningsChart) {
        // For a real implementation, you would use a library like Chart.js
        // This is a simple implementation for demo purposes
        const earningsData = [1200, 1500, 1800, 1600, 2000, 2200, 2400];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
        
        // Find max value for scaling
        const maxEarnings = Math.max(...earningsData);
        
        // Create chart bars
        earningsData.forEach((value, index) => {
            const barHeight = (value / maxEarnings) * 100;
            const bar = document.createElement('div');
            bar.className = 'chart-bar';
            bar.style.height = `${barHeight}%`;
            
            const label = document.createElement('div');
            label.className = 'chart-label';
            label.textContent = months[index];
            
            const barValue = document.createElement('div');
            barValue.className = 'chart-value';
            barValue.textContent = `$${value}`;
            
            bar.appendChild(barValue);
            
            const barContainer = document.createElement('div');
            barContainer.className = 'chart-bar-container';
            barContainer.appendChild(bar);
            barContainer.appendChild(label);
            
            earningsChart.appendChild(barContainer);
        });
    }
    
    // Bookings chart
    const bookingsChart = document.getElementById('bookings-chart');
    
    if (bookingsChart) {
        // For a real implementation, you would use a library like Chart.js
        // This is a simple implementation for demo purposes
        const bookingsData = {
            completed: 45,
            pending: 15,
            cancelled: 5
        };
        
        const total = bookingsData.completed + bookingsData.pending + bookingsData.cancelled;
        
        // Create chart segments
        const completedPercent = (bookingsData.completed / total) * 100;
        const pendingPercent = (bookingsData.pending / total) * 100;
        const cancelledPercent = (bookingsData.cancelled / total) * 100;
        
        bookingsChart.style.background = `conic-gradient(
            #4CAF50 0% ${completedPercent}%,
            #FFC107 ${completedPercent}% ${completedPercent + pendingPercent}%,
            #F44336 ${completedPercent + pendingPercent}% 100%
        )`;
        
        // Create legend
        const legend = document.createElement('div');
        legend.className = 'chart-legend';
        
        legend.innerHTML = `
            <div class="legend-item">
                <span class="legend-color" style="background-color: #4CAF50;"></span>
                <span class="legend-label">Completed (${bookingsData.completed})</span>
            </div>
            <div class="legend-item">
                <span class="legend-color" style="background-color: #FFC107;"></span>
                <span class="legend-label">Pending (${bookingsData.pending})</span>
            </div>
            <div class="legend-item">
                <span class="legend-color" style="background-color: #F44336;"></span>
                <span class="legend-label">Cancelled (${bookingsData.cancelled})</span>
            </div>
        `;
        
        const chartContainer = bookingsChart.parentElement;
        chartContainer.appendChild(legend);
    }
}

// Initialize notifications
function initNotifications() {
    const notificationBell = document.querySelector('.notification-bell');
    const notificationDropdown = document.querySelector('.notification-dropdown');
    
    if (!notificationBell || !notificationDropdown) return;
    
    // Toggle notification dropdown
    notificationBell.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        notificationDropdown.classList.toggle('active');
        
        // Mark as read when opened
        if (notificationDropdown.classList.contains('active')) {
            const unreadCount = document.querySelector('.notification-count');
            if (unreadCount) {
                unreadCount.style.display = 'none';
            }
            
            const unreadNotifications = document.querySelectorAll('.notification-item.unread');
            unreadNotifications.forEach(notification => {
                notification.classList.remove('unread');
            });
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!notificationDropdown.contains(e.target) && !notificationBell.contains(e.target)) {
            notificationDropdown.classList.remove('active');
        }
    });
    
    // Mark individual notification as read
    const notifications = document.querySelectorAll('.notification-item');
    
    notifications.forEach(notification => {
        notification.addEventListener('click', function() {
            this.classList.remove('unread');
            
            // Update unread count
            const unreadNotifications = document.querySelectorAll('.notification-item.unread');
            const unreadCount = document.querySelector('.notification-count');
            
            if (unreadCount) {
                if (unreadNotifications.length > 0) {
                    unreadCount.textContent = unreadNotifications.length;
                } else {
                    unreadCount.style.display = 'none';
                }
            }
        });
    });
}