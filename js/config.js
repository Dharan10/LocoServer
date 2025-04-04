// Configuration file for API keys and other sensitive information
const CONFIG = {
    // Google API key for Maps and other Google services
    GOOGLE_API_KEY: 'key-here',
    
    // Method to safely get the Google API key
    getGoogleApiKey: function() {
        return this.GOOGLE_API_KEY;
    }
};

// Prevent modification of the CONFIG object
Object.freeze(CONFIG);
