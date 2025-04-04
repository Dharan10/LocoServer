// Service Details JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get service ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id');
    
    if (serviceId) {
        // Load service details
        loadServiceDetails(serviceId);
    } else {
        // Redirect to services page if no ID provided
        window.location.href = 'services.html';
    }
    
    // Initialize booking form
    initBookingForm();
    
    // Initialize reviews
    initReviews();
    
    // Initialize related services
    initRelatedServices();
});

// Load service details
function loadServiceDetails(serviceId) {
    // For demo purposes, we'll use mock data
    // In a real app, you would fetch this from your API
    const serviceData = getServiceData(serviceId);
    
    if (!serviceData) {
        // Service not found, redirect to services page
        window.location.href = 'services.html';
        return;
    }
    
    // Update page title
    document.title = `${serviceData.title} - LocoServe`;
    
    // Update service details
    updateServiceDetails(serviceData);
    
    // Update provider details
    updateProviderDetails(serviceData.provider);
    
    // Update booking form
    updateBookingForm(serviceData);
    
    // Load reviews
    loadReviews(serviceId);
    
    // Load related services
    loadRelatedServices(serviceData.category, serviceId);
}

// Get service data (mock data for demo)
function getServiceData(serviceId) {
    // This would be fetched from your API in a real app
    const servicesData = [
        {
            id: '1',
            title: 'Professional Plumbing Services',
            category: 'plumbing',
            rating: 4.5,
            reviews: 32,
            price: 75,
            priceUnit: 'hour',
            provider: {
                id: '101',
                name: 'John Smith',
                avatar: '../assets/images/providers/provider-1.jpg',
                rating: 4.8,
                reviews: 56,
                memberSince: '2020-05-15',
                location: 'New York, NY',
                description: 'Professional plumber with over 10 years of experience in residential and commercial plumbing services.'
            },
            image: '../assets/images/services/plumbing-1.jpg',
            gallery: [
                '../assets/images/services/plumbing-1.jpg',
                '../assets/images/services/plumbing-2.jpg',
                '../assets/images/services/plumbing-3.jpg'
            ],
            location: 'New York, NY',
            availability: ['weekdays', 'emergency'],
            featured: true,
            description: 'Expert plumbing services for residential and commercial properties. Available for emergency calls.',
            longDescription: `
                <p>Our professional plumbing services cover all aspects of residential and commercial plumbing needs. With over 10 years of experience, we provide reliable and efficient solutions for all your plumbing problems.</p>
                
                <h4>Services Offered:</h4>
                <ul>
                    <li>Leak detection and repair</li>
                    <li>Pipe installation and replacement</li>
                    <li>Drain cleaning and unclogging</li>
                    <li>Water heater installation and repair</li>
                    <li>Bathroom and kitchen plumbing</li>
                    <li>Emergency plumbing services</li>
                </ul>
                
                <h4>Why Choose Us:</h4>
                <ul>
                    <li>Licensed and insured professionals</li>
                    <li>Prompt and reliable service</li>
                    <li>Transparent pricing with no hidden fees</li>
                    <li>Quality workmanship guaranteed</li>
                    <li>24/7 emergency services available</li>
                </ul>
            `
        },
        {
            id: '2',
            title: 'Residential Plumbing Repair',
            category: 'plumbing',
            rating: 4.2,
            reviews: 18,
            price: 65,
            priceUnit: 'hour',
            provider: {
                id: '102',
                name: 'Robert Johnson',
                avatar: '../assets/images/providers/provider-2.jpg',
                rating: 4.5,
                reviews: 42,
                memberSince: '2019-08-10',
                location: 'Brooklyn, NY',
                description: 'Specialized in residential plumbing repairs and installations with a focus on customer satisfaction.'
            },
            image: '../assets/images/services/plumbing-2.jpg',
            gallery: [
                '../assets/images/services/plumbing-2.jpg',
                '../assets/images/services/plumbing-1.jpg',
                '../assets/images/services/plumbing-4.jpg'
            ],
            location: 'Brooklyn, NY',
            availability: ['weekdays', 'weekends'],
            featured: false,
            description: 'Specialized in residential plumbing repairs, installations, and maintenance.',
            longDescription: `
                <p>Our residential plumbing repair service is dedicated to keeping your home's plumbing system in perfect working order. We specialize in all aspects of residential plumbing, from minor repairs to major installations.</p>
                
                <h4>Services Offered:</h4>
                <ul>
                    <li>Faucet and fixture repair/replacement</li>
                    <li>Toilet repair and installation</li>
                    <li>Sink and bathtub unclogging</li>
                    <li>Garbage disposal repair</li>
                    <li>Pipe repair and replacement</li>
                    <li>Water pressure issues</li>
                </ul>
                
                <h4>Why Choose Us:</h4>
                <ul>
                    <li>Experienced residential plumbing specialists</li>
                    <li>Affordable rates with upfront pricing</li>
                    <li>Clean and respectful of your home</li>
                    <li>Fully stocked service vehicles</li>
                    <li>Satisfaction guaranteed</li>
                </ul>
            `
        }
    ];
    
    return servicesData.find(service => service.id === serviceId);
}

// Update service details in the UI
function updateServiceDetails(serviceData) {
    // Update service title
    const serviceTitle = document.querySelector('.service-title');
    if (serviceTitle) {
        serviceTitle.textContent = serviceData.title;
    }
    
    // Update service category
    const serviceCategory = document.querySelector('.service-category');
    if (serviceCategory) {
        serviceCategory.textContent = serviceData.category.charAt(0).toUpperCase() + serviceData.category.slice(1);
    }
    
    // Update service rating
    const serviceRating = document.querySelector('.service-rating');
    if (serviceRating) {
        serviceRating.innerHTML = `
            <div class="stars">
                ${createStarRating(serviceData.rating)}
            </div>
            <span>${serviceData.rating.toFixed(1)} (${serviceData.reviews} reviews)</span>
        `;
    }
    
    // Update service price
    const servicePrice = document.querySelector('.service-price');
    if (servicePrice) {
        servicePrice.textContent = `$${serviceData.price} / ${serviceData.priceUnit}`;
    }
    
    // Update service location
    const serviceLocation = document.querySelector('.service-location');
    if (serviceLocation) {
        serviceLocation.textContent = serviceData.location;
    }
    
    // Update service availability
    const serviceAvailability = document.querySelector('.service-availability');
    if (serviceAvailability) {
        const availabilityItems = serviceData.availability.map(item => {
            return `<span class="availability-item">${item.charAt(0).toUpperCase() + item.slice(1)}</span>`;
        }).join('');
        
        serviceAvailability.innerHTML = availabilityItems;
    }
    
    // Update service description
    const serviceDescription = document.querySelector('.service-description');
    if (serviceDescription) {
        serviceDescription.innerHTML = serviceData.longDescription;
    }
    
    // Update service image
    const serviceImage = document.querySelector('.service-main-image img');
    if (serviceImage) {
        serviceImage.src = serviceData.image;
        serviceImage.alt = serviceData.title;
    }
    
    // Update service gallery
    const serviceGallery = document.querySelector('.service-gallery');
    if (serviceGallery && serviceData.gallery) {
        serviceGallery.innerHTML = '';
        
        serviceData.gallery.forEach(image => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            galleryItem.innerHTML = `
                <img src="${image}" alt="${serviceData.title}">
            `;
            
            galleryItem.addEventListener('click', function() {
                // Update main image when gallery item is clicked
                const mainImage = document.querySelector('.service-main-image img');
                if (mainImage) {
                    mainImage.src = image;
                }
                
                // Remove active class from all gallery items
                const galleryItems = document.querySelectorAll('.gallery-item');
                galleryItems.forEach(item => item.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
            });
            
            serviceGallery.appendChild(galleryItem);
        });
        
        // Set first gallery item as active
        const firstGalleryItem = serviceGallery.querySelector('.gallery-item');
        if (firstGalleryItem) {
            firstGalleryItem.classList.add('active');
        }
    }
}

// Update provider details in the UI
function updateProviderDetails(providerData) {
    const providerInfo = document.querySelector('.provider-info');
    
    if (!providerInfo) return;
    
    providerInfo.innerHTML = `
        <div class="provider-header">
                        <img src="${providerData.avatar}" alt="${providerData.name}" class="provider-avatar">
            <div class="provider-info-text">
                <h3 class="provider-name">${providerData.name}</h3>
                <div class="provider-rating">
                    <div class="stars">
                        ${createStarRating(providerData.rating)}
                    </div>
                    <span>${providerData.rating.toFixed(1)} (${providerData.reviews} reviews)</span>
                </div>
            </div>
        </div>
        <div class="provider-details">
            <div class="provider-detail">
                <i class="fas fa-map-marker-alt"></i>
                <span>${providerData.location}</span>
            </div>
            <div class="provider-detail">
                <i class="fas fa-calendar-alt"></i>
                <span>Member since ${formatDate(providerData.memberSince)}</span>
            </div>
        </div>
        <div class="provider-description">
            <p>${providerData.description}</p>
        </div>
        <a href="profile.html?id=${providerData.id}" class="btn btn-outline btn-sm">View Profile</a>
    `;
}

// Update booking form
function updateBookingForm(serviceData) {
    const bookingForm = document.getElementById('booking-form');
    
    if (!bookingForm) return;
    
    // Set service ID in hidden field
    const serviceIdField = bookingForm.querySelector('input[name="service-id"]');
    if (serviceIdField) {
        serviceIdField.value = serviceData.id;
    }
    
    // Set provider ID in hidden field
    const providerIdField = bookingForm.querySelector('input[name="provider-id"]');
    if (providerIdField) {
        providerIdField.value = serviceData.provider.id;
    }
    
    // Set service title in form
    const serviceTitle = bookingForm.querySelector('.booking-service-title');
    if (serviceTitle) {
        serviceTitle.textContent = serviceData.title;
    }
    
    // Set service price in form
    const servicePrice = bookingForm.querySelector('.booking-service-price');
    if (servicePrice) {
        servicePrice.textContent = `$${serviceData.price} / ${serviceData.priceUnit}`;
    }
}

// Initialize booking form
function initBookingForm() {
    const bookingForm = document.getElementById('booking-form');
    
    if (!bookingForm) return;
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const bookingData = {
            serviceId: formData.get('service-id'),
            providerId: formData.get('provider-id'),
            date: formData.get('booking-date'),
            time: formData.get('booking-time'),
            duration: formData.get('booking-duration'),
            notes: formData.get('booking-notes')
        };
        
        // Validate form data
        if (!bookingData.date) {
            showFormError('Please select a date');
            return;
        }
        
        if (!bookingData.time) {
            showFormError('Please select a time');
            return;
        }
        
        if (!bookingData.duration) {
            showFormError('Please select a duration');
            return;
        }
        
        // For demo purposes, we'll just show a success message
        // In a real app, you would send this to your API
        showBookingSuccess();
    });
    
    // Initialize date picker
    const dateInput = bookingForm.querySelector('input[name="booking-date"]');
    if (dateInput) {
        // Set min date to today
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        
        dateInput.min = `${yyyy}-${mm}-${dd}`;
        
        // Set max date to 3 months from now
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        const maxYyyy = maxDate.getFullYear();
        const maxMm = String(maxDate.getMonth() + 1).padStart(2, '0');
        const maxDd = String(maxDate.getDate()).padStart(2, '0');
        
        dateInput.max = `${maxYyyy}-${maxMm}-${maxDd}`;
    }
}

// Show form error
function showFormError(message) {
    const errorElement = document.querySelector('.booking-error');
    
    if (!errorElement) return;
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Hide error after 3 seconds
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 3000);
}

// Show booking success
function showBookingSuccess() {
    const bookingForm = document.getElementById('booking-form');
    const successMessage = document.querySelector('.booking-success');
    
    if (!bookingForm || !successMessage) return;
    
    // Hide form
    bookingForm.style.display = 'none';
    
    // Show success message
    successMessage.style.display = 'block';
    
    // Redirect to dashboard after 3 seconds
    setTimeout(() => {
        window.location.href = 'dashboard-customer.html';
    }, 3000);
}

// Initialize reviews
function initReviews() {
    const reviewsContainer = document.querySelector('.service-reviews');
    
    if (!reviewsContainer) return;
    
    // Initialize review form
    const reviewForm = document.getElementById('review-form');
    
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const reviewData = {
                rating: formData.get('review-rating'),
                comment: formData.get('review-comment')
            };
            
            // Validate form data
            if (!reviewData.rating) {
                alert('Please select a rating');
                return;
            }
            
            if (!reviewData.comment) {
                alert('Please enter a comment');
                return;
            }
            
            // For demo purposes, we'll just add it to the UI
            // In a real app, you would send this to your API
            addReviewToUI(reviewData);
            
            // Reset form
            this.reset();
        });
    }
    
    // Initialize rating stars
    const ratingStars = document.querySelectorAll('.rating-star');
    
    if (ratingStars.length > 0) {
        ratingStars.forEach((star, index) => {
            star.addEventListener('click', function() {
                // Set rating value
                const ratingInput = document.querySelector('input[name="review-rating"]');
                if (ratingInput) {
                    ratingInput.value = index + 1;
                }
                
                // Update stars
                ratingStars.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
        });
    }
}

// Load reviews
function loadReviews(serviceId) {
    // For demo purposes, we'll use mock data
    // In a real app, you would fetch this from your API
    const reviewsData = getReviewsData(serviceId);
    
    const reviewsContainer = document.querySelector('.reviews-list');
    
    if (!reviewsContainer) return;
    
    // Clear reviews container
    reviewsContainer.innerHTML = '';
    
    // Add reviews to UI
    reviewsData.forEach(review => {
        addReviewToUI(review, false);
    });
}

// Get reviews data (mock data for demo)
function getReviewsData(serviceId) {
    // This would be fetched from your API in a real app
    return [
        {
            id: '201',
            serviceId: '1',
            userId: '301',
            userName: 'Michael Brown',
            userAvatar: '../assets/images/users/user-1.jpg',
            rating: 5,
            comment: 'Excellent service! John was very professional and fixed our leaking pipe quickly. Highly recommended!',
            date: '2023-06-15'
        },
        {
            id: '202',
            serviceId: '1',
            userId: '302',
            userName: 'Sarah Johnson',
            userAvatar: '../assets/images/users/user-2.jpg',
            rating: 4,
            comment: 'Good service overall. Arrived on time and did a good job fixing our bathroom sink. A bit pricey though.',
            date: '2023-05-22'
        },
        {
            id: '203',
            serviceId: '1',
            userId: '303',
            userName: 'David Wilson',
            userAvatar: '../assets/images/users/user-3.jpg',
            rating: 5,
            comment: 'John is a true professional. He installed our new water heater and explained everything clearly. Will definitely use his services again!',
            date: '2023-04-10'
        },
        {
            id: '204',
            serviceId: '2',
            userId: '304',
            userName: 'Emily Davis',
            userAvatar: '../assets/images/users/user-4.jpg',
            rating: 4,
            comment: 'Robert did a great job fixing our kitchen sink. He was knowledgeable and efficient. Would recommend.',
            date: '2023-06-05'
        },
        {
            id: '205',
            serviceId: '2',
            userId: '305',
            userName: 'James Miller',
            userAvatar: '../assets/images/users/user-5.jpg',
            rating: 3,
            comment: 'Service was okay. Fixed the issue but left a bit of a mess. Could improve on cleanliness.',
            date: '2023-05-18'
        }
    ].filter(review => review.serviceId === serviceId);
}

// Add review to UI
function addReviewToUI(reviewData, isNew = true) {
    const reviewsContainer = document.querySelector('.reviews-list');
    
    if (!reviewsContainer) return;
    
    // Create review element
    const reviewElement = document.createElement('div');
    reviewElement.className = 'review-item';
    
    if (isNew) {
        // For new reviews, use current user data
        // In a real app, you would get this from your auth system
        reviewData = {
            ...reviewData,
            userName: 'You',
            userAvatar: '../assets/images/users/user-default.jpg',
            date: new Date().toISOString().split('T')[0]
        };
        
        // Add new class for animation
        reviewElement.classList.add('new');
    }
    
    reviewElement.innerHTML = `
        <div class="review-header">
            <img src="${reviewData.userAvatar}" alt="${reviewData.userName}" class="review-avatar">
            <div class="review-meta">
                <h4 class="review-author">${reviewData.userName}</h4>
                <div class="review-date">${formatDate(reviewData.date)}</div>
            </div>
            <div class="review-rating">
                <div class="stars">
                    ${createStarRating(reviewData.rating)}
                </div>
            </div>
        </div>
        <div class="review-content">
            <p>${reviewData.comment}</p>
        </div>
    `;
    
    // Add to reviews container
    if (isNew) {
        // Add new review at the top
        reviewsContainer.insertBefore(reviewElement, reviewsContainer.firstChild);
    } else {
        // Add existing review at the end
        reviewsContainer.appendChild(reviewElement);
    }
}

// Initialize related services
function initRelatedServices() {
    const relatedServicesContainer = document.querySelector('.related-services');
    
    if (!relatedServicesContainer) return;
    
    // Initialize slider
    const prevButton = document.querySelector('.related-services-prev');
    const nextButton = document.querySelector('.related-services-next');
    
    if (prevButton && nextButton) {
        const serviceCards = relatedServicesContainer.querySelectorAll('.service-card');
        let currentIndex = 0;
        
        // Previous button click
        prevButton.addEventListener('click', function() {
            currentIndex = Math.max(currentIndex - 1, 0);
            updateSliderPosition();
        });
        
        // Next button click
        nextButton.addEventListener('click', function() {
            const maxIndex = serviceCards.length - getVisibleCards();
            currentIndex = Math.min(currentIndex + 1, maxIndex);
            updateSliderPosition();
        });
        
        // Update slider position
        function updateSliderPosition() {
            const cardWidth = serviceCards[0].offsetWidth + 20; // Card width + margin
            const translateX = -currentIndex * cardWidth;
            
            relatedServicesContainer.style.transform = `translateX(${translateX}px)`;
            
            // Update button states
            prevButton.disabled = currentIndex === 0;
            
            const maxIndex = serviceCards.length - getVisibleCards();
            nextButton.disabled = currentIndex >= maxIndex;
        }
        
        // Get number of visible cards based on viewport width
        function getVisibleCards() {
            const viewportWidth = window.innerWidth;
            
            if (viewportWidth >= 1200) {
                return 3; // Desktop
            } else if (viewportWidth >= 768) {
                return 2; // Tablet
            } else {
                return 1; // Mobile
            }
        }
        
        // Initialize slider position
        updateSliderPosition();
        
        // Update on window resize
        window.addEventListener('resize', updateSliderPosition);
    }
}

// Load related services
function loadRelatedServices(category, currentServiceId) {
    // For demo purposes, we'll use mock data
    // In a real app, you would fetch this from your API
    const relatedServices = getRelatedServices(category, currentServiceId);
    
    const relatedServicesContainer = document.querySelector('.related-services');
    
    if (!relatedServicesContainer) return;
    
    // Clear container
    relatedServicesContainer.innerHTML = '';
    
    // Add related services to UI
    relatedServices.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        
        serviceCard.innerHTML = `
            <div class="service-card-image">
                <img src="${service.image}" alt="${service.title}">
            </div>
            <div class="service-card-content">
                <h3 class="service-card-title">${service.title}</h3>
                <div class="service-card-rating">
                    <div class="stars">
                        ${createStarRating(service.rating)}
                    </div>
                    <span>${service.rating.toFixed(1)} (${service.reviews})</span>
                </div>
                <div class="service-card-price">$${service.price} / ${service.priceUnit}</div>
                <div class="service-card-provider">
                    <img src="${service.provider.avatar}" alt="${service.provider.name}">
                    <span>${service.provider.name}</span>
                </div>
                <a href="service-details.html?id=${service.id}" class="btn btn-primary btn-sm">View Details</a>
            </div>
        `;
        
        relatedServicesContainer.appendChild(serviceCard);
    });
}

// Get related services (mock data for demo)
function getRelatedServices(category, currentServiceId) {
    // This would be fetched from your API in a real app
    const allServices = [
        {
            id: '1',
            title: 'Professional Plumbing Services',
            category: 'plumbing',
            rating: 4.5,
            reviews: 32,
            price: 75,
            priceUnit: 'hour',
            provider: {
                id: '101',
                name: 'John Smith',
                avatar: '../assets/images/providers/provider-1.jpg'
            },
            image: '../assets/images/services/plumbing-1.jpg'
        },
        {
            id: '2',
            title: 'Residential Plumbing Repair',
            category: 'plumbing',
            rating: 4.2,
            reviews: 18,
            price: 65,
            priceUnit: 'hour',
            provider: {
                id: '102',
                name: 'Robert Johnson',
                avatar: '../assets/images/providers/provider-2.jpg'
            },
            image: '../assets/images/services/plumbing-2.jpg'
        },
        {
            id: '3',
            title: 'Emergency Plumbing Service',
            category: 'plumbing',
            rating: 4.7,
            reviews: 24,
            price: 95,
            priceUnit: 'hour',
            provider: {
                id: '103',
                name: 'Michael Williams',
                avatar: '../assets/images/providers/provider-3.jpg'
            },
            image: '../assets/images/services/plumbing-3.jpg'
        },
        {
            id: '4',
            title: 'Commercial Plumbing Solutions',
            category: 'plumbing',
            rating: 4.4,
            reviews: 15,
            price: 85,
            priceUnit: 'hour',
            provider: {
                id: '104',
                name: 'David Brown',
                avatar: '../assets/images/providers/provider-4.jpg'
            },
            image: '../assets/images/services/plumbing-4.jpg'
        },
        {
            id: '5',
            title: 'Electrical Installation',
            category: 'electrical',
            rating: 4.6,
            reviews: 29,
            price: 80,
            priceUnit: 'hour',
            provider: {
                id: '105',
                name: 'James Wilson',
                avatar: '../assets/images/providers/provider-5.jpg'
            },
            image: '../assets/images/services/electrical-1.jpg'
        }
    ];
    
    // Filter services by category and exclude current service
    return allServices.filter(service => service.category === category && service.id !== currentServiceId);
}

// Helper function to create star rating HTML
function createStarRating(rating) {
    let starsHtml = '';
    
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            // Full star
            starsHtml += '<i class="fas fa-star"></i>';
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            // Half star
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        } else {
            // Empty star
            starsHtml += '<i class="far fa-star"></i>';
        }
    }
    
    return starsHtml;
}

// Helper function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}