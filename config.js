let config = {
    OPENROUTER_API_KEY: '', // Will be filled from server
    OPENROUTER_URL: 'https://api.openrouter.ai/api/v1/chat/completions',
    MODEL: 'google/gemini-flash-1.5-8b',
    SITE_URL: '', // Will be filled from server
    SITE_NAME: '' // Will be filled from server
};

export async function initConfig() {
    try {
        const response = await fetch('http://localhost:8000/config');
        if (!response.ok) {
            throw new Error('Failed to load configuration');
        }
        const serverConfig = await response.json();
        
        // Update config with server values
        config.OPENROUTER_API_KEY = serverConfig.OPENROUTER_API_KEY;
        config.SITE_URL = serverConfig.SITE_URL;
        config.SITE_NAME = serverConfig.SITE_NAME;
        
        return config;
    } catch (error) {
        console.error('Error loading configuration:', error);
        throw error;
    }
}

export { config };
