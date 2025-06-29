# Error Pages Documentation

## Overview

Die Rosenrausch Website verfügt über ein vollständiges Set professioneller Fehlerseiten, die das moderne Design der Hauptseite widerspiegeln und eine konsistente Benutzererfahrung bieten.

## Error Pages

### 404.html - Seite nicht gefunden
- **Zweck**: Zeigt an, wenn eine angeforderte Seite nicht existiert
- **Features**: 
  - Dynamische lustige Sprüche aus `js/easter-eggs.js`
  - Konami-Code Easter Egg (↑↑↓↓←→←→BA)
  - Seitenvorschläge basierend auf URL-Ähnlichkeiten
  - Bounce-Animation für den Fehlercode

### 403.html - Zugriff verweigert
- **Zweck**: Zeigt an, wenn der Zugriff auf eine Seite nicht erlaubt ist
- **Features**: 
  - Professionelle Nachricht über Zugriffsbeschränkungen
  - Bounce-Animation
  - Benutzerfreundliche Erklärung

### 401.html - Nicht autorisiert
- **Zweck**: Zeigt an, wenn eine Authentifizierung erforderlich ist
- **Features**: 
  - Animiertes Schloss-Icon (🔒)
  - Shake-Animation für den Fehlercode
  - Humorvolle Authentifizierungs-Hinweise

### 500.html - Serverfehler
- **Zweck**: Zeigt an, wenn ein interner Serverfehler auftritt
- **Features**: 
  - Beruhigende Nachricht über Server-Probleme
  - Bounce-Animation
  - Hinweis auf temporäre Natur des Problems

### 418.html - I'm a teapot
- **Zweck**: Easter Egg basierend auf RFC 2324
- **Features**: 
  - Animierte Teekanne (🫖) mit Dampf-Effekt
  - Steam-Animation
  - Humorvolle "Teapot Protocol" Referenz
  - Floating-Steam-Wolken

### error.html - Generische Fehlerseite
- **Zweck**: Fallback für unspezifische Fehler
- **Features**: 
  - Emoji-Icon (🤔) mit Pulse-Animation
  - Allgemeine Fehlermeldung
  - Benutzerfreundliche Anweisungen

### wartung.html - Wartungsseite
- **Zweck**: Zeigt an, wenn die Website in Wartung ist
- **Features**: 
  - Werkzeug-Icon (🔧) mit Pulse-Animation
  - Professionelle Wartungsankündigung
  - Minimalistisches Design ohne Navigation
  - Fixed Footer mit rechtlichen Links

## JavaScript Functionality

### js/404-handler.js
- **Dynamic Error Messaging**: Zeigt den Dateinamen in der Fehlermeldung an
- **Page Suggestions**: Schlägt ähnliche Seiten basierend auf URL-Patterns vor
- **Smart Routing**: Erkennt häufige Tippfehler und leitet um
- **Analytics Integration**: Vorbereitet für Fehler-Tracking

### js/easter-eggs.js
- **Random Quotes**: Zeigt zufällige lustige Sprüche für jeden Fehlercode
- **Konami Code**: ↑↑↓↓←→←→BA aktiviert Rainbow-Effekt auf 404-Seiten
- **Keyword Detection**: Reagiert auf getippte Wörter (rosenrausch, minecraft, help)
- **Dynamic Animations**: CSS-basierte Animationen für Interaktionen

## Design Principles

### Consistent Branding
- Einheitliche Farbpalette (#A855F7, #2D1B69, #1A1033)
- Glassmorphismus-Effekte mit backdrop-filter
- Lila-Gradient-Hintergründe
- Konsistente Typografie (Inter Font)

### User Experience
- **Responsive Design**: Funktioniert auf allen Geräten
- **Clear Navigation**: Links zurück zur Startseite und vorherige Seite
- **Helpful Messages**: Benutzerfreundliche Erklärungen statt technischer Fehler
- **Legal Compliance**: Footer mit Datenschutz- und Impressums-Links

### Animations
- **Bounce**: Für 404, 403, 500 Fehlercodes
- **Shake**: Für 401 Unauthorized
- **Pulse**: Für generische Fehler und Wartungsseiten
- **Steam**: Für 418 Teapot Easter Egg
- **Rainbow**: Konami-Code Aktivierung

## Server Configuration

### .htaccess
```apache
ErrorDocument 404 /404.html
ErrorDocument 403 /403.html
ErrorDocument 401 /401.html
ErrorDocument 500 /500.html
ErrorDocument 418 /418.html
ErrorDocument 400 /error.html
ErrorDocument 502 /error.html
ErrorDocument 503 /wartung.html
ErrorDocument 504 /error.html
```

### Security Headers
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Content-Security-Policy: Grundlegende CSP-Regeln

## Testing

### Manual Testing
1. Öffne `http://localhost:8080/404.html` für 404-Seite
2. Teste `http://localhost:8080/418.html` für Teapot Easter Egg
3. Prüfe `http://localhost:8080/wartung.html` für Wartungsseite
4. Versuche Konami-Code auf 404-Seite: ↑↑↓↓←→←→BA

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Customization

### Neue Sprüche hinzufügen
Bearbeite `js/easter-eggs.js` und füge neue Einträge zu den `errorQuotes` Arrays hinzu.

### Neue Fehlerseiten
1. Erstelle HTML-Datei basierend auf vorhandenen Templates
2. Füge ErrorDocument-Eintrag in `.htaccess` hinzu
3. Teste die Konfiguration

### Animationen anpassen
CSS-Animationen sind in den `<style>`-Bereichen jeder Fehlerseite definiert und können individuell angepasst werden.

## Performance

- **File Sizes**: Alle Fehlerseiten < 15KB
- **Load Times**: < 100ms auf lokalen Servern
- **Dependencies**: Nur Font Awesome über CDN
- **Fallbacks**: Funktioniert ohne JavaScript

## Accessibility

- **Semantic HTML**: Proper heading structure
- **Color Contrast**: WCAG 2.1 AA compliant
- **Keyboard Navigation**: Tab-freie Navigation zu allen Links
- **Screen Readers**: Alt-Texte und beschreibende Labels

---

**Letzte Aktualisierung**: Januar 2025  
**Version**: 1.0  
**Entwickler**: Rosenrausch Development Team
