// Vereinfachter News Loader für Rosenrausch
// Robuste Version mit besserer Fehlerbehandlung

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔄 News Loader wird gestartet...');
    
    const newsContainer = document.getElementById('news-items-container');
    const allNewsContainer = document.getElementById('all-news-container');
    
    const isMainPage = newsContainer !== null;
    const targetContainer = isMainPage ? newsContainer : allNewsContainer;
    
    console.log('📍 Seite:', isMainPage ? 'Hauptseite' : 'News-Seite');
    console.log('📦 news-items-container:', !!newsContainer);
    console.log('📦 all-news-container:', !!allNewsContainer);
    console.log('📦 Target-Container gefunden:', !!targetContainer);
    console.log('📦 Current URL:', window.location.pathname);
    
    if (!targetContainer) {
        console.warn('⚠️ Kein News-Container gefunden - News-Loader wird beendet');
        return;
    }

    // Zeige Loading-Zustand
    targetContainer.innerHTML = '<div class="loading-message">News werden geladen...</div>';

    // News-Daten laden
    loadNewsData();

    function loadNewsData() {
        const jsonUrl = './data/news.json';
        const cacheBuster = '?v=' + Date.now();
        
        console.log('📡 Lade News von:', jsonUrl + cacheBuster);
        
        fetch(jsonUrl + cacheBuster)
            .then(handleResponse)
            .then(handleNewsData)
            .catch(handleError);
    }

    function handleResponse(response) {
        console.log('📥 Response erhalten:', response.status, response.statusText);
        
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
        }
        
        return response.json();
    }

    function handleNewsData(data) {
        console.log('📋 News-Daten erhalten:', data);
        console.log('📊 Datentyp:', typeof data);
        console.log('🔢 Ist Array:', Array.isArray(data));
        
        let newsItems = data;
        
        // Falls die Daten in einem news-Property sind (alter Format)
        if (data && data.news && Array.isArray(data.news)) {
            console.log('🔄 Verwende data.news array');
            newsItems = data.news;
        }
        
        // Überprüfe ob wir ein Array haben
        if (!Array.isArray(newsItems)) {
            throw new Error('News-Daten sind kein Array: ' + typeof newsItems);
        }
        
        console.log('✅ Verarbeite', newsItems.length, 'News-Items');
        
        // Filtere aktive News
        const activeNews = newsItems.filter(item => {
            return item && (item.active === true || item.active === undefined);
        });
        
        console.log('📊 Aktive News:', activeNews.length);
        
        // Sortiere nach ID (neueste zuerst)
        activeNews.sort((a, b) => (b.id || 0) - (a.id || 0));
        
        // Zeige News an
        displayNews(activeNews);
    }

    function displayNews(newsItems) {
        if (newsItems.length === 0) {
            targetContainer.innerHTML = '<div class="no-news">Keine aktuellen Neuigkeiten verfügbar.</div>';
            return;
        }
        
        // Bestimme wie viele News angezeigt werden sollen
        const itemsToShow = isMainPage ? newsItems.slice(0, 3) : newsItems;
        
        console.log('🎯 Seite ist Hauptseite:', isMainPage);
        console.log('🎯 Zeige', itemsToShow.length, 'von', newsItems.length, 'News an');
        console.log('🎯 Items to show:', itemsToShow.map(item => item.title));
        
        // Container leeren
        targetContainer.innerHTML = '';
        
        // News-Items erstellen
        itemsToShow.forEach((item, index) => {
            const newsElement = createNewsElement(item, index);
            targetContainer.appendChild(newsElement);
        });
        
        // "Ältere ansehen" Button auf Hauptseite
        if (isMainPage && newsItems.length > 3) {
            addViewAllButton();
        }
    }

    function createNewsElement(item, index) {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        
        // Verarbeite Content intelligent
        let content = item.content || '';
        content = processContentSmart(content);
        
        // Erstelle Termin-Link falls vorhanden
        let terminLinkHtml = '';
        if (item.terminLink) {
            terminLinkHtml = `
                <div class="news-termin-link">
                    <a href="./termine.html#${item.terminLink}" class="termin-link-button">
                        <i class="fas fa-calendar-alt"></i> Zum Termin
                    </a>
                </div>
            `;
        }
        
        newsItem.innerHTML = `
            <span class="news-date">${item.date || 'Kein Datum'}</span>
            <div class="news-item-title">${item.title || 'Kein Titel'}</div>
            <div class="news-content">${content}</div>
            ${terminLinkHtml}
        `;
        
        return newsItem;
    }

    function processContentSmart(content) {
        // Schritt 1: Links identifizieren und temporär ersetzen
        const linkPlaceholders = {};
        let placeholderCounter = 0;
        
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        let processedContent = content.replace(urlRegex, (url) => {
            const placeholder = `__LINK_PLACEHOLDER_${placeholderCounter}__`;
            linkPlaceholders[placeholder] = url;
            placeholderCounter++;
            return placeholder;
        });
        
        // Schritt 2: Newlines zu <br> konvertieren
        processedContent = processedContent.replace(/\n/g, '<br>');
        
        // Schritt 3: Störende <br> um Platzhalter entfernen
        processedContent = processedContent.replace(/<br>\s*(__LINK_PLACEHOLDER_\d+__)\s*<br>/g, '<br>$1<br>');
        processedContent = processedContent.replace(/(__LINK_PLACEHOLDER_\d+__)\s*<br>/g, '$1<br>');
        processedContent = processedContent.replace(/<br>\s*(__LINK_PLACEHOLDER_\d+__)/g, '<br>$1');
        
        // Schritt 4: Platzhalter durch echte Buttons ersetzen
        Object.entries(linkPlaceholders).forEach(([placeholder, url]) => {
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
            
            const buttonHtml = `<div class="news-link-button-container"><a href="${url}" target="_blank" class="news-link-button"><i class="${icon}"></i><span>${buttonText}</span></a></div>`;
            processedContent = processedContent.replace(placeholder, buttonHtml);
        });
        
        return processedContent;
    }

    function convertNewlines(text) {
        return text.replace(/\n/g, '<br>');
    }

    function convertLinksToButtons(text) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        
        return text.replace(urlRegex, function(url) {
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
            
            return `<div class="news-link-button-container"><a href="${url}" target="_blank" class="news-link-button"><i class="${icon}"></i><span>${buttonText}</span></a></div>`;
        });
    }

    function addViewAllButton() {
        const viewMoreContainer = document.createElement('div');
        viewMoreContainer.className = 'news-all';
        viewMoreContainer.innerHTML = '<a href="./news.html">Ältere ansehen →</a>';
        
        const newsContainerParent = targetContainer.parentElement;
        newsContainerParent.appendChild(viewMoreContainer);
    }

    function handleError(error) {
        console.error('❌ News-Loader Fehler:', error);
        
        if (targetContainer) {
            targetContainer.innerHTML = `
                <div class="error-message">
                    <h3>⚠️ News konnten nicht geladen werden</h3>
                    <p><strong>Fehler:</strong> ${error.message}</p>
                    <p>Bitte überprüfen Sie:</p>
                    <ul>
                        <li>Ist die Datei data/news.json vorhanden?</li>
                        <li>Ist das JSON-Format korrekt?</li>
                        <li>Läuft der Server?</li>
                    </ul>
                </div>
            `;
        }
    }
});
