# Rosenrausch 2.0 - Modern Website

Ein modernes, TikTok-inspiriertes Redesign der Rosenrausch Website mit verbesserter Konsistenz und responsivem Design.

## 🚀 Features

- **Modern Design**: TikTok-inspirierte Ästhetik mit Glassmorphismus-Effekten
- **Responsive**: Optimiert für alle Geräte (Desktop, Tablet, Mobile)
- **SEO-Optimiert**: Meta-Tags, Open Graph, Twitter Cards, strukturierte Daten
- **Animationen**: Smooth CSS-Animationen und JavaScript-Interaktionen
- **Social Media Integration**: Links zu allen wichtigen Plattformen
- **Performance**: Optimiert für schnelle Ladezeiten

## 📁 Projektstruktur

```
rosenrausch2.0/
├── index.html              # Hauptseite mit Social Media Links
├── team.html               # Team-Seite
├── termine.html            # Events/Termine
├── minecraft.html          # Minecraft & Discord Info
├── privacy.html            # Datenschutzerklärung
├── impressum.html          # Impressum
├── 404.html               # Seite nicht gefunden
├── 403.html               # Zugriff verweigert
├── 401.html               # Nicht autorisiert
├── 500.html               # Serverfehler
├── 418.html               # I'm a teapot (Easter Egg)
├── error.html             # Generische Fehlerseite
├── wartung.html           # Wartungsseite
├── .htaccess              # Apache-Konfiguration
├── css/
│   ├── main.css           # Hauptstyles
│   ├── team.css           # Team-spezifische Styles
│   ├── events.css         # Events-spezifische Styles
│   ├── minecraft.css      # Minecraft-spezifische Styles
│   └── legal.css          # Legal pages styles
├── js/
│   ├── mobile-nav.js      # Mobile Navigation
│   ├── news-loader.js     # Dynamische News
│   ├── animations.js      # Animationen
│   ├── team.js           # Team-Funktionalität
│   ├── events.js         # Events-Funktionalität
│   ├── minecraft.js      # Minecraft-Funktionalität
│   ├── 404-handler.js    # Error Page Handler
│   └── easter-eggs.js    # Easter Eggs & Konami Code
└── images/
    └── (Platzhalter für Assets)
```

## 🎨 Design-Prinzipien

- **Purple Theme**: Lila/Violett als Hauptfarbe (#A855F7)
- **Dark Mode**: Dunkler Hintergrund für moderne Ästhetik
- **Glassmorphismus**: Transparente Elemente mit Blur-Effekten
- **Smooth Transitions**: Weiche Übergänge und Hover-Effekte
- **Mobile First**: Primär für mobile Geräte optimiert

## 🛠️ Technologien

- **HTML5**: Semantisches Markup
- **CSS3**: Modern CSS mit Flexbox/Grid, Animationen
- **Vanilla JavaScript**: Keine externen Frameworks
- **Font Awesome**: Icons
- **Progressive Enhancement**: Funktional ohne JavaScript

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Setup & Development

1. Klone/Download das Repository
2. Öffne `index.html` in einem Webbrowser
3. Für Development: Verwende einen lokalen Server (z.B. Live Server Extension)

## 📄 Seiten-Übersicht

- **Startseite**: Social Media Links und News
- **Team**: Mitglieder mit Bildern und Beschreibungen
- **Termine**: Events und Veranstaltungen
- **Minecraft**: Minecraft-Server und Discord-Info
- **Privacy**: Datenschutzerklärung
- **Impressum**: Rechtliche Informationen

## 🚨 Error Pages

Professionelle Fehlerseiten mit einheitlichem Design:

- **404.html**: Seite nicht gefunden (mit dynamischen Sprüchen)
- **403.html**: Zugriff verweigert
- **401.html**: Nicht autorisiert (mit Lock-Animation)
- **500.html**: Serverfehler
- **418.html**: I'm a teapot (Easter Egg mit Teekanne-Animation)
- **error.html**: Generische Fehlerseite
- **wartung.html**: Wartungsseite für Website-Updates

**Features der Error Pages:**
- Einheitliches Rosenrausch-Design mit Glassmorphismus
- Animationen und Easter Eggs (Konami-Code auf 404-Seite)
- Smart Error Handler mit Seitenvorschlägen
- Responsive Design
- Lustige und benutzerfreundliche Fehlermeldungen

## 🎯 SEO & Performance

- Meta-Tags für alle Seiten
- Open Graph & Twitter Cards
- Strukturierte Daten (Schema.org)
- Optimierte Bilder und Assets
- Minimaler JavaScript/CSS

## 📝 Content Management

Die Website verwendet statische Inhalte mit JavaScript für dynamische Funktionen:

- **News**: JSON-basiertes System über `data/news.json` mit `js/news-loader.js`
- **Team**: Dynamisches Rendering über `js/team.js`
- **Events**: Filterbare Events über `js/events.js`

### News System

Das News System lädt Inhalte aus `data/news.json`:
- Kategorisierte News mit Icons und Farben
- Featured News Highlighting
- Automatische Sortierung nach Datum
- Retry-Mechanismus bei Ladefehlern
- Responsive Design mit "Mehr laden" Funktionalität

## 🚀 Deployment

Die Website ist statisch und kann auf jedem Webserver gehostet werden:

- GitHub Pages
- Netlify
- Vercel
- Traditioneller Webspace

## 📞 Support

Für Fragen oder Issues kontaktiere das Development Team.

---

**Rosenrausch 2.0** - Moderne Website für die digitale Generation 🌹✨
