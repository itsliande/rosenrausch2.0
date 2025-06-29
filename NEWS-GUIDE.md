# News Content Management Guide

## 📰 Übersicht

Das Rosenrausch News System verwendet eine JSON-Datei (`data/news.json`) für die Verwaltung aller News-Inhalte. Diese Anleitung erklärt, wie neue News hinzugefügt, bearbeitet oder entfernt werden.

## 📁 Dateistruktur

```
data/
└── news.json          # Hauptdatei für alle News-Inhalte
js/
└── news-loader.js     # JavaScript für News-Anzeige
```

## 📝 News hinzufügen

### 1. Neue News-Eintrag erstellen

Öffne `data/news.json` und füge einen neuen Eintrag zum `news` Array hinzu:

```json
{
  "id": 8,
  "title": "Dein News-Titel",
  "content": "Der Inhalt deiner News. Kann mehrere Sätze enthalten und erklärt, was neu ist.",
  "date": "2025-01-20",
  "category": "general",
  "featured": false,
  "links": [
    {
      "url": "https://example.com",
      "text": "Link Text",
      "icon": "fas fa-external-link-alt"
    }
  ]
}
```

### 2. Eigenschaften erklären

- **id**: Eindeutige Nummer (immer höher als die vorherige)
- **title**: Überschrift der News
- **content**: Beschreibungstext der News
- **date**: Datum im Format YYYY-MM-DD
- **category**: Kategorie-ID (siehe verfügbare Kategorien unten)
- **featured**: `true` für hervorgehobene News, `false` für normale
- **links**: Array mit Links (optional)

### 3. Verfügbare Kategorien

| ID | Name | Icon | Beschreibung |
|---|---|---|---|
| `music` | Musik | `fas fa-music` | Neue Songs, Alben, Musik-Updates |
| `event` | Events | `fas fa-calendar-alt` | Veranstaltungen, Live-Events |
| `community` | Community | `fas fa-users` | Community-Updates, Discord-News |
| `minecraft` | Minecraft | `fas fa-cube` | Minecraft-Server Updates |
| `general` | Allgemein | `fas fa-info-circle` | Allgemeine Neuigkeiten |
| `merchandise` | Merchandise | `fas fa-tshirt` | Shop-Updates, neue Produkte |
| `streaming` | Streaming | `fas fa-video` | Stream-Schedule, Platform-Updates |

## 🎨 Link-Icons

Verwende Font Awesome Icons für Links:

- `fab fa-spotify` - Spotify
- `fab fa-apple` - Apple Music
- `fab fa-discord` - Discord
- `fab fa-tiktok` - TikTok
- `fab fa-instagram` - Instagram
- `fas fa-calendar` - Termine/Events
- `fas fa-cube` - Minecraft
- `fas fa-shopping-cart` - Shop
- `fas fa-external-link-alt` - Externe Links

## ✨ Featured News

Featured News werden visuell hervorgehoben:
- Goldener Rand statt violett
- Leicht gelblicher Hintergrund
- Sollten sparsam verwendet werden (max. 1-2 gleichzeitig)

## 📅 Datum-Format

Verwende immer das Format `YYYY-MM-DD`:
- ✅ `"2025-01-20"`
- ❌ `"20.01.2025"`
- ❌ `"Jan 20, 2025"`

## 🔄 Änderungen aktivieren

Nach Änderungen an `news.json`:
1. Speichere die Datei
2. Lade die Website neu
3. Die News werden automatisch aktualisiert

## 📋 Beispiel-News

```json
{
  "id": 10,
  "title": "Großes Community-Event am Wochenende!",
  "content": "Dieses Wochenende findet unser größtes Community-Event des Jahres statt! Es wird Live-Streams, Gewinnspiele und exklusive Musik geben. Seid dabei!",
  "date": "2025-02-01",
  "category": "event",
  "featured": true,
  "links": [
    {
      "url": "termine.html",
      "text": "Event-Details",
      "icon": "fas fa-calendar"
    },
    {
      "url": "https://discord.rosenrausch.xyz",
      "text": "Discord beitreten",
      "icon": "fab fa-discord"
    }
  ]
}
```

## ⚠️ Wichtige Hinweise

- **Reihenfolge**: News werden automatisch nach Datum sortiert (neueste zuerst)
- **JSON-Syntax**: Achte auf korrekte Komma-Setzung und Anführungszeichen
- **Backup**: Erstelle vor größeren Änderungen ein Backup von `news.json`
- **Test**: Nutze `test-news.html` zum Testen der JSON-Struktur

## 🛠️ Troubleshooting

**News werden nicht angezeigt:**
1. Prüfe die JSON-Syntax mit einem Online-Validator
2. Überprüfe die Browser-Konsole auf Fehler
3. Stelle sicher, dass alle erforderlichen Felder ausgefüllt sind

**Kategorien funktionieren nicht:**
- Verwende nur die vordefinierten Kategorie-IDs
- Neue Kategorien müssen im `categories` Array hinzugefügt werden
