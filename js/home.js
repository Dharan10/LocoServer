// Home Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize featured services slider
    initFeaturedServicesSlider();
    
    // Initialize testimonials slider
    initTestimonialsSlider();
    
    // Initialize search form
    initSearchForm();
    
    // Initialize category buttons
    initCategoryButtons();
});

// Initialize featured services slider
function initFeaturedServicesSlider() {
    const featuredServices = document.querySelector('.featured-services-slider');
    
    if (!featuredServices) return;
    
    // For a real implementation, you would use a library like Swiper or Slick
    // This is a simple implementation for demo purposes
    const serviceCards = featuredServices.querySelectorAll('.service-card');
    const prevButton = document.querySelector('.featured-services-prev');
    const nextButton = document.querySelector('.featured-services-next');
    
    let currentIndex = 0;
    const cardWidth = serviceCards[0].offsetWidth + 20; // Card width + margin
    
    // Show initial cards
    updateSliderPosition();
    
    // Previous button click
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            currentIndex = Math.max(currentIndex - 1, 0);
            updateSliderPosition();
        });
    }
    
    // Next button click
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            const maxIndex = serviceCards.length - getVisibleCards();
            currentIndex = Math.min(currentIndex + 1, maxIndex);
            updateSliderPosition();
        });
    }
    
    // Update slider position
    function updateSliderPosition() {
        const translateX = -currentIndex * cardWidth;
        featuredServices.style.transform = `translateX(${translateX}px)`;
        
        // Update button states
        if (prevButton) {
            prevButton.disabled = currentIndex === 0;
        }
        
        if (nextButton) {
            const maxIndex = serviceCards.length - getVisibleCards();
            nextButton.disabled = currentIndex >= maxIndex;
        }
    }
    
    // Get number of visible cards based on viewport width
    function getVisibleCards() {
        const viewportWidth = window.innerWidth;
        
        if (viewportWidth >= 1200) {
            return 4; // Desktop
        } else if (viewportWidth >= 768) {
            return 3; // Tablet
        } else if (viewportWidth >= 576) {
            return 2; // Mobile landscape
        } else {
            return 1; // Mobile portrait
        }
    }
    
    // Update on window resize
    window.addEventListener('resize', function() {
        // Recalculate card width
        const newCardWidth = serviceCards[0].offsetWidth + 20;
        
        // Update current index if needed
        const maxIndex = serviceCards.length - getVisibleCards();
        currentIndex = Math.min(currentIndex, maxIndex);
        
        // Update slider position
        const translateX = -currentIndex * newCardWidth;
        featuredServices.style.transform = `translateX(${translateX}px)`;
    });
}

// Initialize testimonials slider
function initTestimonialsSlider() {
    const testimonialSlider = document.querySelector('.testimonials-slider');
    
    if (!testimonialSlider) return;
    
    const testimonials = testimonialSlider.querySelectorAll('.testimonial-card');
    const prevButton = document.querySelector('.testimonials-prev');
    const nextButton = document.querySelector('.testimonials-next');
    const indicators = document.querySelectorAll('.testimonial-indicator');
    
    let currentIndex = 0;
    
    // Show initial testimonial
    updateTestimonialSlider();
    
    // Previous button click
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            updateTestimonialSlider();
        });
    }
    
    // Next button click
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateTestimonialSlider();
        });
    }
    
    // Indicator clicks
    if (indicators.length > 0) {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                currentIndex = index;
                updateTestimonialSlider();
            });
        });
    }
    
    // Auto-advance testimonials
    let autoAdvance = setInterval(function() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateTestimonialSlider();
    }, 5000);
    
    // Pause auto-advance on hover
    testimonialSlider.addEventListener('mouseenter', function() {
        clearInterval(autoAdvance);
    });
    
    testimonialSlider.addEventListener('mouseleave', function() {
        autoAdvance = setInterval(function() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateTestimonialSlider();
        }, 5000);
    });
    
    // Update testimonial slider
    function updateTestimonialSlider() {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.style.opacity = 0;
            testimonial.style.transform = 'translateX(50px)';
            testimonial.style.display = 'none';
        });
        
        // Show current testimonial
        testimonials[currentIndex].style.display = 'block';
        setTimeout(() => {
            testimonials[currentIndex].style.opacity = 1;
            testimonials[currentIndex].style.transform = 'translateX(0)';
        }, 50);
        
        // Update indicators
        if (indicators.length > 0) {
            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
    }
}

// Initialize search form
function initSearchForm() {
    const searchForm = document.getElementById('home-search-form');
    
    if (!searchForm) return;
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const serviceType = document.getElementById('service-type').value;
        const location = document.getElementById('location').value;
        
        // Redirect to services page with search parameters
        let url = 'pages/services.html';
        const params = [];
        
        if (serviceType) {
            params.push(`q=${encodeURIComponent(serviceType)}`);
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

// Initialize category buttons
function initCategoryButtons() {
    const categoryButtons = document.querySelectorAll('.category-button');
    
    if (categoryButtons.length === 0) return;
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            window.location.href = `pages/services.html?category=${category}`;
        });
    });
}