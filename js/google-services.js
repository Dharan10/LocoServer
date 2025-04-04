// Google Services utility functions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Google Maps when the page loads (if map container exists)
    const mapContainer = document.getElementById('map-container');
    if (mapContainer) {
        initMap();
    }
    
    // Initialize autocomplete for address inputs
    initAutocomplete();
});

// Initialize Google Maps
function initMap() {
    const mapContainer = document.getElementById('map-container');
    if (!mapContainer) return;
    
    // Default location (can be changed as needed)
    const defaultLocation = { lat: 40.7128, lng: -74.0060 }; // New York
    
    // Create the map
    const map = new google.maps.Map(mapContainer, {
        center: defaultLocation,
        zoom: 12,
        styles: [
            // You can add custom map styles here
        ]
    });
    
    // Add a marker at the default location
    const marker = new google.maps.Marker({
        position: defaultLocation,
        map: map,
        title: 'Your Location'
    });
    
    // You can add more map functionality here
}

// Initialize Google Places Autocomplete for address inputs
function initAutocomplete() {
    const addressInputs = document.querySelectorAll('.address-autocomplete');
    
    addressInputs.forEach(input => {
        const autocomplete = new google.maps.places.Autocomplete(input, {
            types: ['address'],
            componentRestrictions: { country: 'us' } // Restrict to US addresses (change as needed)
        });
        
        // When a place is selected
        autocomplete.addListener('place_changed', function() {
            const place = autocomplete.getPlace();
            
            // You can extract address components here if needed
            if (place.geometry) {
                // Get latitude and longitude
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                
                // You can store these values in hidden inputs or use them as needed
                const latInput = input.parentNode.querySelector('.lat-input');
                const lngInput = input.parentNode.querySelector('.lng-input');
                
                if (latInput) latInput.value = lat;
                if (lngInput) lngInput.value = lng;
            }
        });
    });
}