// Configuration file for API keys and other sensitive information
const CONFIG = {
    // Google API key for Maps and other Google services
    GOOGLE_API_KEY: 'AIzaSyDVMxyK1O5ejAGMX-qCbwww7JY2w47N1pE',
    
    // Method to safely get the Google API key
    getGoogleApiKey: function() {
        return this.GOOGLE_API_KEY;
    }
};

// Prevent modification of the CONFIG object
Object.freeze(CONFIG);