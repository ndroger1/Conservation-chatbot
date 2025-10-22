// AI Configuration for Changemaker Chatbot
// Using Hugging Face Inference API (Free)

class AIService {
    constructor() {
        // Use Hugging Face's free inference API
        this.apiEndpoint = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2';
        this.apiKey = this.loadApiKey();
        this.systemPrompt = this.getSystemPrompt();
    }

    loadApiKey() {
        // Check if API key is stored in localStorage
        const stored = localStorage.getItem('hf_api_key');
        return stored || null;
    }

    saveApiKey(key) {
        localStorage.setItem('hf_api_key', key);
        this.apiKey = key;
    }

    hasApiKey() {
        return this.apiKey !== null && this.apiKey.length > 0;
    }

    getSystemPrompt() {
        return `You are a helpful, encouraging assistant for students aged 14+ working on conservation projects.

Your role:
- Guide students through developing their changemaker plan
- Provide age-appropriate, science-based conservation information
- Ask thought-provoking questions to help them think deeper
- Encourage action and hope, not doom and gloom
- Keep responses concise (2-3 sentences max)
- Stay focused on conservation, environment, and sustainability
- Be supportive and non-judgmental

Important boundaries:
- Avoid controversial political topics
- Focus on local, achievable actions
- Don't complete assignments for students
- Ask guiding questions rather than giving direct answers
- Maintain an encouraging, positive tone

Topics you can discuss:
- Wildlife conservation and endangered species
- Climate change and renewable energy
- Ocean conservation and plastic pollution
- Sustainable living and waste reduction
- Local environmental action
- Conservation careers and education`;
    }

    async generateResponse(userMessage, conversationHistory, checkpoint) {
        if (!this.hasApiKey()) {
            return this.getNoKeyMessage();
        }

        try {
            // Build conversation context
            const contextPrompt = this.buildPrompt(userMessage, conversationHistory, checkpoint);

            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputs: contextPrompt,
                    parameters: {
                        max_new_tokens: 250,
                        temperature: 0.7,
                        top_p: 0.9,
                        return_full_text: false
                    }
                })
            });

            if (!response.ok) {
                const error = await response.text();
                console.error('API Error:', error);

                if (response.status === 401) {
                    return 'It looks like there\'s an issue with the API key. Please check that your Hugging Face API key is valid.';
                } else if (response.status === 503) {
                    return 'The AI model is currently loading (this can take 20-30 seconds on first use). Please try again in a moment!';
                }

                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            let aiResponse = '';

            if (Array.isArray(data) && data.length > 0) {
                aiResponse = data[0].generated_text || data[0].text || '';
            } else if (data.generated_text) {
                aiResponse = data.generated_text;
            } else if (typeof data === 'string') {
                aiResponse = data;
            }

            // Clean up response
            aiResponse = this.cleanResponse(aiResponse);

            // Ensure response is age-appropriate and on-topic
            if (this.isInappropriate(aiResponse)) {
                return 'Let\'s keep our focus on your conservation project. What aspect of your changemaker plan would you like to work on?';
            }

            return aiResponse || 'I\'m here to help with your changemaker plan. Could you tell me more about what you\'re thinking?';

        } catch (error) {
            console.error('AI Service Error:', error);
            return 'I\'m having trouble connecting right now. Let me help you with your changemaker plan using my built-in guidance. What would you like to work on?';
        }
    }

    buildPrompt(userMessage, conversationHistory, checkpoint) {
        const checkpointContext = this.getCheckpointContext(checkpoint);

        // Keep last 4 exchanges for context (to stay within token limits)
        const recentHistory = conversationHistory.slice(-8);

        let prompt = `${this.systemPrompt}\n\nCurrent Checkpoint: ${checkpointContext}\n\n`;

        // Add conversation history
        if (recentHistory.length > 0) {
            prompt += 'Recent conversation:\n';
            recentHistory.forEach(msg => {
                const role = msg.role === 'user' ? 'Student' : 'Assistant';
                prompt += `${role}: ${msg.content}\n`;
            });
        }

        prompt += `\nStudent: ${userMessage}\nAssistant:`;

        return prompt;
    }

    getCheckpointContext(checkpoint) {
        const contexts = {
            1: 'Students are identifying their passion and specific conservation issue',
            2: 'Students are researching their issue and developing their "Future Me" vision',
            3: 'Students are creating their action plan with specific steps',
            4: 'Students are preparing their final video presentation'
        };
        return contexts[checkpoint] || contexts[1];
    }

    cleanResponse(response) {
        // Remove any system prompt that leaked through
        response = response.replace(/You are a helpful.*?$/s, '');

        // Remove "Assistant:" prefix if present
        response = response.replace(/^(Assistant:|AI:|Bot:)\s*/i, '');

        // Trim whitespace
        response = response.trim();

        // Limit to reasonable length (avoid rambling)
        const sentences = response.split(/[.!?]+/);
        if (sentences.length > 4) {
            response = sentences.slice(0, 4).join('. ') + '.';
        }

        return response;
    }

    isInappropriate(response) {
        const lowerResponse = response.toLowerCase();

        // Check for off-topic content
        const inappropriateTopics = [
            'violence', 'weapon', 'harmful', 'illegal',
            'drugs', 'alcohol', 'explicit'
        ];

        return inappropriateTopics.some(topic => lowerResponse.includes(topic));
    }

    getNoKeyMessage() {
        return `🔑 <strong>AI Features Need Setup!</strong><br><br>
        To enable AI-powered conversations, you need a free Hugging Face API key.<br><br>
        <strong>Quick Setup (2 minutes):</strong><br>
        1. Go to <a href="https://huggingface.co/join" target="_blank">huggingface.co/join</a><br>
        2. Create a free account<br>
        3. Go to Settings → Access Tokens<br>
        4. Create a new token (read access is enough)<br>
        5. Click "Setup AI" below and paste your token<br><br>
        Don't worry - your key stays private in your browser! 🔒`;
    }

    // Fallback responses when AI is not available or for structured guidance
    getFallbackResponse(message, checkpoint) {
        const lowerMessage = message.toLowerCase();

        // Checkpoint-specific fallbacks
        if (checkpoint === 1) {
            if (lowerMessage.includes('help') || lowerMessage.includes('stuck')) {
                return 'Let\'s think about conservation issues you care about! Consider: What environmental problems have you noticed in your community? What news about nature makes you concerned? Start by exploring topics like wildlife, climate, oceans, or sustainability.';
            }
            return 'Great! Tell me more about what interests you in conservation. What specific issue would you like to focus on?';
        }

        if (checkpoint === 2) {
            if (lowerMessage.includes('research') || lowerMessage.includes('source')) {
                return 'For reliable research, try: National Geographic, NASA Climate Kids, NOAA, WWF, or your local conservation organizations. What aspect of your issue are you researching?';
            }
            return 'Excellent! Now imagine yourself in 5-10 years. What change have you helped create? How is the environment better because of your actions?';
        }

        if (checkpoint === 3) {
            return 'Let\'s build your action plan! What\'s one specific action you could take THIS WEEK to start making a difference? Think small and achievable to start.';
        }

        if (checkpoint === 4) {
            if (lowerMessage.includes('video') || lowerMessage.includes('adobe')) {
                return 'For your video structure: Start with a hook (grab attention), explain the problem (30-45 sec), share your vision (30-45 sec), describe your actions (45-60 sec), and end with a call to action. What part are you working on?';
            }
            return 'You\'re in the home stretch! Your video should inspire others to take action too. What message do you want viewers to remember?';
        }

        return 'That\'s an interesting thought! Tell me more about how this connects to your changemaker plan.';
    }
}

// Create global AI service instance
window.aiService = new AIService();
