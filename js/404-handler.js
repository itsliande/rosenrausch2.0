/**
 * Error-Handler für die Rosenrausch-Website
 * 
 * Diese Datei stellt zusätzliche Funktionalität für alle Fehlerseiten (404, 500, 403, usw.) bereit.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Easter Egg: Konami-Code und lustige Sprüche werden in easter-eggs.js verwaltet

    // Versuche, dem Benutzer zu helfen, indem ähnliche Seiten vorgeschlagen werden
    const path = window.location.pathname;
    const fileName = path.split('/').pop();

    // Wenn es einen Seitennamen gibt, füge einen Hinweis in die Fehlermeldung ein
    if (fileName && !['404.html', '500.html', '403.html', '401.html', '418.html', 'error.html'].includes(fileName)) {
        const messageElement = document.querySelector('.error-message');
        if (messageElement) {
            // Bestimme den aktuellen Fehlertyp basierend auf der Seite
            const errorCode = document.querySelector('.error-code')?.textContent.trim() || '';
            
            if (errorCode === '404') {
                messageElement.innerHTML = `Ups! Seite <span style="color: #A855F7;">${fileName}</span> nicht gefunden`;
            } else if (errorCode === '403') {
                messageElement.innerHTML = `Zugriff auf <span style="color: #A855F7;">${fileName}</span> verweigert`;
            } else if (errorCode === '401') {
                messageElement.innerHTML = `Nicht autorisiert für <span style="color: #A855F7;">${fileName}</span>`;
            } else if (errorCode === '500') {
                messageElement.innerHTML = `Serverfehler bei <span style="color: #A855F7;">${fileName}</span>`;
            } else if (errorCode === '418') {
                messageElement.innerHTML = `I'm a teapot, kann <span style="color: #A855F7;">${fileName}</span> nicht ausgeben`;
            } else {
                messageElement.innerHTML = `Fehler mit <span style="color: #A855F7;">${fileName}</span>`;
            }
        }
    }

    // Füge einen Ereignislistener für die Schaltfläche "Zur Startseite" hinzu
    const homeButton = document.querySelector('a[href="https://rosenrausch.xyz/"]');
    if (homeButton) {
        homeButton.addEventListener('click', function() {
            // Optional: Tracking für Fehler, falls später Analytics hinzugefügt werden
            console.log('Fehler-Benutzer ging zur Startseite');
        });
    }

    // Suggestion system: Schlage ähnliche Seiten vor basierend auf dem URL-Pfad
    suggestSimilarPages();
});

/**
 * Schlägt dem Benutzer ähnliche Seiten vor, falls verfügbar
 */
function suggestSimilarPages() {
    const path = window.location.pathname.toLowerCase();
    const suggestions = [];
    
    // Mapping von häufigen Tippfehlern zu korrekten Seiten
    const pageMap = {
        'team': '/team',
        'teams': '/team',
        'mitglieder': '/team',
        'termine': '/termine',
        'events': '/termine',
        'event': '/termine',
        'termin': '/termine',
        'minecraft': '/minecraft',
        'mc': '/minecraft',
        'discord': '/minecraft',
        'server': '/minecraft',
        'home': '/',
        'start': '/',
        'index': '/',
        'impressum': '/impressum',
        'imprint': '/impressum',
        'privacy': '/privacy',
        'datenschutz': '/privacy',
        'legal': '/impressum'
    };

    // Durchsuche nach ähnlichen Begriffen
    Object.keys(pageMap).forEach(key => {
        if (path.includes(key) && pageMap[key] !== path) {
            suggestions.push({
                text: getSuggestionText(pageMap[key]),
                url: `https://rosenrausch.xyz${pageMap[key]}`
            });
        }
    });

    // Zeige Vorschläge an, falls vorhanden
    if (suggestions.length > 0) {
        displaySuggestions(suggestions);
    }
}

/**
 * Gibt einen benutzerfreundlichen Text für eine URL zurück
 */
function getSuggestionText(url) {
    const textMap = {
        '/': 'Startseite',
        '/team': 'Unser Team',
        '/termine': 'Termine & Events',
        '/minecraft': 'Minecraft & Discord',
        '/impressum': 'Impressum',
        '/privacy': 'Datenschutz'
    };
    
    return textMap[url] || url;
}

/**
 * Zeigt Vorschläge für ähnliche Seiten an
 */
function displaySuggestions(suggestions) {
    const container = document.querySelector('.error-container');
    if (!container) return;

    const suggestionDiv = document.createElement('div');
    suggestionDiv.style.cssText = `
        margin-top: 30px;
        padding: 20px;
        background: rgba(168, 85, 247, 0.1);
        border-radius: 10px;
        border: 1px solid rgba(168, 85, 247, 0.2);
    `;

    suggestionDiv.innerHTML = `
        <h3 style="color: #E9D5FF; margin-bottom: 15px; font-size: 18px;">Meintest du vielleicht:</h3>
        ${suggestions.map(suggestion => 
            `<a href="${suggestion.url}" style="
                display: inline-block;
                margin: 5px 10px;
                padding: 8px 16px;
                background: rgba(168, 85, 247, 0.2);
                color: #E9D5FF;
                text-decoration: none;
                border-radius: 6px;
                border: 1px solid rgba(168, 85, 247, 0.3);
                transition: all 0.3s ease;
            " onmouseover="this.style.background='rgba(168, 85, 247, 0.3)'" 
               onmouseout="this.style.background='rgba(168, 85, 247, 0.2)'">${suggestion.text}</a>`
        ).join('')}
    `;

    // Füge Vorschläge vor den Buttons ein
    const buttonGroup = container.querySelector('.button-group');
    if (buttonGroup) {
        container.insertBefore(suggestionDiv, buttonGroup);
    } else {
        container.appendChild(suggestionDiv);
    }
}
