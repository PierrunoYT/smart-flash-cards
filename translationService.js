import { config, initConfig } from './config.js';

export class TranslationService {
    static async ensureConfigInitialized() {
        if (!config.OPENROUTER_API_KEY) {
            await initConfig();
        }
    }

    static async translate(text, fromLang, toLang) {
        await this.ensureConfigInitialized();

        if (!config.OPENROUTER_API_KEY) {
            throw new Error('OpenRouter API key not configured');
        }

        const prompt = `Translate the following ${fromLang} text to ${toLang}. Respond with ONLY the translation, no additional text: "${text}"`;

        try {
            const response = await fetch(config.OPENROUTER_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${config.OPENROUTER_API_KEY}`,
                    'HTTP-Referer': config.SITE_URL,
                    'X-Title': config.SITE_NAME,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: config.MODEL,
                    messages: [
                        {
                            role: "user",
                            content: [
                                {
                                    type: "text",
                                    text: prompt
                                }
                            ]
                        }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error('Translation failed');
            }

            const data = await response.json();
            return data.choices[0].message.content.trim();
        } catch (error) {
            console.error('Translation error:', error);
            throw error;
        }
    }
}
