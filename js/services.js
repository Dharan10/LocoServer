// Services JavaScript

// DOM Elements
const servicesGrid = document.getElementById('services-grid');
const filterForm = document.getElementById('filter-form');
const sortSelect = document.getElementById('sort-by');
const viewButtons = document.querySelectorAll('.view-btn');
const searchForm = document.getElementById('services-search-form');
const resultsTitle = document.getElementById('results-title');
const resultsCount = document.getElementById('results-count');

// Services data (mock data for demo)
const servicesData = [
    {
        id: 1,
        title: 'Professional Plumbing Services',
        category: 'plumbing',
        rating: 4.5,
        reviews: 32,
        price: 75,
        priceUnit: 'hour',
        provider: {
            id: 101,
            name: 'John Smith',
            avatar: '../assets/images/providers/provider-1.jpg'
        },
        image: '../assets/images/services/plumbing-1.jpg',
        location: 'New York, NY',
        availability: ['weekdays', 'emergency'],
        featured: true,
        description: 'Expert plumbing services for residential and commercial properties. Available for emergency calls.'
    },
    {
        id: 2,
        title: 'Residential Plumbing Repair',
        category: 'plumbing',
        rating: 4.2,
        reviews: 18,
        price: 65,
        priceUnit: 'hour',
        provider: {
            id: 102,
            name: 'Robert Johnson',
            avatar: '../assets/images/providers/provider-2.jpg'
        },
        image: '../assets/images/services/plumbing-2.jpg',
        location: 'Brooklyn, NY',
        availability: ['weekdays', 'weekends'],
        featured: false,
        description: 'Specialized in residential plumbing repairs, installations, and maintenance.'
    },
    {
        id: 3,
        title: 'Emergency Plumbing Services',
        category: 'plumbing',
        rating: 4.8,
        reviews: 45,
        price: 90,
        priceUnit: 'hour',
        provider: {
            id: 103,
            name: 'Michael Brown',
            avatar: '../assets/images/providers/provider-3.jpg'
        },
        image: '../assets/images/services/plumbing-3.jpg',
        location: 'Queens, NY',
        availability: ['weekdays', 'weekends', 'emergency', 'evenings'],
        featured: true,
        description: '24/7 emergency plumbing services. Fast response time and professional solutions.'
    },
    {
        id: 4,
        title: 'Commercial Plumbing Solutions',
        category: 'plumbing',
        rating: 4.6,
        reviews: 27,
        price: 85,
        priceUnit: 'hour',
        provider: {
            id: 104,
            name: 'David Wilson',
            avatar: '../assets/images/providers/provider-4.jpg'
        },
        image: '../assets/images/services/plumbing-4.jpg',
        location: 'Manhattan, NY',
        availability: ['weekdays'],
        featured: false,
        description: 'Specialized in commercial plumbing systems, maintenance, and repairs.'
    },
    {
        id: 5,
        title: 'Electrical Installation & Repair',
        category: 'electrical',
        rating: 5.0,
        reviews: 28,
        price: 85,
        priceUnit: 'hour',
        provider: {
            id: 105,
            name: 'Lisa Chen',
            avatar: '../assets/images/providers/provider-5.jpg'
        },
        image: '../assets/images/services/electrical-1.jpg',
        location: 'New York, NY',
        availability: ['weekdays', 'weekends'],
        featured: true,
        description: 'Licensed electrician providing installation and repair services for residential and commercial properties.'
    },
    {
        id: 6,
        title: 'Residential Electrical Services',
        category: 'electrical',
        rating: 4.7,
        reviews: 22,
        price: 80,
        priceUnit: 'hour',
        provider: {
            id: 106,
            name: 'James Taylor',
            avatar: '../assets/images/providers/provider-6.jpg'
        },
        image: '../assets/images/services/electrical-2.jpg',
        location: 'Brooklyn, NY',
        availability: ['weekdays', 'evenings'],
        featured: false,
        description: 'Residential electrical services including wiring, lighting, and panel upgrades.'
    },
    {
        id: 7,
        title: 'Commercial Electrical Contractor',
        category: 'electrical',
        rating: 4.9,
        reviews: 36,
        price: 95,
        priceUnit: 'hour',
        provider: {
            id: 107,
            name: 'Sarah Miller',
            avatar: '../assets/images/providers/provider-7.jpg'
        },
        image: '../assets/images/services/electrical-3.jpg',
        location: 'Manhattan, NY',
        availability: ['weekdays'],
        featured: true,
        description: 'Commercial electrical contractor specializing in office buildings, retail spaces, and industrial facilities.'
    },
    {
        id: 8,
        title: 'Emergency Electrical Services',
        category: 'electrical',
        rating: 4.8,
        reviews: 19,
        price: 100,
        priceUnit: 'hour',
        provider: {
            id: 108,
            name: 'Thomas Lee',
            avatar: '../assets/images/providers/provider-8.jpg'
        },
        image: '../assets/images/services/electrical-4.jpg',
        location: 'Queens, NY',
        availability: ['weekdays', 'weekends', 'emergency', 'evenings'],
        featured: false,
        description: '24/7 emergency electrical services. Fast response for power outages and electrical emergencies.'
    },
    {
        id: 9,
        title: 'Custom Carpentry & Woodworking',
        category: 'carpentry',
        rating: 4.0,
        reviews: 15,
        price: 70,
        priceUnit: 'hour',
        provider: {
            id: 109,
            name: 'Mike Johnson',
            avatar: '../assets/images/providers/provider-9.jpg'
        },
        image: '../assets/images/services/carpentry-1.jpg',
        location: 'Brooklyn, NY',
        availability: ['weekdays', 'weekends'],
        featured: true,
        description: 'Custom carpentry and woodworking services. Specializing in furniture, cabinets, and custom built-ins.'
    }
];

// Initialize services page
document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    const searchQuery = urlParams.get('q');
    const locationParam = urlParams.get('location');
    
    // Filter services based on URL parameters
    let filteredServices = [...servicesData];
    
    if (categoryParam) {
        filteredServices = filteredServices.filter(service => service.category === categoryParam);
        // Update category checkboxes
        const categoryCheckbox = document.getElementById(`category-${categoryParam}`);
        if (categoryCheckbox) {
            categoryCheckbox.checked = true;
        }
        
        // Update results title
        resultsTitle.textContent = `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} Services`;
    }
    
    if (searchQuery) {
        filteredServices = filteredServices.filter(service => 
            service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        // Update search input
        const searchInput = document.getElementById('search-query');
        if (searchInput) {
            searchInput.value = searchQuery;
        }
        
        // Update results title
        resultsTitle.textContent = `Search Results for "${searchQuery}"`;
    }
    
    if (locationParam) {
        filteredServices = filteredServices.filter(service => 
            service.location.toLowerCase().includes(locationParam.toLowerCase())
        );
        
        // Update location input
        const locationInput = document.getElementById('search-location');
        if (locationInput) {
            locationInput.value = locationParam;
        }
    }
    
    // Update results count
    if (resultsCount) {
        resultsCount.textContent = filteredServices.length;
    }
    
    // Render services
    renderServices(filteredServices);
    
    // Initialize event listeners
    initEventListeners();
    
    // Initialize price range slider
    initPriceRangeSlider();
});

// Render services to the grid
function renderServices(services) {
    if (!servicesGrid) return;
    
    // Clear existing services
    servicesGrid.innerHTML = '';
    
    if (services.length === 0) {
        servicesGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No services found</h3>
                <p>Try adjusting your search criteria or browse all services.</p>
                <a href="services.html" class="btn btn-primary">View All Services</a>
            </div>
        `;
        return;
    }
    
    // Render each service
    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        
        serviceCard.innerHTML = `
            <div class="service-image">
                <img src="${service.image}" alt="${service.title}">
            </div>
            <div class="service-content">
                <div class="service-category">${service.category.charAt(0).toUpperCase() + service.category.slice(1)}</div>
                <h3><a href="service-details.html?id=${service.id}">${service.title}</a></h3>
                <div class="service-rating">
                    <div class="stars">
                        ${createStarRating(service.rating)}
                    </div>
                    <span>${service.rating.toFixed(1)} (${service.reviews} reviews)</span>
                </div>
                <div class="service-provider">
                    <img src="${service.provider.avatar}" alt="${service.provider.name}">
                    <span>${service.provider.name}</span>
                </div>
                <div class="service-price">$${service.price} / ${service.priceUnit}</div>
            </div>
        `;
        
        servicesGrid.appendChild(serviceCard);
    });
}

// Initialize event listeners
function initEventListeners() {
    // Filter form
    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get filter values
            const categories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(input => input.value);
            const minPrice = parseInt(document.getElementById('min-price').value);
            const maxPrice = parseInt(document.getElementById('max-price').value);
            const rating = parseInt(document.querySelector('input[name="rating"]:checked').value);
            const availability = Array.from(document.querySelectorAll('input[name="availability"]:checked')).map(input => input.value);
            
            // Filter services
            let filteredServices = [...servicesData];
            
            if (categories.length > 0) {
                filteredServices = filteredServices.filter(service => categories.includes(service.category));
            }
            
            filteredServices = filteredServices.filter(service => service.price >= minPrice && service.price <= maxPrice);
            
            if (rating > 0) {
                filteredServices = filteredServices.filter(service => service.rating >= rating);
            }
            
            if (availability.length > 0) {
                filteredServices = filteredServices.filter(service => 
                    availability.some(avail => service.availability.includes(avail))
                );
            }
            
            // Update results count
            if (resultsCount) {
                resultsCount.textContent = filteredServices.length;
            }
            
            // Render filtered services
            renderServices(filteredServices);
        });
    }
    
    // Sort select
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            let services = Array.from(servicesGrid.querySelectorAll('.service-card'));
            
            // Sort services
            services.sort((a, b) => {
                const aRating = parseFloat(a.querySelector('.service-rating span').textContent.split(' ')[0]);
                const bRating = parseFloat(b.querySelector('.service-rating span').textContent.split(' ')[0]);
                const aPrice = parseFloat(a.querySelector('.service-price').textContent.replace('$', '').split(' ')[0]);
                const bPrice = parseFloat(b.querySelector('.service-price').textContent.replace('$', '').split(' ')[0]);
                
                switch (sortValue) {
                    case 'rating-high':
                        return bRating - aRating;
                    case 'price-low':
                        return aPrice - bPrice;
                    case 'price-high':
                        return bPrice - aPrice;
                    default:
                        return 0;
                }
            });
            
            // Re-append sorted services
            services.forEach(service => {
                servicesGrid.appendChild(service);
            });
        });
    }
    
    // View toggle
    if (viewButtons.length > 0) {
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const viewType = this.dataset.view;
                
                // Remove active class from all buttons
                viewButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Toggle grid/list view
                if (servicesGrid) {
                    if (viewType === 'grid') {
                        servicesGrid.classList.remove('services-list');
                        servicesGrid.classList.add('services-grid');
                    } else {
                        servicesGrid.classList.remove('services-grid');
                        servicesGrid.classList.add('services-list');
                    }
                }
            });
        });
    }
    
    // Search form
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const query = document.getElementById('search-query').value;
            const location = document.getElementById('search-location').value;
            
            // Redirect to services page with search parameters
            let url = 'services.html';
            const params = [];
            
            if (query) {
                params.push(`q=${encodeURIComponent(query)}`);
            }
            
            if (location) {
                params.push(`location=${encodeURIComponent(location)}`);
            }
            
            if (params.length > 0) {
                url += `?${params.join('&')}`;
            }
            
            window.location.href = url;
        });
    }
}

// Initialize price range slider
function initPriceRangeSlider() {
    const minSlider = document.getElementById('price-range-min');
    const maxSlider = document.getElementById('price-range-max');
    const minInput = document.getElementById('min-price');
    const maxInput = document.getElementById('max-price');
    
    if (!minSlider || !maxSlider || !minInput || !maxInput) return;
    
    // Update input when slider changes
    minSlider.addEventListener('input', function() {
        const minVal = parseInt(minSlider.value);
        const maxVal = parseInt(maxSlider.value);
        
        if (minVal > maxVal) {
            minSlider.value = maxVal;
            minInput.value = maxVal;
        } else {
            minInput.value = minVal;
        }
    });
    
    maxSlider.addEventListener('input', function() {
        const minVal = parseInt(minSlider.value);
        const maxVal = parseInt(maxSlider.value);
        
        if (maxVal < minVal) {
            maxSlider.value = minVal;
            maxInput.value = minVal;
        } else {
            maxInput.value = maxVal;
        }
    });
    
    // Update slider when input changes
    minInput.addEventListener('input', function() {
        const minVal = parseInt(minInput.value);
        const maxVal = parseInt(maxInput.value);
        
        if (minVal > maxVal) {
            minInput.value = maxVal;
            minSlider.value = maxVal;
        } else {
            minSlider.value = minVal;
        }
    });
    
    maxInput.addEventListener('input', function() {
        const minVal = parseInt(minInput.value);
        const maxVal = parseInt(maxInput.value);
        
        if (maxVal < minVal) {
            maxInput.value = minVal;
            maxSlider.value = minVal;
        } else {
            maxSlider.value = maxVal;
        }
    });
}

// Helper function to create star rating HTML
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