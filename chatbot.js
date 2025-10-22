// Changemaker Chatbot - Conservation Focus, Age 14+ Appropriate
class ChangemakerChatbot {
    constructor() {
        this.currentCheckpoint = 1;
        this.conversationHistory = [];
        this.studentData = {
            name: '',
            passion: '',
            issue: '',
            futureVision: '',
            actionPlan: '',
            videoIdeas: []
        };

        this.init();
    }

    init() {
        this.loadProgress();
        this.setupEventListeners();
        this.updateCheckpointDisplay();
        this.sendBotMessage(this.getWelcomeMessage());
        this.showQuickActions();
    }

    loadProgress() {
        const saved = localStorage.getItem('changemakersProgress');
        if (saved) {
            const data = JSON.parse(saved);
            this.currentCheckpoint = data.checkpoint || 1;
            this.studentData = data.studentData || this.studentData;
            this.conversationHistory = data.history || [];
        }
    }

    saveProgress() {
        localStorage.setItem('changemakerProgress', JSON.stringify({
            checkpoint: this.currentCheckpoint,
            studentData: this.studentData,
            history: this.conversationHistory
        }));
    }

    setupEventListeners() {
        const sendBtn = document.getElementById('sendBtn');
        const userInput = document.getElementById('userInput');

        if (!sendBtn || !userInput) {
            console.error('Send button or input not found');
            return;
        }

        // Use arrow functions to preserve 'this' context
        sendBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.handleUserMessage();
        }, false);

        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.handleUserMessage();
            }
        }, false);

        // Also handle keydown as backup
        userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleUserMessage();
            }
        }, false);
    }

    handleUserMessage() {
        const input = document.getElementById('userInput');
        const sendBtn = document.getElementById('sendBtn');
        const message = input.value.trim();

        if (!message) {
            console.log('Empty message, not sending');
            return;
        }

        console.log('Sending message:', message);

        // Disable button to prevent double-sends
        if (sendBtn) {
            sendBtn.disabled = true;
        }

        this.sendUserMessage(message);
        input.value = '';

        // Show typing indicator
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.classList.add('active');
        }

        // Simulate AI response delay
        setTimeout(() => {
            if (typingIndicator) {
                typingIndicator.classList.remove('active');
            }
            this.processUserInput(message);

            // Re-enable button
            if (sendBtn) {
                sendBtn.disabled = false;
            }
        }, 1500);
    }

    sendUserMessage(message) {
        const messagesDiv = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.innerHTML = `<div class="message-content">${this.escapeHtml(message)}</div>`;
        messagesDiv.insertBefore(messageDiv, document.getElementById('typingIndicator'));
        messagesDiv.scrollTop = messagesDiv.scrollHeight;

        this.conversationHistory.push({ role: 'user', content: message });
        this.saveProgress();
    }

    sendBotMessage(message) {
        const messagesDiv = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot';
        messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
        messagesDiv.insertBefore(messageDiv, document.getElementById('typingIndicator'));
        messagesDiv.scrollTop = messagesDiv.scrollHeight;

        this.conversationHistory.push({ role: 'assistant', content: message });
        this.saveProgress();
    }

    processUserInput(message) {
        const lowerMessage = message.toLowerCase();

        // Extract student data based on checkpoint
        if (this.currentCheckpoint === 1) {
            this.handleCheckpoint1(message, lowerMessage);
        } else if (this.currentCheckpoint === 2) {
            this.handleCheckpoint2(message, lowerMessage);
        } else if (this.currentCheckpoint === 3) {
            this.handleCheckpoint3(message, lowerMessage);
        } else if (this.currentCheckpoint === 4) {
            this.handleCheckpoint4(message, lowerMessage);
        }
    }

    handleCheckpoint1(message, lowerMessage) {
        // Checkpoint 1: Identify Your Passion & Issue
        if (!this.studentData.name) {
            this.studentData.name = this.extractName(message);
            this.sendBotMessage(`Nice to meet you, ${this.studentData.name}! 🌟<br><br>Let's start thinking about what conservation issue matters most to you. This could be:<br><br>• Wildlife protection (endangered species, habitat loss)<br>• Climate action (renewable energy, reducing emissions)<br>• Ocean conservation (plastic pollution, coral reefs)<br>• Sustainable living (waste reduction, local food)<br>• Environmental education in your community<br><br>What gets you excited or concerned about our planet?`);
            this.showQuickActions();
        } else if (!this.studentData.passion) {
            this.studentData.passion = message;
            this.sendBotMessage(`That's a meaningful area to focus on! ${this.getEncouragement(lowerMessage)}<br><br>Now, let's narrow it down. Can you identify a specific problem or challenge within this area? Think about:<br><br>• What's happening in your local community?<br>• What have you observed or learned about?<br>• Why does this problem need attention?<br><br>Try to be as specific as possible!`);
        } else if (!this.studentData.issue) {
            this.studentData.issue = message;
            this.sendBotMessage(`Excellent! You've identified a clear issue: "${message}"<br><br>${this.getIssueGuidance(lowerMessage)}<br><br>✅ <strong>Checkpoint 1 Complete!</strong><br><br>You've successfully identified your passion and issue. Take some time to research this topic further, and when you're ready, come back to work on Checkpoint 2: Your Future Vision!<br><br>Would you like to move to Checkpoint 2 now, or would you like some research tips?`);
            this.showQuickActions();
        } else {
            this.handleGeneralQuestion(message, lowerMessage);
        }
    }

    handleCheckpoint2(message, lowerMessage) {
        // Checkpoint 2: Research & Future Me Vision
        if (lowerMessage.includes('research') || lowerMessage.includes('source')) {
            this.sendBotMessage(`Great question! Here are some reliable sources for conservation research:<br><br>📚 <strong>Youth-Friendly Resources:</strong><br>• National Geographic Kids<br>• NASA Climate Kids<br>• NOAA Ocean Explorer<br>• WWF (World Wildlife Fund) website<br>• Your local conservation organization<br>• Scientific American (accessible articles)<br><br>Remember to:<br>✓ Check multiple sources<br>✓ Look for recent data<br>✓ Cite your sources<br>✓ Focus on solutions, not just problems<br><br>What aspect of your issue would you like to research first?`);
        } else if (lowerMessage.includes('future me') || !this.studentData.futureVision) {
            if (!this.studentData.futureVision) {
                this.sendBotMessage(`Now for the exciting part - the "Future Me" challenge! 🚀<br><br>Imagine yourself 5-10 years from now. You've made real progress on ${this.studentData.issue}. Picture it clearly:<br><br>• What change have you created?<br>• How is the environment different because of your actions?<br>• How do you feel about what you've accomplished?<br>• Who has been inspired by your work?<br><br>Describe your "Future Me" in detail. Don't hold back - dream big!`);
            } else {
                this.studentData.futureVision = message;
                this.sendBotMessage(`Wow! That's an inspiring vision: "${message}"<br><br>I can see you've really thought about the impact you want to make. Your future self is someone who takes action! 💪<br><br>✅ <strong>Checkpoint 2 Complete!</strong><br><br>You now have:<br>• A clear issue to address<br>• A compelling vision of your future impact<br><br>Ready for Checkpoint 3 where we'll create your action plan?`);
                this.showQuickActions();
            }
        } else {
            this.handleGeneralQuestion(message, lowerMessage);
        }
    }

    handleCheckpoint3(message, lowerMessage) {
        // Checkpoint 3: Action Plan Development
        if (!this.studentData.actionPlan) {
            this.sendBotMessage(`Time to create your action plan! 📋<br><br>Let's break down how you'll work toward your vision. A good action plan includes:<br><br><strong>1. Short-term actions (next 2-4 weeks):</strong><br>What can you start doing right now?<br><br><strong>2. Medium-term goals (2-6 months):</strong><br>What projects or initiatives can you launch?<br><br><strong>3. Long-term vision (6 months - 2 years):</strong><br>What bigger changes do you hope to see?<br><br><strong>4. Resources you need:</strong><br>What help, tools, or support will you need?<br><br>Start by telling me: What's one action you could take THIS WEEK to begin making a difference?`);
        } else if (this.studentData.actionPlan.length < 200) {
            this.studentData.actionPlan += '\n' + message;
            this.sendBotMessage(`Great start! ${this.getActionValidation(message)}<br><br>Let's keep building your plan. What about:<br><br>• Who could you partner with? (friends, family, school, local organizations)<br>• What skills do you need to develop?<br>• How will you measure your progress?<br>• What obstacles might you face, and how will you overcome them?<br><br>Tell me more about your plan!`);
        } else {
            this.studentData.actionPlan += '\n' + message;
            this.sendBotMessage(`Excellent work! You've developed a comprehensive action plan! 🎯<br><br><strong>Your Plan Includes:</strong><br>• Immediate actions you can take<br>• Partners and resources<br>• Ways to measure success<br><br>✅ <strong>Checkpoint 3 Complete!</strong><br><br>You're now ready for the final checkpoint: creating your video! This is where you'll bring everything together to inspire others.<br><br>Ready to work on your video preparation?`);
            this.showQuickActions();
        }
    }

    handleCheckpoint4(message, lowerMessage) {
        // Checkpoint 4: Video Submission & Reflection
        if (lowerMessage.includes('video') || lowerMessage.includes('adobe')) {
            this.sendBotMessage(`Let's prepare for your 2-3 minute Adobe Express video! 🎥<br><br><strong>Your video should include:</strong><br><br>1️⃣ <strong>Hook (15-20 seconds)</strong><br>Start with something attention-grabbing about your issue<br><br>2️⃣ <strong>The Problem (30-45 seconds)</strong><br>Explain the conservation issue you're addressing<br><br>3️⃣ <strong>Your Vision (30-45 seconds)</strong><br>Share your "Future Me" and what you hope to achieve<br><br>4️⃣ <strong>Your Action Plan (45-60 seconds)</strong><br>Show what you're actually doing to make change<br><br>5️⃣ <strong>Call to Action (15-20 seconds)</strong><br>Inspire others to join you or take action<br><br><strong>Adobe Express Tips:</strong><br>• Use your slide deck as your foundation<br>• Add photos, videos, or graphics related to your issue<br>• Keep text on screen brief and readable<br>• Use transitions to keep it engaging<br>• Record clear narration or use text overlays<br>• Add background music (royalty-free)<br><br>What part of the video are you working on?`);
        } else if (lowerMessage.includes('slide') || lowerMessage.includes('deck')) {
            this.sendBotMessage(`Your slide deck is an important tool! 📊<br><br><strong>Recommended Slide Structure:</strong><br><br><strong>Slide 1:</strong> Title - Your name and changemaker focus<br><strong>Slide 2:</strong> The Issue - What problem are you addressing?<br><strong>Slide 3:</strong> Why It Matters - Impact and urgency<br><strong>Slide 4:</strong> Research & Facts - Data that supports your focus<br><strong>Slide 5:</strong> Your Future Vision - The "Future Me" description<br><strong>Slide 6:</strong> Action Plan - Your specific steps<br><strong>Slide 7:</strong> Progress/Evidence - What you've done so far<br><strong>Slide 8:</strong> Call to Action - How others can help<br><br><strong>Design Tips:</strong><br>• Use high-quality images (check Creative Commons)<br>• Keep text minimal (6 words per line, 6 lines max)<br>• Choose 2-3 colors that match your theme<br>• Make sure text contrasts with background<br>• Cite your sources on a final slide<br><br>Need help with any specific slide?`);
        } else if (lowerMessage.includes('complete') || lowerMessage.includes('done') || lowerMessage.includes('ready')) {
            this.sendBotMessage(`🎉 Congratulations! You've completed all four checkpoints!<br><br><strong>Your Changemaker Journey:</strong><br>✅ Identified your passion: ${this.studentData.passion || 'Conservation'}<br>✅ Defined your issue: ${this.studentData.issue || 'Your specific focus'}<br>✅ Envisioned your future impact<br>✅ Created an action plan<br>✅ Prepared your video materials<br><br>You're ready to submit your final video! Remember:<br><br>• Keep it 2-3 minutes<br>• Be authentic and passionate<br>• Show how you'll "be the change"<br>• Inspire others to act<br><br>You've done amazing work, ${this.studentData.name || 'changemaker'}! The world needs people like you who are willing to take action. 🌍💚<br><br>Good luck with your submission!`);
        } else {
            this.handleGeneralQuestion(message, lowerMessage);
        }
    }

    handleGeneralQuestion(message, lowerMessage) {
        // Handle common questions
        if (lowerMessage.includes('help') || lowerMessage.includes('stuck')) {
            this.sendBotMessage(`I'm here to help! 😊 Here's what we can work on based on where you are:<br><br>${this.getContextualHelp()}<br><br>What specific part would you like help with?`);
        } else if (lowerMessage.includes('checkpoint')) {
            const checkpointNum = this.extractCheckpointNumber(lowerMessage);
            if (checkpointNum && checkpointNum >= 1 && checkpointNum <= 4) {
                this.currentCheckpoint = checkpointNum;
                this.updateCheckpointDisplay();
                this.sendBotMessage(`Switching to Checkpoint ${checkpointNum}. ${this.getCheckpointDescription(checkpointNum)}`);
                this.showQuickActions();
            } else {
                this.sendBotMessage(this.getCheckpointOverview());
            }
        } else if (lowerMessage.includes('reset') || lowerMessage.includes('start over')) {
            if (confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
                localStorage.removeItem('changemakerProgress');
                location.reload();
            }
        } else {
            // Provide encouraging, age-appropriate response
            this.sendBotMessage(`That's an interesting thought! ${this.getContextualResponse(lowerMessage)}<br><br>${this.getContextualHelp()}<br><br>What would you like to focus on next?`);
        }
    }

    getWelcomeMessage() {
        if (this.studentData.name) {
            return `Welcome back, ${this.studentData.name}! 👋<br><br>Ready to continue working on your changemaker plan? You're currently on Checkpoint ${this.currentCheckpoint}.<br><br>What would you like to work on today?`;
        }
        return `Hello! I'm your Changemaker Plan Assistant! 🌱<br><br>I'm here to help you develop a plan to make a positive impact on conservation and our environment. Over the next 8 weeks, we'll work through 4 checkpoints together:<br><br><strong>Checkpoint 1:</strong> Identify your passion & issue<br><strong>Checkpoint 2:</strong> Research & create your "Future Me" vision<br><strong>Checkpoint 3:</strong> Develop your action plan<br><strong>Checkpoint 4:</strong> Create your video & reflect<br><br>Let's start! What's your name?`;
    }

    getCheckpointDescription(num) {
        const descriptions = {
            1: 'In this checkpoint, you'll identify what conservation issue you\'re passionate about and define the specific problem you want to address.',
            2: 'Now we\'ll do research and create your "Future Me" vision - imagining the positive impact you\'ll have made.',
            3: 'Time to create your action plan! We\'ll break down the steps you\'ll take to make your vision a reality.',
            4: 'The final checkpoint! Let\'s prepare your video content and bring your changemaker plan together.'
        };
        return descriptions[num] || 'Let\'s work on your changemaker plan!';
    }

    getCheckpointOverview() {
        return `Here's an overview of the 4 checkpoints:<br><br><strong>✓ Checkpoint 1 (Week 2):</strong> Identify Your Passion & Issue<br>What conservation topic matters to you? What specific problem will you address?<br><br><strong>✓ Checkpoint 2 (Week 4):</strong> Research & Future Me Vision<br>Learn about your issue and imagine your future impact.<br><br><strong>✓ Checkpoint 3 (Week 6):</strong> Action Plan Development<br>Create concrete steps you'll take to make change.<br><br><strong>✓ Checkpoint 4 (Week 8):</strong> Video Creation & Submission<br>Bring it all together in your final 2-3 minute video!<br><br>Which checkpoint would you like to work on?`;
    }

    getContextualHelp() {
        const helpMessages = {
            1: `<strong>Checkpoint 1 Help:</strong><br>• Think about environmental issues you've learned about<br>• Consider problems in your local community<br>• What makes you want to take action?`,
            2: `<strong>Checkpoint 2 Help:</strong><br>• Research reliable sources about your issue<br>• Imagine yourself making real progress<br>• Think about the positive change you want to create`,
            3: `<strong>Checkpoint 3 Help:</strong><br>• Break your goal into small, doable steps<br>• Think about who can support you<br>• Consider what resources you'll need`,
            4: `<strong>Checkpoint 4 Help:</strong><br>• Plan your video structure (intro, problem, vision, action, conclusion)<br>• Prepare your slide deck<br>• Practice your message`
        };
        return helpMessages[this.currentCheckpoint] || 'I\'m here to guide you through your changemaker journey!';
    }

    getEncouragement(message) {
        if (message.includes('climate') || message.includes('global warming')) {
            return 'Climate action is one of the most important challenges of our time. Every action counts!';
        } else if (message.includes('ocean') || message.includes('marine') || message.includes('plastic')) {
            return 'Ocean conservation is critical! Our oceans provide oxygen, regulate climate, and support incredible biodiversity.';
        } else if (message.includes('wildlife') || message.includes('animals') || message.includes('endangered')) {
            return 'Wildlife protection is essential for maintaining healthy ecosystems. Every species plays an important role!';
        } else if (message.includes('forest') || message.includes('tree') || message.includes('deforestation')) {
            return 'Forests are the lungs of our planet! Protecting and restoring forests helps combat climate change and protects biodiversity.';
        } else if (message.includes('water') || message.includes('river') || message.includes('pollution')) {
            return 'Clean water is essential for all life. Water conservation and protection impacts entire communities!';
        } else if (message.includes('energy') || message.includes('renewable') || message.includes('solar')) {
            return 'Renewable energy is key to a sustainable future. Great choice for making a real impact!';
        } else if (message.includes('waste') || message.includes('recycle') || message.includes('reduce')) {
            return 'Reducing waste and promoting circular economy principles can transform how we use resources!';
        }
        return 'That\'s a meaningful area to focus on!';
    }

    getIssueGuidance(message) {
        if (message.includes('plastic')) {
            return 'Plastic pollution is a major issue. Consider focusing on: reducing single-use plastics in your school/community, organizing cleanups, or educating others about alternatives.';
        } else if (message.includes('energy') || message.includes('electricity')) {
            return 'Energy conservation makes a big difference! Consider: promoting energy efficiency, advocating for renewable energy in your school, or helping your community reduce consumption.';
        } else if (message.includes('food') || message.includes('waste')) {
            return 'Food waste and sustainable food systems are critical. Consider: reducing food waste in your cafeteria, starting a compost program, or promoting local food sources.';
        } else if (message.includes('education') || message.includes('awareness')) {
            return 'Education is powerful! Consider: creating educational materials, teaching younger students, or using social media to spread awareness in age-appropriate ways.';
        }
        return 'Remember to focus on actions you can realistically take in your school, home, or local community. Small, consistent actions add up to big change!';
    }

    getActionValidation(message) {
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('school') || lowerMessage.includes('class')) {
            return 'Working through your school is a great way to reach many people!';
        } else if (lowerMessage.includes('family') || lowerMessage.includes('home')) {
            return 'Starting at home is practical and sets a great example!';
        } else if (lowerMessage.includes('community') || lowerMessage.includes('local')) {
            return 'Local community action creates visible, lasting change!';
        } else if (lowerMessage.includes('social media') || lowerMessage.includes('online')) {
            return 'Digital awareness is powerful, but remember to always be safe online and follow your school/parent guidelines!';
        }
        return 'That sounds like a practical first step!';
    }

    getContextualResponse(message) {
        // Provide age-appropriate, conservation-focused responses
        const responses = [
            'Every changemaker starts with curiosity and concern for the environment.',
            'Your commitment to conservation can inspire others in your community.',
            'Remember, even small actions can create ripples of positive change.',
            'The best conservation plans are specific, realistic, and personally meaningful.',
            'Being a changemaker means being persistent and believing in your vision.',
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    extractName(message) {
        // Simple name extraction
        const words = message.split(' ');
        // Look for capitalized words that might be names
        for (let word of words) {
            if (word.length > 1 && word[0] === word[0].toUpperCase()) {
                return word;
            }
        }
        // If no capitalized word found, use first word
        return words[0];
    }

    extractCheckpointNumber(message) {
        const match = message.match(/\d/);
        return match ? parseInt(match[0]) : null;
    }

    updateCheckpointDisplay() {
        document.querySelectorAll('.checkpoint').forEach((el, index) => {
            const checkpointNum = index + 1;
            el.classList.remove('active', 'completed');

            if (checkpointNum < this.currentCheckpoint) {
                el.classList.add('completed');
            } else if (checkpointNum === this.currentCheckpoint) {
                el.classList.add('active');
            }
        });
    }

    showQuickActions() {
        const actionsDiv = document.getElementById('quickActions');
        actionsDiv.innerHTML = '';

        let actions = [];

        if (this.currentCheckpoint === 1) {
            actions = ['💡 Give me examples', '🤔 I need help choosing', '➡️ Next checkpoint'];
        } else if (this.currentCheckpoint === 2) {
            actions = ['📚 Research tips', '🔮 Future Me help', '➡️ Next checkpoint'];
        } else if (this.currentCheckpoint === 3) {
            actions = ['📋 Action plan template', '🎯 Set goals', '➡️ Next checkpoint'];
        } else if (this.currentCheckpoint === 4) {
            actions = ['🎥 Video tips', '📊 Slide deck help', '✅ Mark complete'];
        }

        actions.forEach(action => {
            const btn = document.createElement('button');
            btn.className = 'quick-action-btn';
            btn.textContent = action;
            btn.onclick = () => {
                document.getElementById('userInput').value = action.substring(action.indexOf(' ') + 1);
                this.handleUserMessage();
            };
            actionsDiv.appendChild(btn);
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ChangemakerChatbot();
});
