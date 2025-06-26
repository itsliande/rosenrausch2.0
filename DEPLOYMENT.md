# 🚀 Deployment Guide - Rosenrausch 2.0

## Quick Start

### Local Development
1. **Windows**: Doppelklick auf `start-server.bat`
2. **MacOS/Linux**: `python -m http.server 8080`
3. Öffne http://localhost:8080 im Browser

### VS Code (empfohlen)
1. Installiere die "Live Server" Extension
2. Rechtsklick auf `index.html` → "Open with Live Server"

## 🌐 Hosting & Deployment

### Statische Hosting-Dienste

#### 1. **Netlify** (Empfohlen)
- Drag & Drop Deployment
- Automatische SSL-Zertifikate
- CDN-Integration
- Kostenlos für persönliche Projekte

**Steps:**
1. Gehe zu [netlify.com](https://netlify.com)
2. Ziehe den gesamten Projektordner auf die Seite
3. Domain wird automatisch zugewiesen

#### 2. **Vercel**
- GitHub Integration
- Serverless Functions verfügbar
- Automatische Deployments

**Steps:**
1. Verbinde GitHub Repository mit [vercel.com](https://vercel.com)
2. Automatisches Deployment bei jedem Git Push

#### 3. **GitHub Pages**
- Kostenlos für öffentliche Repositories
- GitHub Integration

**Steps:**
1. Push Code zu GitHub Repository
2. GitHub Settings → Pages → Source: Deploy from branch
3. Wähle `main` branch

### Traditionelles Web-Hosting

#### FTP Upload
1. Lade alle Dateien (außer .git, node_modules) hoch
2. Stelle sicher, dass `index.html` im Root-Verzeichnis liegt
3. Teste alle Links und Assets

## 🔧 Pre-Deployment Checklist

### Content Updates
- [ ] Ersetze Placeholder-Daten in JavaScript-Dateien
- [ ] Aktualisiere Social Media Links
- [ ] Füge echte Team-Bilder hinzu
- [ ] Überprüfe Kontaktdaten im Impressum

### Technical
- [ ] Teste alle Seiten auf verschiedenen Geräten
- [ ] Überprüfe mobile Navigation
- [ ] Validiere HTML/CSS
- [ ] Teste alle externen Links
- [ ] Optimiere Bilder für Web

### SEO
- [ ] Aktualisiere Meta-Descriptions
- [ ] Überprüfe sitemap.xml Daten
- [ ] Teste structured data mit Google Rich Results Test
- [ ] Aktualisiere robots.txt wenn nötig

## 📱 Browser-Kompatibilität

**Getestet auf:**
- Chrome 120+
- Firefox 115+
- Safari 16+
- Edge 120+

**Mobile:**
- iOS Safari 16+
- Chrome Mobile 120+
- Samsung Internet 23+

## ⚡ Performance Optimierung

### Bilder
- Verwende WebP Format für bessere Kompression
- Implementiere Lazy Loading für Bilder
- Optimiere SVGs

### Code
- Minifiziere CSS/JS für Production
- Kombiniere CSS-Dateien wenn möglich
- Verwende CDN für externe Bibliotheken

### Caching
```apache
# .htaccess (für Apache Server)
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

## 🔒 Sicherheit

### Content Security Policy
Füge diese Meta-Tags für zusätzliche Sicherheit hinzu:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; font-src 'self' https://cdnjs.cloudflare.com;">
```

### Headers
Für zusätzliche Sicherheit auf dem Server konfigurieren:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

## 📊 Analytics Integration

### Google Analytics 4
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Alternatives
- Plausible (GDPR-freundlich)
- Matomo (selbst-gehostet)
- Simple Analytics

## 🎯 Domain Setup

### Custom Domain
1. Kaufe Domain bei Anbieter (z.B. Namecheap, GoDaddy)
2. Konfiguriere DNS-Einstellungen:
   - A Record: zeigt auf Server-IP
   - CNAME: www zeigt auf Hauptdomain
3. SSL-Zertifikat einrichten (meist automatisch)

### Subdomain Setup
Für Entwicklung/Staging:
- staging.rosenrausch.xyz
- dev.rosenrausch.xyz

## 🔄 Update-Workflow

### Code Updates
1. Teste lokal mit `start-server.bat`
2. Committe Änderungen zu Git
3. Pushe zu GitHub
4. Deploy über gewählten Service

### Content Updates
1. Editiere entsprechende JavaScript-Dateien
2. Teste funktionalität lokal
3. Deploy neue Version

## 📞 Support

### Häufige Probleme

**CSS/JS lädt nicht:**
- Überprüfe Dateipfade (case-sensitive auf Linux)
- Teste mit Browser-Entwicklertools

**Mobile Navigation funktioniert nicht:**
- JavaScript-Fehler in Konsole prüfen
- Sicherstellen dass `mobile-nav.js` geladen wird

**Bilder werden nicht angezeigt:**
- Dateipfade überprüfen
- Bildformate validieren
- Server-Konfiguration für SVG prüfen

### Debug-Modus
Aktiviere Browser-Entwicklertools (F12) um:
- Netzwerk-Requests zu überwachen
- JavaScript-Fehler zu identifizieren
- CSS-Probleme zu debuggen

---

**Viel Erfolg mit dem Deployment! 🚀**
