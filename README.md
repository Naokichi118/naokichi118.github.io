# Nao Mochizuki's Homepage

Personal portfolio website for Nao Mochizuki (望月 尚), Ph.D. Student at the Graduate School of Mathematics, Nagoya University.

## Features

- 🌐 Bilingual support (English/日本語)
- 📱 Responsive design for mobile and desktop
- 🎨 Clean, professional academic styling
- 💾 Language preference saved locally

## Website Structure

- `index.html` - Main homepage with content structure
- `styles.css` - All styling and responsive design
- `script.js` - Language switching functionality

## How to Update Content

### Updating Personal Information

Edit `index.html` and find the relevant section:

**About Section:**
```html
<section id="about" class="section">
    <!-- Update the text inside <p lang="en"> for English -->
    <!-- Update the text inside <p lang="ja"> for Japanese -->
</section>
```

**Research Interests:**
```html
<section id="research" class="section">
    <ul>
        <li>
            <span lang="en">English text</span>
            <span lang="ja">日本語テキスト</span>
        </li>
    </ul>
</section>
```

### Adding a New Publication

In `index.html`, find the publications section and add a new `<li>` item:

```html
<ol class="publications-list">
    <li>
        <div class="pub-title">Your Publication Title Here</div>
    </li>
    <!-- Add more publications here -->
</ol>
```

Publications are automatically numbered in order.

### Updating Contact Information

In `index.html`, find the contact section:

```html
<section id="contact" class="section">
    <!-- Update or add links here -->
</section>
```

## Customizing Design

### Changing Colors

Edit `styles.css` and modify the CSS variables at the top:

```css
:root {
    --primary-color: #2c3e50;      /* Header background */
    --secondary-color: #34495e;    /* Footer background */
    --accent-color: #3498db;       /* Links and highlights */
    /* ... */
}
```

### Changing Fonts

Modify the `font-family` in `styles.css`:

```css
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', ...;
}
```

## Language Switching

The website automatically remembers the user's language preference using browser local storage. Click the language toggle button in the header to switch between English and Japanese.

**How it works:**
- Each content element has `lang="en"` or `lang="ja"` attributes
- JavaScript toggles the `data-lang` attribute on the `<body>` tag
- CSS shows/hides content based on the current language

## Hosting on GitHub Pages

This site is configured to be hosted on GitHub Pages at:
`https://Naokichi118.github.io/nao-mochizuki.github.io`

To enable GitHub Pages:
1. Go to repository Settings
2. Navigate to Pages section
3. Select the main branch as source
4. Your site will be published automatically

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design adapts to screen sizes

## License

© Nao Mochizuki | 望月 尚