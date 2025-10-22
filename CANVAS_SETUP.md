# Canvas Integration Instructions

## How to Embed the Changemaker Chatbot in Canvas

### Option 1: Embed in a Canvas Page (Recommended)

1. **Upload Files to Web Hosting**
   - Upload `index.html` and `chatbot.js` to a web hosting service (GitHub Pages, Replit, Netlify, etc.)
   - Note the URL where your `index.html` is hosted (e.g., `https://yourusername.github.io/changemaker-chatbot/`)

2. **Create a Canvas Page**
   - Go to your Canvas course
   - Click on "Pages" in the left navigation
   - Click "+ Page" to create a new page
   - Name it "Changemaker Plan Assistant" or similar

3. **Add the Iframe Embed Code**
   - Switch to HTML Editor mode (click "</>" icon in toolbar)
   - Paste the following code:

```html
<iframe src="YOUR_HOSTED_URL_HERE"
        width="100%"
        height="800"
        style="border: none; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
</iframe>

<p style="margin-top: 20px; padding: 15px; background-color: #e8f5e9; border-left: 4px solid #4caf50; border-radius: 5px;">
  <strong>💡 About Your Changemaker Assistant:</strong><br>
  This chatbot will guide you through creating your changemaker plan over the 8-week course.
  Your progress is automatically saved in your browser, so you can come back anytime!
</p>
```

4. **Replace `YOUR_HOSTED_URL_HERE`** with your actual hosted URL

5. **Publish the Page**

### Option 2: Host on Canvas (Simple Method)

If you prefer not to use external hosting, you can use a simplified single-file version:

1. **Create a Canvas Page**
2. **Switch to HTML Editor**
3. **Copy the entire contents of the `canvas-embedded.html` file** (create this from combining index.html and chatbot.js)
4. **Paste and Publish**

Note: This method doesn't require external hosting but the page may load slightly slower.

### Option 3: As an External Tool (LTI)

For a more integrated experience, you can set up an LTI tool:
1. Host your chatbot on a server with HTTPS
2. Go to Course Settings → Apps → View App Configurations
3. Add a new External Tool
4. Enter your hosted URL

---

## Adding to Course Navigation

1. Go to Course Settings → Navigation
2. Find your embedded page or external tool
3. Drag it to the visible section
4. Save changes

---

## Linking in Assignments

You can reference the chatbot in assignment descriptions:

```html
<p>Use the <a href="/courses/YOUR_COURSE_ID/pages/changemaker-plan-assistant">Changemaker Plan Assistant</a> to help develop your submission for this checkpoint.</p>
```

---

## Privacy & Data Storage

**Important Notes:**
- Student progress is saved locally in their browser using `localStorage`
- No data is sent to external servers
- Students must use the same browser/device to maintain progress
- If students clear their browser data, progress will be lost
- For backup, students can copy/paste their conversation or take screenshots

---

## Recommended Course Structure

### Week 1-2: Checkpoint 1
- **Assignment:** "Identify Your Passion & Issue"
- **Instructions:** Use the Changemaker Assistant to explore conservation topics and identify a specific issue you care about. Submit a 1-paragraph description of your chosen issue and why it matters to you.

### Week 3-4: Checkpoint 2
- **Assignment:** "Research & Future Me Vision"
- **Instructions:** Research your issue using reliable sources (see chatbot for suggestions). Write your "Future Me" vision describing the impact you hope to make in 5-10 years. Include 2-3 cited sources.

### Week 5-6: Checkpoint 3
- **Assignment:** "Action Plan Development"
- **Instructions:** Create a detailed action plan with short-term, medium-term, and long-term goals. Include specific steps, resources needed, and potential partners. Submit a 1-2 page action plan document.

### Week 7-8: Checkpoint 4
- **Assignment:** "Final Video Submission"
- **Instructions:** Create a 2-3 minute video using Adobe Express that showcases your changemaker plan. Include your slide deck, narration or text overlays, and a call to action. Use the chatbot for video structure guidance.

---

## Troubleshooting

**Chatbot won't load:**
- Check that the iframe URL is correct and uses HTTPS
- Ensure pop-up blockers aren't interfering
- Try a different browser

**Progress not saving:**
- Verify students are using the same browser/device
- Check that browser localStorage is enabled
- Remind students not to use Incognito/Private mode

**Chatbot not responding:**
- Refresh the page
- Check browser console for errors (F12)
- Clear browser cache and reload

---

## Customization Options

You can customize the chatbot by editing `chatbot.js`:

- **Change checkpoint timing:** Modify the `currentCheckpoint` logic
- **Add custom questions:** Edit the `handleCheckpoint` methods
- **Change colors:** Update the CSS in `index.html`
- **Add more resources:** Expand the research tips section

---

## Support

For technical issues or questions about implementation, please contact your instructional technology team or refer to Canvas help documentation.
