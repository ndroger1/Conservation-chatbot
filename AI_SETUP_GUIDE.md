# 🤖 AI Setup Guide

## Overview

The Changemaker Chatbot now includes **FREE AI-powered intelligence** using Hugging Face's Inference API!

### What This Adds:
- ✅ Real conversational AI for open-ended questions
- ✅ Personalized brainstorming and feedback
- ✅ Smart responses that adapt to student needs
- ✅ Conservation-focused guidance
- ✅ Age-appropriate (14+) content filtering

### What's Free:
- Hugging Face account (forever free)
- API access (generous free tier)
- No credit card required
- Unlimited basic usage

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Get Your Free API Key

1. Go to **[https://huggingface.co/join](https://huggingface.co/join)**
2. Sign up for a free account (use email or Google/GitHub)
3. Verify your email
4. Go to your profile → **Settings**
5. Click **Access Tokens** in the left sidebar
6. Click **New token**
7. Give it a name like "Changemaker Chatbot"
8. Set permissions to **Read** (default)
9. Click **Generate token**
10. **Copy the token** (starts with `hf_`)

### Step 2: Add Key to Chatbot

**For Students/Individual Use:**
1. Open the chatbot
2. Click **"Setup AI"** button in top right
3. Paste your API key
4. Click **Save Key**
5. Done! The status indicator will turn green

**For Teachers/Canvas:**
- Each student needs their own key (it's free!)
- Create a simple instruction page in Canvas
- Students follow Step 1-2 above
- Keys are stored locally in each student's browser

---

## 🔒 Privacy & Security

### Your API Key:
- ✅ Stored only in your browser (localStorage)
- ✅ Never sent to any server except Hugging Face
- ✅ Not shared with other users
- ✅ You can delete it anytime
- ✅ Only you have access to it

### Student Data:
- ✅ Conversations stay in the student's browser
- ✅ Nothing is saved on external servers
- ✅ No personal information collected
- ✅ FERPA compliant

---

## 🎯 How It Works

### Hybrid Intelligence System:

**Rule-Based (Always Works):**
- Checkpoint guidance
- Structured questions
- Progress tracking
- Resource links

**AI-Powered (When Key Added):**
- Open-ended questions
- Brainstorming help
- Feedback on ideas
- Personalized guidance
- Conservation Q&A

The chatbot automatically chooses the best approach!

---

## 💡 Example Conversations

### Without AI (Rule-Based):
```
Student: What conservation issue should I focus on?
Bot: Great question! Consider: wildlife protection, climate action,
     ocean conservation, or sustainable living. What interests you?
```

### With AI Enabled:
```
Student: I care about oceans but don't know where to start
Bot: That's wonderful! Oceans cover 70% of Earth and face challenges
     like plastic pollution, overfishing, and coral bleaching. What
     aspect resonates most with you - marine life, water quality,
     or coastal ecosystems? Let's explore what you could realistically
     impact in your community.
```

---

## 🐛 Troubleshooting

### "API Error 401"
- Your API key is invalid or expired
- Get a new key from Hugging Face
- Make sure you copied the entire key (starts with `hf_`)

### "Model is loading" (503 Error)
- The AI model wakes up on first use (takes 20-30 seconds)
- This is normal! Try again in 30 seconds
- After first use, responses are instant

### AI Responses Are Slow
- Free tier has rate limits (but they're generous)
- First message may take 20-30 seconds (model loading)
- Subsequent messages are faster (1-3 seconds)

### Can't Get API Key
- Make sure you verified your email
- Check spam folder for verification
- Try different browser
- Contact Hugging Face support if issues persist

### Status Stays Red
- Click "Setup AI" and check your key
- Try pasting the key again
- Check browser console (F12) for errors
- Make sure JavaScript is enabled

---

## 📊 Usage Limits (Free Tier)

Hugging Face free tier is generous:
- **Rate Limit:** ~30 requests per minute
- **No monthly cap** on basic usage
- **No credit card required**

For a classroom of 25 students:
- Each has their own key = 25x the limit
- More than enough for educational use!

---

## 🎓 For Teachers

### Setting Up for Your Class:

**Option 1: Student Setup (Recommended)**
1. Create a Canvas page with instructions
2. Students get their own free key (5 min)
3. Each student configures their own chatbot
4. Pro: Teaches digital literacy, no admin burden

**Option 2: Shared Key**
1. Teacher creates one Hugging Face account
2. Add key to chatbot code before deployment
3. All students use same key
4. Con: May hit rate limits with large classes

**Option 3: No AI**
- Chatbot works fine without AI!
- Uses rule-based responses only
- Still provides checkpoint guidance
- Good for younger students or limited tech

### Recommendation:
**Option 1** is best - students learn to use AI tools responsibly and each gets their own unlimited access.

---

## 🔧 Advanced: Customizing AI Behavior

The AI behavior is configured in `ai-config.js`:

### Change the AI Model:
```javascript
// Line 7 - Use different Hugging Face model
this.apiEndpoint = 'https://api-inference.huggingface.co/models/MODEL_NAME';

// Popular alternatives:
// 'google/flan-t5-xxl' - Good for instructions
// 'meta-llama/Llama-2-7b-chat-hf' - Conversational
// 'mistralai/Mistral-7B-Instruct-v0.2' - Current (best balance)
```

### Adjust Response Length:
```javascript
// Line 75 - Change max_new_tokens
max_new_tokens: 250,  // Lower = shorter, faster
```

### Make AI More/Less Creative:
```javascript
// Line 76-77
temperature: 0.7,  // Lower = more focused (0.3-0.5)
                   // Higher = more creative (0.8-1.0)
```

### Modify System Prompt:
Edit `getSystemPrompt()` method in `ai-config.js` to change:
- Tone and style
- Topics covered
- Response guidelines
- Age-appropriateness rules

---

## 📚 Additional Resources

- **Hugging Face Docs:** https://huggingface.co/docs/api-inference
- **Model Hub:** https://huggingface.co/models
- **Free Course:** https://huggingface.co/course
- **Community:** https://discuss.huggingface.co

---

## ❓ FAQ

**Q: Does this cost money?**
A: No! Hugging Face's free tier is sufficient for educational use.

**Q: Can I use Claude or ChatGPT instead?**
A: Yes, but they require paid API keys. Hugging Face is free.

**Q: Will students share inappropriate content?**
A: The AI has built-in content filtering and stays focused on conservation.

**Q: What if a student loses their key?**
A: They can generate a new one anytime. Old keys can be revoked.

**Q: Is this COPPA compliant?**
A: The chatbot is designed for ages 14+. For younger students, use without AI.

**Q: Can I see student conversations?**
A: No - conversations are private and stored only in student browsers.

---

## ✅ Setup Checklist

- [ ] Created Hugging Face account
- [ ] Generated API token
- [ ] Clicked "Setup AI" in chatbot
- [ ] Pasted API key
- [ ] Saw green status indicator
- [ ] Tested with a question
- [ ] Received AI response

**All set!** Your chatbot now has AI intelligence! 🎉

---

## 🤝 Need Help?

- Check browser console (F12) for error messages
- Review troubleshooting section above
- Test at https://huggingface.co/models to verify API key
- Contact your instructional technology team

---

*The AI integration is optional but recommended. The chatbot works great with or without it!*
