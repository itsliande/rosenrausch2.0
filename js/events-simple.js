// Einfacher Events Loader für Rosenrausch
// Robuste Version ohne komplexe Klassen

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔄 Events Loader wird gestartet...');
    
    const eventsContainer = document.getElementById('events-container');
    const noEventsMessage = document.getElementById('no-events');
    
    console.log('📦 Events-Container gefunden:', !!eventsContainer);
    console.log('📦 No-Events-Message gefunden:', !!noEventsMessage);
    
    if (!eventsContainer || !noEventsMessage) {
        console.warn('⚠️ Benötigte Container nicht gefunden - Events-Loader wird beendet');
        return;
    }
    
    // Events-Daten laden
    loadEventsData();
    
    async function loadEventsData() {
        try {
            // Load events data from JSON file with cache busting
            const cacheBuster = '?v=' + Date.now();
            const response = await fetch('./data/events.json' + cacheBuster);
            
            console.log('📡 Lade Events von:', './data/events.json' + cacheBuster);
            console.log('📥 Response status:', response.status, response.statusText);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('📋 Events data loaded:', data);
            
            // Process events and mark past events
            const now = new Date();
            const eventsData = data.events.map(event => {
                const eventDate = new Date(event.date + 'T' + (event.time || '00:00'));
                console.log(`📅 Event "${event.title}" Datum: ${event.date}, Berechnet: ${eventDate}, Ist vergangen: ${eventDate < now}`);
                return {
                    ...event,
                    isPast: eventDate < now
                };
            });
            
            console.log('✅ Verarbeitete Events:', eventsData.length);
            
            // Zeige Events an
            displayEvents(eventsData);
            
            // Hash-Navigation prüfen
            setTimeout(() => {
                checkHashNavigation();
            }, 500);
            
        } catch (error) {
            console.error('❌ Fehler beim Laden der Events:', error);
            
            // Fallback Events erstellen
            console.warn('⚠️ Verwende Fallback-Events');
            createFallbackEvents();
        }
    }
    
    function createFallbackEvents() {
        const now = new Date();
        const futureDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // +7 days
        
        const fallbackEvents = [
            {
                id: "community-event-2025",
                title: "Community Event 2025",
                date: futureDate.toISOString().split('T')[0],
                time: "18:00",
                location: "Discord & Live",
                description: "Ein großes Community Event mit Spielen, Musik und tollen Überraschungen! Alle sind herzlich eingeladen.",
                type: "meetup",
                isPast: false,
                links: [
                    { url: "https://discord.rosenrausch.xyz", text: "Discord beitreten", type: "primary" }
                ]
            }
        ];
        
        console.log('📋 Fallback-Events erstellt:', fallbackEvents);
        displayEvents(fallbackEvents);
        
        // Hash-Navigation auch für Fallback Events prüfen
        setTimeout(() => {
            checkHashNavigation();
        }, 500);
    }
    
    function displayEvents(eventsData) {
        console.log('🎨 Zeige Events an:', eventsData.length);
        
        // Zeige alle Events an (sowohl aktuelle als auch vergangene)
        // Sortiere Events: Zukünftige zuerst, dann vergangene
        const sortedEvents = eventsData.sort((a, b) => {
            if (a.isPast && !b.isPast) return 1;  // a ist vergangen, b nicht -> b zuerst
            if (!a.isPast && b.isPast) return -1; // a ist nicht vergangen, b schon -> a zuerst
            // Beide sind gleich (beide vergangen oder beide zukünftig) -> nach Datum sortieren
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return a.isPast ? dateB - dateA : dateA - dateB; // Vergangene: neueste zuerst, Zukünftige: älteste zuerst
        });
        
        console.log('📊 Sortierte Events:', sortedEvents.map(e => `${e.title} (${e.isPast ? 'vergangen' : 'zukünftig'})`));
        
        if (sortedEvents.length === 0) {
            console.log('⚠️ Keine Events - zeige "Keine Events" Nachricht');
            showNoEventsMessage();
            return;
        }
        
        console.log('✅ Verstecke "Keine Events" Nachricht und zeige Events');
        hideNoEventsMessage();
        
        // Events-Container leeren
        eventsContainer.innerHTML = '';
        
        // Events erstellen
        sortedEvents.forEach((event, index) => {
            const eventElement = createEventElement(event, index);
            eventsContainer.appendChild(eventElement);
        });
    }
    
    function createEventElement(event, index) {
        console.log(`📝 Erstelle Event-Element für: ${event.title}`);
        
        const eventCard = document.createElement('div');
        eventCard.className = `event-card ${event.isPast ? 'past-event' : ''}`;
        eventCard.style.animationDelay = `${index * 0.1}s`;
        
        // Setze ID für Anchor-Navigation
        if (event.id) {
            eventCard.id = event.id;
        }
        
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('de-DE', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const linksHtml = event.links && event.links.length > 0 ? `
            <div class="event-actions">
                ${event.links.map(link => `
                    <a href="${link.url}" target="_blank" class="event-button ${link.type}">
                        <i class="fas fa-external-link-alt"></i>
                        ${link.text}
                    </a>
                `).join('')}
            </div>
        ` : '';
        
        eventCard.innerHTML = `
            <div class="event-header" onclick="this.parentElement.classList.toggle('expanded')">
                <div class="event-header-left">
                    <h3 class="event-title">${event.title}</h3>
                    <div class="event-meta">
                        <span><i class="fas fa-calendar"></i> ${formattedDate}</span>
                        <span><i class="fas fa-clock"></i> ${event.time} Uhr</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
                    </div>
                </div>
                <i class="fas fa-chevron-down event-expand-icon"></i>
            </div>
            <div class="event-content">
                <div class="event-description">
                    <div class="event-description-title">Beschreibung</div>
                    ${event.description}
                </div>
                ${linksHtml}
            </div>
        `;
        
        return eventCard;
    }
    
    function showNoEventsMessage() {
        console.log('📢 Zeige "Keine Events" Nachricht');
        if (noEventsMessage) {
            noEventsMessage.style.display = 'block';
        }
        if (eventsContainer) {
            eventsContainer.style.display = 'none';
        }
    }
    
    function hideNoEventsMessage() {
        console.log('🙈 Verstecke "Keine Events" Nachricht');
        if (noEventsMessage) {
            noEventsMessage.style.display = 'none';
        }
        if (eventsContainer) {
            eventsContainer.style.display = 'block';
        }
    }
    
    function checkHashNavigation() {
        const hash = window.location.hash;
        if (hash && hash.length > 1) {
            const targetId = hash.substring(1);
            console.log('🔗 Hash-Navigation erkannt:', targetId);
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                console.log('✅ Ziel-Element gefunden, scrolle dorthin');
                
                // Event-Card expandieren falls es eine ist
                if (targetElement.classList.contains('event-card')) {
                    targetElement.classList.add('expanded');
                    console.log('📖 Event-Card expandiert');
                }
                
                // Zum Element scrollen
                targetElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                
                // Kurz hervorheben
                targetElement.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.6)';
                setTimeout(() => {
                    targetElement.style.boxShadow = '';
                }, 2000);
                
            } else {
                console.warn('⚠️ Ziel-Element nicht gefunden:', targetId);
            }
        }
    }
});
