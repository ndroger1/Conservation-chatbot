# 🌱 Changemaker Plan Assistant

An AI-powered chatbot designed to guide students (ages 14+) through developing a conservation-focused "Changemaker Plan" over an 8-week course, culminating in a 2-3 minute Adobe Express video.

---

## 🎯 Overview

This chatbot helps students:
- **Identify** their passion and a specific conservation issue
- **Research** and develop a "Future Me" vision
- **Create** an actionable plan for making a difference
- **Produce** a compelling video showcasing their changemaker journey

### Key Features
✅ Age-appropriate (14+) with conservation focus
✅ Privacy-conscious (browser-based storage, no servers)
✅ Progressive learning over 4 checkpoints
✅ Supports Adobe Express video creation
✅ Easy Canvas LMS integration
✅ Science-based, non-controversial conservation guidance
✅ 24/7 availability for students

---

## 📋 Quick Start

### For Instructors

1. **Review the Proposal**
   - Read `FACULTY_PROPOSAL.md` for full project details and pedagogical benefits

2. **Test the Chatbot**
   - Open `index.html` in any web browser
   - Interact with the chatbot to see how it guides students
   - Progress through different checkpoints

3. **Set Up Canvas**
   - Follow instructions in `CANVAS_SETUP.md`
   - Choose your preferred embedding method (iframe recommended)

4. **Create Assignments**
   - Set up 4 checkpoint assignments in Canvas
   - Link to the embedded chatbot in assignment descriptions
   - Use provided rubrics and guidelines

### For Students

1. **Access the chatbot** through your Canvas course
2. **Follow the guided prompts** at each checkpoint
3. **Save your progress** automatically in your browser
4. **Complete assignments** at weeks 2, 4, 6, and 8
5. **Create your final video** using Adobe Express

---

## 📁 File Structure

```
changemaker-chatbot/
├── index.html              # Main chatbot interface
├── chatbot.js              # Chatbot logic and conversation flow
├── README.md               # This file
├── FACULTY_PROPOSAL.md     # Complete project proposal for faculty
└── CANVAS_SETUP.md         # Technical setup instructions for Canvas
```

---

## 🗓️ 8-Week Project Timeline

| Week | Checkpoint | Deliverable | Chatbot Support |
|------|------------|-------------|-----------------|
| 1-2 | **Checkpoint 1** | Issue identification (1 paragraph) | Helps explore topics, narrow focus |
| 3-4 | **Checkpoint 2** | "Future Me" vision + sources | Research guidance, vision prompts |
| 5-6 | **Checkpoint 3** | Action plan (1-2 pages) | Planning templates, goal-setting |
| 7-8 | **Checkpoint 4** | Final video (2-3 minutes) | Video structure, Adobe Express tips |

---

## 🎓 Learning Outcomes

Students will:
- ✓ Identify and research environmental issues using credible sources
- ✓ Develop critical thinking and systems thinking skills
- ✓ Create actionable plans with short, medium, and long-term goals
- ✓ Communicate effectively through digital media
- ✓ Build confidence as active changemakers
- ✓ Learn to use AI as a supportive learning tool

---

## 🛡️ Safety & Privacy Features

### Age-Appropriate Design (14+)
- Conservation-focused conversations only
- Avoids controversial political topics
- Encourages achievable, local actions
- Positive, solutions-oriented messaging
- No inappropriate content

### Privacy-First Approach
- **No server required** - runs entirely in browser
- **No data collection** - nothing sent to external servers
- **localStorage only** - progress saved locally
- **No personal information** - no names, emails, or sensitive data required
- **Student-controlled** - students can reset their own progress

### Bounded AI Interactions
- Stays focused on conservation and project development
- Cannot complete assignments for students
- Asks guiding questions rather than providing answers
- Encourages critical thinking and student agency

---

## 🔧 Technical Details

### Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for initial load only)
- Canvas LMS (for embedding)
- Adobe Express account (free for education)

### Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Storage
- Uses browser localStorage API
- ~2-5 MB storage per student
- Persists across browser sessions
- Cleared if student clears browser data

---

## 📝 Customization Options

You can customize the chatbot by editing `chatbot.js`:

### Adjust Checkpoint Requirements
```javascript
// Line ~30: Modify student data structure
this.studentData = {
    name: '',
    passion: '',
    issue: '',
    // Add or remove fields as needed
};
```

### Change Conversation Flow
```javascript
// Lines ~120-350: Edit checkpoint handlers
handleCheckpoint1(message, lowerMessage) {
    // Customize prompts and responses
}
```

### Modify Conservation Topics
```javascript
// Lines ~400-450: Update encouragement messages
getEncouragement(message) {
    // Add new topics or change existing ones
}
```

### Styling Changes
Edit `index.html` CSS section (lines 10-200) to change:
- Colors and theme
- Layout and spacing
- Font sizes and styles
- Animations and transitions

---

## 🚀 Deployment Options

### Option 1: GitHub Pages (Free & Easy)
1. Create a GitHub repository
2. Upload `index.html` and `chatbot.js`
3. Enable GitHub Pages in repository settings
4. Use the provided URL in Canvas

### Option 2: Netlify (Free & Fast)
1. Create Netlify account
2. Drag and drop files to Netlify
3. Get instant URL
4. Embed in Canvas

### Option 3: Canvas Direct Embed
1. Combine files into single HTML
2. Paste into Canvas page HTML editor
3. No external hosting needed

### Option 4: School Server
1. Upload to your school's web server
2. Ensure HTTPS is enabled
3. Provide URL to Canvas

See `CANVAS_SETUP.md` for detailed instructions.

---

## 🐛 Troubleshooting

### Chatbot Won't Load
- Check iframe URL is correct and uses HTTPS
- Disable pop-up blockers
- Try different browser
- Clear browser cache

### Progress Not Saving
- Verify localStorage is enabled in browser
- Don't use Incognito/Private mode
- Use same device/browser consistently
- Check browser storage isn't full

### Chatbot Not Responding
- Refresh the page
- Check browser console (F12) for errors
- Verify JavaScript is enabled
- Try a different browser

### Canvas Embedding Issues
- Ensure iframe permissions are correct
- Check Canvas allows external embeds
- Verify URL is accessible from Canvas
- Contact IT support if needed

---

## 📊 Assessment Guidance

### Suggested Grading Breakdown
- **Checkpoint 1:** 10% - Issue identification
- **Checkpoint 2:** 20% - Research & vision
- **Checkpoint 3:** 25% - Action plan
- **Checkpoint 4:** 45% - Final video

### Evaluation Criteria
✓ **Content:** Clear, well-researched, specific
✓ **Critical Thinking:** Demonstrates analysis and planning
✓ **Creativity:** Original ideas and presentation
✓ **Communication:** Clear, engaging, professional
✓ **Action Orientation:** Realistic, achievable plans

See `FACULTY_PROPOSAL.md` for detailed rubrics.

---

## 🌟 Success Stories & Use Cases

### Ideal For:
- Environmental science courses
- Conservation biology
- Sustainability studies
- Service learning programs
- Project-based learning initiatives
- 21st-century skills development

### Can Be Adapted For:
- Social justice projects
- Community service planning
- STEM innovation challenges
- Arts and activism courses
- Leadership development

---

## 🤝 Support & Contribution

### Getting Help
- Review `CANVAS_SETUP.md` for technical setup
- Read `FACULTY_PROPOSAL.md` for pedagogical questions
- Contact your instructional technology team
- Check browser console for error messages

### Feedback Welcome
This is a first-version prototype designed for educational use. Feedback on:
- Student engagement and outcomes
- Technical issues or bugs
- Suggested improvements
- Additional features needed

---

## 📄 License & Usage

This chatbot is designed for educational use. Feel free to:
- Use in your courses
- Modify for your needs
- Share with colleagues
- Adapt for different subjects

Please maintain:
- Age-appropriate content
- Privacy-first design
- Educational focus
- Attribution to source

---

## 🎉 Getting Started Checklist

- [ ] Read `FACULTY_PROPOSAL.md` thoroughly
- [ ] Test chatbot by opening `index.html` in browser
- [ ] Review `CANVAS_SETUP.md` for deployment options
- [ ] Choose hosting method (GitHub Pages recommended)
- [ ] Upload files and get hosted URL
- [ ] Create Canvas page with embedded chatbot
- [ ] Set up 4 checkpoint assignments with due dates
- [ ] Create announcement introducing project to students
- [ ] Test from student perspective
- [ ] Launch! 🚀

---

## 📞 Questions?

For technical implementation questions, refer to:
- `CANVAS_SETUP.md` - Setup and deployment
- `FACULTY_PROPOSAL.md` - Pedagogical approach and assessment

For Canvas-specific issues, contact your institution's instructional technology support team.

---

**Let's empower students to be the changemakers the world needs!** 🌍💚

---

*Version 1.0 - Designed for 8-week conservation courses with students ages 14+*
