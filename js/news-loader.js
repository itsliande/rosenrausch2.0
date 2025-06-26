// News Loader for dynamic content
class NewsLoader {
    constructor() {
        this.newsContainer = document.getElementById('news-items-container');
        this.currentPage = 1;
        this.itemsPerPage = 5;
        this.allNews = [];
        this.displayedNews = [];
        
        this.init();
    }
    
    async init() {
        try {
            await this.loadNews();
            this.displayNews();
        } catch (error) {
            console.error('Error loading news:', error);
            this.showNoNewsMessage();
        }
    }
    
    async loadNews() {
        // Simulate API call or load from JSON file
        // In a real implementation, this would fetch from data/news.json
        this.allNews = [
            {
                id: 1,
                title: "Neuer Song veröffentlicht!",
                content: "Ich habe einen neuen Song auf allen Streaming-Plattformen veröffentlicht. Hört ihn euch an und lasst mich wissen, wie er euch gefällt!",
                date: "2025-01-15",
                links: [
                    { url: "https://spotify.rosenrausch.xyz", text: "Auf Spotify anhören", icon: "fab fa-spotify" },
                    { url: "https://applemusik.rosenrausch.xyz", text: "Auf Apple Music", icon: "fab fa-apple" }
                ]
            },
            {
                id: 2,
                title: "Community Event geplant",
                content: "Bald gibt es ein großes Community Event! Weitere Details folgen in den nächsten Tagen. Bleibt dran!",
                date: "2025-01-10",
                links: [
                    { url: "/termine", text: "Alle Termine ansehen", icon: "fas fa-calendar" }
                ]
            },
            {
                id: 3,
                title: "Discord Server Update",
                content: "Der Discord Server hat neue Channels und Features bekommen. Schaut vorbei und entdeckt die Neuerungen!",
                date: "2025-01-05",
                links: [
                    { url: "https://discord.rosenrausch.xyz", text: "Discord beitreten", icon: "fab fa-discord" }
                ]
            }
        ];
    }
    
    displayNews() {
        if (!this.newsContainer) return;
        
        if (this.allNews.length === 0) {
            this.showNoNewsMessage();
            return;
        }
        
        this.newsContainer.innerHTML = '';
        
        const newsToShow = this.allNews.slice(0, this.itemsPerPage * this.currentPage);
        
        newsToShow.forEach((news, index) => {
            const newsElement = this.createNewsElement(news, index);
            this.newsContainer.appendChild(newsElement);
        });
        
        // Add "Show more" button if there are more news
        if (this.allNews.length > this.itemsPerPage * this.currentPage) {
            this.addShowMoreButton();
        }
    }
    
    createNewsElement(news, index) {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.style.animationDelay = `${index * 0.1}s`;
        
        let linksHtml = '';
        if (news.links && news.links.length > 0) {
            linksHtml = `
                <div class="news-links">
                    ${news.links.map(link => `
                        <a href="${link.url}" target="_blank" class="news-link-button">
                            <i class="${link.icon}"></i>
                            <span>${link.text}</span>
                        </a>
                    `).join('')}
                </div>
            `;
        }
        
        newsItem.innerHTML = `
            <div class="news-date">${this.formatDate(news.date)}</div>
            <h3 class="news-item-title">${news.title}</h3>
            <p class="news-content">${news.content}</p>
            ${linksHtml}
        `;
        
        return newsItem;
    }
    
    addShowMoreButton() {
        const existingButton = document.querySelector('.news-show-more');
        if (existingButton) existingButton.remove();
        
        const showMoreButton = document.createElement('div');
        showMoreButton.className = 'news-show-more';
        showMoreButton.innerHTML = `
            <button class="show-more-btn">
                <i class="fas fa-chevron-down"></i>
                Ältere News anzeigen
            </button>
        `;
        
        showMoreButton.querySelector('button').addEventListener('click', () => {
            this.loadMoreNews();
        });
        
        this.newsContainer.appendChild(showMoreButton);
    }
    
    loadMoreNews() {
        this.currentPage++;
        this.displayNews();
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    showNoNewsMessage() {
        if (!this.newsContainer) return;
        
        this.newsContainer.innerHTML = `
            <div class="no-news-message">
                <i class="fas fa-newspaper"></i>
                <h3>Keine News verfügbar</h3>
                <p>Aktuell gibt es keine News. Schau bald wieder vorbei!</p>
            </div>
        `;
    }
}

// Add news-specific styles
const newsStyles = `
    .news-item {
        margin-bottom: 25px;
        padding: 25px;
        background: rgba(168, 85, 247, 0.1);
        border-radius: 15px;
        border-left: 4px solid rgba(168, 85, 247, 0.4);
        transition: all 0.3s ease;
        animation: fadeInUp 0.8s ease-out;
    }
    
    .news-item:hover {
        transform: translateX(5px);
        background: rgba(168, 85, 247, 0.15);
        border-left-color: rgba(168, 85, 247, 0.6);
    }
    
    .news-date {
        color: #A855F7;
        font-size: 0.9rem;
        margin-bottom: 10px;
        font-weight: 500;
    }
    
    .news-item-title {
        color: #E9D5FF;
        font-size: 1.3rem;
        font-weight: 600;
        margin-bottom: 15px;
    }
    
    .news-content {
        color: #E9D5FF;
        line-height: 1.6;
        margin-bottom: 20px;
        opacity: 0.9;
    }
    
    .news-links {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
    }
    
    .news-link-button {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        background: rgba(168, 85, 247, 0.2);
        color: #E9D5FF;
        text-decoration: none;
        border-radius: 12px;
        font-size: 0.9rem;
        font-weight: 500;
        transition: all 0.3s ease;
        border: 1px solid rgba(168, 85, 247, 0.3);
    }
    
    .news-link-button:hover {
        background: rgba(168, 85, 247, 0.3);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(168, 85, 247, 0.2);
    }
    
    .news-show-more {
        text-align: center;
        margin-top: 25px;
    }
    
    .show-more-btn {
        background: rgba(168, 85, 247, 0.2);
        color: #E9D5FF;
        border: 1px solid rgba(168, 85, 247, 0.3);
        padding: 12px 24px;
        border-radius: 15px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0 auto;
        font-weight: 500;
    }
    
    .show-more-btn:hover {
        background: rgba(168, 85, 247, 0.3);
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(168, 85, 247, 0.2);
    }
    
    .no-news-message {
        text-align: center;
        padding: 50px 30px;
        background: rgba(168, 85, 247, 0.1);
        border-radius: 15px;
        border: 1px solid rgba(168, 85, 247, 0.2);
    }
    
    .no-news-message i {
        font-size: 2.5rem;
        color: #A855F7;
        margin-bottom: 20px;
        opacity: 0.7;
    }
    
    .no-news-message h3 {
        color: #E9D5FF;
        font-size: 1.3rem;
        margin-bottom: 10px;
        font-weight: 600;
    }
    
    .no-news-message p {
        color: #9F7AEA;
        opacity: 0.9;
    }
    
    @media (max-width: 480px) {
        .news-links {
            flex-direction: column;
        }
        
        .news-link-button {
            justify-content: center;
        }
    }
`;

// Inject news styles
const newsStyleSheet = document.createElement('style');
newsStyleSheet.textContent = newsStyles;
document.head.appendChild(newsStyleSheet);

// Initialize news loader when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new NewsLoader();
});
