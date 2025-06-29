# 📊 Data Structure Documentation

Diese Datei dokumentiert die JSON-Datenstrukturen der Rosenrausch 2.0 Website.

## 📁 Datenverzeichnis (`/data/`)

### 📰 `news.json`
Enthält alle News-Artikel und Kategorien für die Startseite.

**Struktur:**
```json
{
  "news": [
    {
      "id": number,
      "title": string,
      "content": string,
      "date": "YYYY-MM-DD",
      "category": string,
      "featured": boolean,
      "links": [
        {
          "url": string,
          "text": string,
          "icon": string (FontAwesome class)
        }
      ]
    }
  ],
  "categories": [
    {
      "id": string,
      "name": string,
      "icon": string,
      "color": string (hex)
    }
  ]
}
```

### 👥 `team.json`
Team-Mitglieder und ihre Informationen für die Team-Seite.

**Struktur:**
```json
{
  "team": [
    {
      "id": number,
      "name": string,
      "role": string,
      "bio": string,
      "image": string (path),
      "category": string,
      "social": {
        "platform": "url"
      }
    }
  ],
  "categories": [
    {
      "id": string,
      "name": string,
      "description": string
    }
  ]
}
```

### 📅 `events.json`
Events und Termine für die Termine-Seite.

**Struktur:**
```json
{
  "events": [
    {
      "id": number,
      "title": string,
      "date": "YYYY-MM-DD",
      "time": "HH:MM",
      "location": string,
      "description": string,
      "type": string,
      "isPast": boolean,
      "featured": boolean,
      "links": [
        {
          "url": string,
          "text": string,
          "type": "primary" | "secondary"
        }
      ]
    }
  ],
  "eventTypes": [
    {
      "id": string,
      "name": string,
      "icon": string,
      "color": string
    }
  ]
}
```

### 🎮 `minecraft.json`
Minecraft Server und Discord Informationen.

**Struktur:**
```json
{
  "server": {
    "name": string,
    "ip": string,
    "port": number,
    "version": string,
    "type": string,
    "maxPlayers": number,
    "description": string,
    "features": [
      {
        "name": string,
        "icon": string,
        "description": string
      }
    ]
  },
  "discord": {
    "name": string,
    "invite": string,
    "description": string,
    "features": [...]
  },
  "rules": [
    {
      "id": string,
      "title": string,
      "icon": string,
      "description": string,
      "details": string
    }
  ]
}
```

### 💬 `quotes.json`
Zitate und Sprüche für die Quotes-Seite.

**Struktur:**
```json
{
  "quotes": [
    {
      "id": number,
      "quote": string,
      "author": string,
      "context": string,
      "category": string,
      "timestamp": "YYYY-MM-DD",
      "likes": number,
      "featured": boolean
    }
  ],
  "categories": [...]
}
```

### ⚙️ `config.json`
Allgemeine Website-Konfiguration.

**Struktur:**
```json
{
  "site": {
    "name": string,
    "tagline": string,
    "description": string,
    "url": string,
    "logo": string,
    "favicon": string
  },
  "social": {
    "platform": "url"
  },
  "features": {
    "componentName": {
      "enabled": boolean,
      "options": {...}
    }
  }
}
```

## 🔧 JavaScript Integration

### News Loader (`js/news-loader.js`)
```javascript
// Lädt automatisch data/news.json
const newsLoader = new NewsLoader();
```

### Team Manager (`js/team.js`)
```javascript
// Lädt automatisch data/team.json
const teamManager = new TeamManager();
```

### Events Manager (`js/events.js`)
```javascript
// Lädt automatisch data/events.json
const eventsManager = new EventsManager();
```

### Minecraft Manager (`js/minecraft.js`)
```javascript
// Lädt automatisch data/minecraft.json
const minecraftManager = new MinecraftManager();
```

## 📝 Daten hinzufügen/bearbeiten

### Neue News hinzufügen:
1. Öffne `data/news.json`
2. Füge neues Objekt zum `news` Array hinzu
3. Verwende die nächste verfügbare ID
4. Stelle sicher, dass die Kategorie in `categories` existiert

### Neues Team-Mitglied hinzufügen:
1. Öffne `data/team.json`
2. Füge neues Objekt zum `team` Array hinzu
3. Lade das Profilbild in `images/` hoch
4. Verwende eine gültige Kategorie

### Neues Event hinzufügen:
1. Öffne `data/events.json`
2. Füge neues Objekt zum `events` Array hinzu
3. Verwende das Format "YYYY-MM-DD" für Datum
4. Setze `isPast` entsprechend dem Datum

## 🧪 Datenvalidierung

Verwende die Test-Seite `data-test.html` um die Datenintegrität zu überprüfen:

```bash
# Server starten
python -m http.server 8080

# Testseite öffnen
http://localhost:8080/data-test.html
```

Die Testseite überprüft:
- ✅ JSON-Syntax
- ✅ Erforderliche Felder
- ✅ Datentypen
- ✅ Referenzen zwischen Dateien

## 🚀 Best Practices

1. **Immer Backup erstellen** vor Änderungen
2. **JSON-Syntax validieren** nach Änderungen
3. **Bilder optimieren** vor dem Upload
4. **Konsistente Datumsformate** verwenden
5. **Kategorien zentral verwalten**
6. **Testseite nutzen** zur Validierung

## 📋 Checkliste für neue Daten

- [ ] JSON-Syntax korrekt
- [ ] Alle erforderlichen Felder ausgefüllt
- [ ] Bilder in korrekter Größe und Format
- [ ] Links funktionsfähig
- [ ] Datenvalidierung erfolgreich
- [ ] Website getestet

---

📄 **Letzte Aktualisierung:** 2025-01-15  
🔗 **Version:** 2.0
