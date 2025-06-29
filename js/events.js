// Events/Termine Page JavaScript
class EventsManager {
    constructor() {
        this.eventsContainer = document.getElementById('events-container');
        this.pastEventsToggle = document.getElementById('past-events-toggle');
        this.noEventsMessage = document.getElementById('no-events');
        this.showPastEvents = false;
        this.eventsData = [];
        
        this.init();
    }
    
    async init() {
        console.log('🔄 EventsManager wird initialisiert...');
        try {
            await this.loadEventsData();
            this.setupEventListeners();
            this.renderEvents();
            console.log('✅ EventsManager erfolgreich initialisiert');
        } catch (error) {
            console.error('❌ Fehler beim Initialisieren des EventsManager:', error);
            this.showNoEventsMessage();
        }
    }
    
    async loadEventsData() {
        try {
            // Load events data from JSON file with cache busting
            const cacheBuster = '?v=' + Date.now();
            const response = await fetch('./data/events.json' + cacheBuster);
            
            console.log('🔄 Loading events from:', './data/events.json' + cacheBuster);
            console.log('📥 Response status:', response.status, response.statusText);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('📋 Events data loaded:', data);
            
            // Process events and mark past events
            const now = new Date();
            this.eventsData = data.events.map(event => {
                const eventDate = new Date(event.date + 'T' + (event.time || '00:00'));
                return {
                    ...event,
                    isPast: eventDate < now
                };
            });
            
            this.eventTypes = data.eventTypes || [];
            this.metadata = data.meta || {};
            
            console.log('✅ Processed events:', this.eventsData.length);
            
        } catch (error) {
            console.error('❌ Error loading events data from JSON:', error);
            
            // Fallback nur bei echten Fehlern verwenden
            console.warn('⚠️ Verwende Fallback-Events aufgrund von Lade-Fehler');
            
            // Fallback to basic events if JSON loading fails
            const now = new Date();
            const futureDate1 = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // +7 days
            const futureDate2 = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000); // +14 days
            const pastDate1 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // -7 days
            
            this.eventsData = [
                {
                    id: "community-event-2025",
                    title: "Community Event 2025 (Fallback)",
                    date: futureDate1.toISOString().split('T')[0],
                    time: "18:00",
                    location: "Discord & Live",
                    description: "Ein großes Community Event mit Spielen, Musik und tollen Überraschungen! (Fallback-Version)",
                    type: "meetup",
                    isPast: false,
                    links: [
                        { url: "https://discord.rosenrausch.xyz", text: "Discord beitreten", type: "primary" }
                    ]
                },
                {
                    id: 1,
                    title: "Community Livestream",
                    date: futureDate1.toISOString().split('T')[0],
                    time: "20:00",
                    location: "Twitch & TikTok",
                    description: "Ein entspannter Livestream mit der Community. Wir spielen Spiele, beantworten Fragen und haben eine gute Zeit zusammen!",
                    type: "livestream",
                    isPast: false,
                    links: [
                        { url: "https://tiktok.rosenrausch.xyz", text: "TikTok Live", type: "primary" },
                        { url: "https://discord.rosenrausch.xyz", text: "Discord beitreten", type: "secondary" }
                    ]
                },
                {
                    id: 2,
                    title: "Neues Musikvideo Premiere",
                    date: futureDate2.toISOString().split('T')[0],
                    time: "19:00",
                    location: "YouTube & Social Media",
                    description: "Die Premiere meines neuesten Musikvideos! Seid dabei wenn es live geht und feiert mit mir.",
                    type: "premiere",
                    isPast: false,
                    links: [
                        { url: "https://spotify.rosenrausch.xyz", text: "Spotify", type: "primary" },
                        { url: "https://applemusik.rosenrausch.xyz", text: "Apple Music", type: "secondary" }
                    ]
                },
                {
                    id: 3,
                    title: "Community Event - Gaming Session",
                    date: pastDate1.toISOString().split('T')[0],
                    time: "18:00",
                    location: "Minecraft Server",
                    description: "Ein gemeinsames Gaming Event auf unserem Minecraft Server. Es war ein großartiger Abend mit der Community!",
                    type: "gaming",
                    isPast: true,
                    links: []
                }
            ];
        }
    }
    
    setupEventListeners() {
        if (this.pastEventsToggle) {
            this.pastEventsToggle.addEventListener('click', () => {
                this.togglePastEvents();
            });
        }
    }
    
    togglePastEvents() {
        this.showPastEvents = !this.showPastEvents;
        this.pastEventsToggle.classList.toggle('active', this.showPastEvents);
        
        const toggleText = this.pastEventsToggle.querySelector('span');
        if (toggleText) {
            toggleText.textContent = this.showPastEvents ? 
                'Vergangene Events verbergen' : 
                'Vergangene Events anzeigen';
        }
        
        this.renderEvents();
    }
    
    renderEvents() {
        console.log('🎨 Rendering events...');
        console.log('📋 Events data:', this.eventsData);
        console.log('🔍 Show past events:', this.showPastEvents);
        
        if (!this.eventsContainer) {
            console.error('❌ Events container nicht gefunden!');
            return;
        }
        
        let eventsToShow = this.eventsData.filter(event => 
            this.showPastEvents || !event.isPast
        );
        
        console.log('📊 Events zu zeigen:', eventsToShow.length);
        
        if (eventsToShow.length === 0) {
            console.log('⚠️ Keine Events zu zeigen - zeige "Keine Events" Nachricht');
            this.showNoEventsMessage();
            return;
        }
        
        console.log('✅ Zeige Events an');
        this.hideNoEventsMessage();
        this.eventsContainer.innerHTML = '';
        
        eventsToShow.forEach((event, index) => {
            console.log(`📝 Erstelle Event-Element für: ${event.title}`);
            const eventElement = this.createEventElement(event, index);
            this.eventsContainer.appendChild(eventElement);
        });
    }
    
    createEventElement(event, index) {
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
        
        const linksHtml = event.links.length > 0 ? `
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
                <div class="event-details">
                    <div class="event-info-item">
                        <i class="fas fa-info-circle"></i>
                        <div>
                            <strong>Event-Typ:</strong>
                            <span>${this.getEventTypeName(event.type)}</span>
                        </div>
                    </div>
                    <div class="event-info-item">
                        <i class="fas fa-calendar-alt"></i>
                        <div>
                            <strong>Datum & Zeit:</strong>
                            <span>${formattedDate}, ${event.time} Uhr</span>
                        </div>
                    </div>
                    <div class="event-info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <div>
                            <strong>Location:</strong>
                            <span>${event.location}</span>
                        </div>
                    </div>
                </div>
                <div class="event-description">
                    <div class="event-description-title">Beschreibung</div>
                    ${event.description}
                </div>
                ${linksHtml}
            </div>
        `;
        
        return eventCard;
    }
    
    getEventTypeName(type) {
        const typeNames = {
            livestream: 'Livestream',
            premiere: 'Premiere',
            gaming: 'Gaming Event',
            concert: 'Konzert',
            meetup: 'Community Meetup'
        };
        
        return typeNames[type] || 'Event';
    }
    
    showNoEventsMessage() {
        if (this.noEventsMessage) {
            this.noEventsMessage.style.display = 'block';
        }
        if (this.eventsContainer) {
            this.eventsContainer.style.display = 'none';
        }
    }
    
    hideNoEventsMessage() {
        if (this.noEventsMessage) {
            this.noEventsMessage.style.display = 'none';
        }
        if (this.eventsContainer) {
            this.eventsContainer.style.display = 'flex';
        }
    }
}

// Events-specific styles
const eventsPageStyles = `
    .event-card.expanded {
        border-color: rgba(168, 85, 247, 0.4);
    }
    
    .event-header {
        cursor: pointer;
        user-select: none;
    }
    
    .event-header:hover {
        background: rgba(168, 85, 247, 0.05);
    }
    
    .event-expand-icon {
        transition: transform 0.3s ease;
    }
    
    .event-card.expanded .event-expand-icon {
        transform: rotate(180deg);
    }
    
    .event-content {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-out, padding 0.3s ease-out;
    }
    
    .event-card.expanded .event-content {
        max-height: 1000px;
        padding-top: 20px;
        border-top: 1px solid rgba(168, 85, 247, 0.1);
    }
    
    .event-actions {
        margin-top: 20px;
    }
    
    .event-button.primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(168, 85, 247, 0.3);
    }
    
    .event-button.secondary:hover {
        transform: translateY(-2px);
    }
    
    @media (max-width: 480px) {
        .event-header {
            padding: 15px;
        }
        
        .event-meta {
            flex-direction: column;
            gap: 5px;
        }
        
        .event-meta span {
            font-size: 0.8rem;
        }
    }
`;

// Inject events styles
const eventsStyleSheet = document.createElement('style');
eventsStyleSheet.textContent = eventsPageStyles;
document.head.appendChild(eventsStyleSheet);

// Initialize events manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔄 DOM geladen, prüfe Events-Container...');
    const eventsContainer = document.getElementById('events-container');
    console.log('📦 Events-Container gefunden:', !!eventsContainer);
    
    if (eventsContainer) {
        console.log('✅ Initialisiere EventsManager...');
        new EventsManager();
    } else {
        console.log('⚠️ Kein Events-Container gefunden - EventsManager wird nicht initialisiert');
    }
});
