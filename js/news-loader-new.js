// News Loader für Rosenrausch
// Basiert auf dem System von https://github.com/itsliande/rosenrausch

document.addEventListener('DOMContentLoaded', function() {
    const newsContainer = document.getElementById('news-items-container');
    const isMainPage = newsContainer !== null;

    if (!newsContainer && !document.getElementById('all-news-container')) {
        console.log('Keine News-Container gefunden.');
        return;
    }

    console.log('News Loader wird initialisiert...', isMainPage ? 'Hauptseite' : 'News-Seite');

    // Bestimme den Container und die URL
    const targetContainer = isMainPage ? newsContainer : document.getElementById('all-news-container');
    const jsonUrl = './data/news.json';

    console.log('Target Container:', targetContainer);
    console.log('JSON URL:', jsonUrl);

    if (!targetContainer) {
        console.error('Kein gültiger News-Container gefunden');
        return;
    }

    // Funktion zum Laden und Anzeigen der News
    fetch(jsonUrl + '?v=' + new Date().getTime()) // Cache-Busting hinzugefügt
        .then(response => {
            console.log('Fetch Response:', response);
            if (!response.ok) {
                console.error('Fehlerhafte Antwort:', response.status, response.statusText);
                throw new Error('Netzwerkantwort war nicht ok');
            }
            return response.json();
        })
        .then(newsItems => {
            console.log('Geladene News:', newsItems);
            console.log('Typ der geladenen Daten:', typeof newsItems);
            console.log('Ist Array:', Array.isArray(newsItems));
            
            // Überprüfe ob newsItems ein Array ist
            if (!Array.isArray(newsItems)) {
                console.error('News-Daten sind kein Array:', newsItems);
                throw new Error('News-Daten haben das falsche Format');
            }
            
            // Filtere nur aktive News-Items
            // Wenn active nicht definiert ist, gilt der Artikel als aktiv
            const activeNewsItems = newsItems.filter(item => item.active !== false);
            
            console.log('Aktive News nach Filterung:', activeNewsItems);
            
            // News nach ID sortieren (höchste zuerst = neueste)
            activeNewsItems.sort((a, b) => b.id - a.id);
            
            // Container leeren
            targetContainer.innerHTML = '';
            
            // Funktion zum Konvertieren von \n zu <br> Tags
            function convertNewlines(text) {
                return text.replace(/\n/g, '<br>');
            }
            
            // Funktion zum Erkennen und Konvertieren von Links zu Buttons
            function convertLinksToButtons(text) {
                // Regex für URLs
                const urlRegex = /(https?:\/\/[^\s]+)/g;
                
                return text.replace(urlRegex, function(url) {
                    // Bestimme Icon basierend auf der URL
                    let icon = 'fas fa-external-link-alt';
                    let buttonText = 'Link öffnen';
                    
                    if (url.includes('spotify')) {
                        icon = 'fab fa-spotify';
                        buttonText = 'Auf Spotify';
                    } else if (url.includes('apple') || url.includes('itunes')) {
                        icon = 'fab fa-apple';
                        buttonText = 'Apple Music';
                    } else if (url.includes('discord')) {
                        icon = 'fab fa-discord';
                        buttonText = 'Discord';
                    } else if (url.includes('tiktok')) {
                        icon = 'fab fa-tiktok';
                        buttonText = 'TikTok';
                    } else if (url.includes('youtube')) {
                        icon = 'fab fa-youtube';
                        buttonText = 'YouTube';
                    } else if (url.includes('instagram')) {
                        icon = 'fab fa-instagram';
                        buttonText = 'Instagram';
                    } else if (url.includes('shop') || url.includes('store')) {
                        icon = 'fas fa-shopping-cart';
                        buttonText = 'Shop';
                    } else if (url.includes('rosenrausch.xyz/termine')) {
                        icon = 'fas fa-calendar-alt';
                        buttonText = 'Termine';
                    } else if (url.includes('rosenrausch.xyz/minecraft')) {
                        icon = 'fas fa-cube';
                        buttonText = 'Minecraft';
                    }
                    
                    return `<div class="news-link-button-container">
                        <a href="${url}" target="_blank" class="news-link-button">
                            <i class="${icon}"></i>
                            <span>${buttonText}</span>
                        </a>
                    </div>`;
                });
            }
            
            // News-Items erstellen und anzeigen
            if (activeNewsItems.length === 0) {
                targetContainer.innerHTML = '<div class="no-news">Keine aktuellen Neuigkeiten verfügbar.</div>';
                return;
            }
            
            // Nur die neuesten 2 News auf der Hauptseite anzeigen
            const itemsToShow = isMainPage ? activeNewsItems.slice(0, 2) : activeNewsItems;
            
            itemsToShow.forEach(item => {
                const newsItem = document.createElement('div');
                newsItem.className = 'news-item';
                
                // Erstelle Termin-Link falls vorhanden
                let terminLinkHtml = '';
                if (item.terminLink) {
                    terminLinkHtml = `<div class="news-termin-link">
                        <a href="./termine#${item.terminLink}" class="termin-link-button">
                            <i class="fas fa-calendar-alt"></i> Zum Termin
                        </a>
                    </div>`;
                }
                
                // Verarbeite den Content: Erst Links zu Buttons, dann Newlines zu <br>
                const processedContent = convertNewlines(convertLinksToButtons(item.content));
                
                newsItem.innerHTML = `
                    <span class="news-date">${item.date}</span>
                    <div class="news-item-title">${item.title}</div>
                    <div class="news-content">${processedContent}</div>
                    ${terminLinkHtml}
                `;
                
                targetContainer.appendChild(newsItem);
            });
            
            // "Ältere ansehen" Button nur auf der Hauptseite hinzufügen, wenn es mehr als 2 aktive News gibt
            if (isMainPage && activeNewsItems.length > 2) {
                const viewMoreContainer = document.createElement('div');
                viewMoreContainer.className = 'news-all';
                viewMoreContainer.innerHTML = '<a href="./news">Ältere ansehen →</a>';
                
                // Sicherstellen, dass der Button nach dem Container eingefügt wird
                const newsContainerParent = targetContainer.parentElement;
                newsContainerParent.appendChild(viewMoreContainer);
            }
        })
        .catch(error => {
            console.error('Problem beim Laden der News:', error);
            console.error('Error details:', error.message);
            if (targetContainer) {
                targetContainer.innerHTML = `<div class="error-message">Die Neuigkeiten konnten nicht geladen werden.<br>Fehler: ${error.message}<br>Bitte überprüfen Sie die Browser-Konsole für weitere Details.</div>`;
            }
        });
});
