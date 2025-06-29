# 🎨 Customization Guide - Rosenrausch 2.0

## 📝 Content Updates

### 1. Social Media Links (index.html)
```html
<!-- Update these links in index.html -->
<a href="YOUR_INSTAGRAM_URL" class="social-link instagram">
<a href="YOUR_TIKTOK_URL" class="social-link tiktok">
<a href="YOUR_SPOTIFY_URL" class="social-link spotify">
```

### 2. Team Members (js/team.js)
```javascript
// Replace teamData array with your team:
this.teamData = [
    {
        id: 1,
        name: "Your Name",
        role: "Your Role", 
        bio: "Your bio text...",
        image: "images/your-photo.jpg",
        category: "leadership", // or "team"
        social: {
            instagram: "your-instagram-url",
            tiktok: "your-tiktok-url"
        }
    }
    // Add more team members...
];
```

### 3. Events/Termine (js/events.js)
```javascript
// Update events in the eventsData array:
{
    id: 1,
    title: "Event Name",
    date: "2024-12-25",
    time: "20:00",
    location: "Event Location",
    description: "Event description...",
    ticketUrl: "ticket-link",
    category: "concert" // concert, livestream, collab
}
```

### 4. Minecraft Server Info (js/minecraft.js)
```javascript
// Update server information:
const serverInfo = {
    serverIP: "your-server.ip",
    serverPort: "25565",
    discordInvite: "your-discord-invite",
    // etc...
};
```

### 5. News (js/news-loader.js)
```javascript
// Update news items:
{
    id: 1,
    title: "News Title",
    content: "News content...",
    date: "2024-01-15",
    category: "music", // music, community, updates
    featured: true
}
```

## 🎨 Design Customization

### 1. Colors (css/main.css)
```css
:root {
    --primary-color: #A855F7;     /* Main purple */
    --secondary-color: #EC4899;   /* Pink accent */
    --accent-color: #7C3AED;      /* Dark purple */
    --text-color: #FFFFFF;        /* Text color */
    --bg-color: #0F0F23;          /* Background */
}
```

### 2. Fonts
```css
/* Change font family in css/main.css */
body {
    font-family: 'Your Font', 'Inter', sans-serif;
}
```

### 3. Animations
```css
/* Adjust animation speeds */
.fade-in {
    animation-duration: 0.8s; /* Change timing */
}
```

## 🖼️ Images & Assets

### 1. Profile Images
- **Main Profile**: `images/profile.svg` (400x400px recommended)
- **Team Images**: `images/team1.jpg`, `images/team2.jpg` etc.
- **Favicon**: `images/rosenrausch-performer.svg`

### 2. Image Guidelines
- **Format**: SVG (preferred), WebP, or JPG
- **Size**: Profile images 400x400px, team images 300x300px
- **Optimization**: Use tools like TinyPNG for compression

### 3. Adding New Images
1. Place images in `images/` folder
2. Update references in JavaScript files
3. Test loading on different devices

## 📱 Responsive Design

### 1. Breakpoints
```css
/* Mobile: < 768px */
/* Tablet: 768px - 1024px */  
/* Desktop: > 1024px */

@media (max-width: 768px) {
    /* Mobile styles */
}
```

### 2. Testing Responsiveness
- Use browser dev tools (F12)
- Test on actual devices
- Check landscape/portrait modes

## 🔧 Advanced Customization

### 1. Adding New Pages
1. Create new HTML file (e.g., `gallery.html`)
2. Copy structure from existing page
3. Add navigation links in all pages
4. Create corresponding CSS/JS files

### 2. New Components
```html
<!-- Example: Add new social link -->
<a href="YOUR_URL" class="social-link new-platform">
    <i class="fab fa-new-platform"></i>
    <span>New Platform</span>
</a>
```

```css
/* Style the new component */
.social-link.new-platform {
    background: linear-gradient(135deg, #COLOR1, #COLOR2);
}
```

### 3. Custom Animations
```css
@keyframes customAnimation {
    0% { transform: translateX(-20px); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
}

.custom-element {
    animation: customAnimation 0.6s ease-out;
}
```

## 📊 SEO Customization

### 1. Meta Tags
Update in each HTML file:
```html
<title>Your Custom Title</title>
<meta name="description" content="Your description">
<meta name="keywords" content="your, keywords">
```

### 2. Open Graph
```html
<meta property="og:title" content="Your Page Title">
<meta property="og:description" content="Your description">
<meta property="og:image" content="your-image-url">
```

### 3. Structured Data
Update JSON-LD in each page with your information.

## 🎵 Audio Integration

### 1. Background Music (Optional)
```javascript
// Add to main.js
const audio = new Audio('audio/background.mp3');
audio.loop = true;
audio.volume = 0.3;

// Play on user interaction
document.addEventListener('click', () => {
    audio.play();
}, { once: true });
```

### 2. Sound Effects
```javascript
// Button click sounds
const clickSound = new Audio('audio/click.mp3');
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => clickSound.play());
});
```

## 🔄 Dynamic Content

### 1. API Integration
```javascript
// Example: Load content from API
async function loadDynamicContent() {
    try {
        const response = await fetch('your-api-endpoint');
        const data = await response.json();
        // Update page content
    } catch (error) {
        console.error('Error loading content:', error);
    }
}
```

### 2. Local Storage
```javascript
// Save user preferences
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme');
```

## 🎯 Performance Tips

### 1. Image Optimization
- Use appropriate formats (WebP > JPG > PNG)
- Implement lazy loading
- Use CSS sprites for icons

### 2. Code Optimization
- Minify CSS/JS for production
- Combine files where possible
- Use async/defer for scripts

### 3. Caching
- Set appropriate cache headers
- Version assets (e.g., style.css?v=1.2)
- Use service workers for offline support

## 🐛 Troubleshooting

### Common Issues

**1. Styles not loading:**
- Check file paths (case-sensitive)
- Clear browser cache
- Validate CSS syntax

**2. JavaScript errors:**
- Open browser console (F12)
- Check for syntax errors
- Ensure DOM elements exist

**3. Images not displaying:**
- Verify file paths
- Check image formats
- Test file permissions

### Debug Mode
```javascript
// Add to top of main.js for debugging
const DEBUG = true;
function debugLog(message) {
    if (DEBUG) console.log('[DEBUG]', message);
}
```

## 📞 Getting Help

### Resources
- **CSS Grid/Flexbox**: [CSS-Tricks.com](https://css-tricks.com)
- **JavaScript**: [MDN Web Docs](https://developer.mozilla.org)
- **Icons**: [Font Awesome](https://fontawesome.com)
- **Colors**: [Coolors.co](https://coolors.co)

### Testing Tools
- **HTML Validator**: [validator.w3.org](https://validator.w3.org)
- **CSS Validator**: [jigsaw.w3.org/css-validator](https://jigsaw.w3.org/css-validator)
- **PageSpeed Insights**: [pagespeed.web.dev](https://pagespeed.web.dev)

---

**Happy Customizing! 🎨✨**
