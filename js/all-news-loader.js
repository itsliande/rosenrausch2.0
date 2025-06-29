// All News Loader for news.html page
class AllNewsLoader {
    constructor() {
        this.newsContainer = document.getElementById('all-news-items-container');
        this.currentPage = 1;
        this.itemsPerPage = 8; // More items per page on the dedicated news page
        this.allNews = [];
        this.displayedNews = [];
        
        this.init();
    }
    
    async init() {
        try {
            const success = await this.retryLoadNews();
            if (success) {
                this.displayAllNews();
            } else {
                this.showNoNewsMessage();
            }
        } catch (error) {
            console.error('Error initializing all news:', error);
            this.showNoNewsMessage();
        }
    }
    
    async loadNews() {
        try {
            // Fetch news data from JSON file with cache busting
            const cacheBuster = new Date().getTime();
            const response = await fetch(`data/news.json?v=${cacheBuster}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Sort news by date (newest first)
            this.allNews = data.news.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            // Store categories and metadata for potential future use
            this.categories = data.categories || [];
            this.metadata = data.meta || {};
            
        } catch (error) {
            console.error('Error loading news from JSON:', error);
            
            // Fallback to basic news items if JSON loading fails
            this.allNews = [
                {
                    "id": "001",
                    "title": "Neuer Song veröffentlicht!",
                    "content": "Ich habe einen neuen Song auf allen Streaming-Plattformen veröffentlicht. Hört ihn euch an und lasst mich wissen, wie er euch gefällt!",
                    "date": "2025-01-15",
                    "category": "music",
                    "featured": true,
                    "links": [
                        {
                            "text": "Auf Spotify anhören",
                            "url": "https://spotify.rosenrausch.xyz",
                            "icon": "fab fa-spotify"
                        },
                        {
                            "text": "Auf Apple Music",
                            "url": "https://applemusik.rosenrausch.xyz",
                            "icon": "fab fa-apple"
                        }
                    ]
                }
            ];
            
            this.categories = [
                { "id": "music", "name": "Musik", "icon": "fas fa-music", "color": "#1DB954" },
                { "id": "events", "name": "Events", "icon": "fas fa-calendar-alt", "color": "#FF6B6B" },
                { "id": "community", "name": "Community", "icon": "fas fa-users", "color": "#4ECDC4" },
                { "id": "general", "name": "Allgemein", "icon": "fas fa-info-circle", "color": "#96CEB4" },
                { "id": "minecraft", "name": "Minecraft", "icon": "fas fa-cube", "color": "#45B7D1" }
            ];
        }
        
        return true;
    }
    
    async retryLoadNews(maxRetries = 3) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                await this.loadNews();
                return true;
            } catch (error) {
                console.warn(`News loading attempt ${attempt} failed:`, error);
                if (attempt === maxRetries) {
                    return false;
                }
                // Wait before retrying (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, attempt * 1000));
            }
        }
        return false;
    }
    
    displayAllNews() {
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
        if (news.featured) {
            newsItem.classList.add('featured');
        }
        newsItem.style.animationDelay = `${index * 0.1}s`;
        
        // Get category info
        const category = this.getCategoryInfo(news.category);
        
        let categoryHtml = '';
        if (category) {
            categoryHtml = `
                <div class="news-category" style="color: ${category.color}">
                    <i class="${category.icon}"></i>
                    <span>${category.name}</span>
                </div>
            `;
        }
        
        let linksHtml = '';
        if (news.links && news.links.length > 0) {
            linksHtml = `
                <div class="news-links">
                    ${news.links.map(link => `
                        <a href="${link.url}" ${link.url.startsWith('http') ? 'target="_blank"' : ''} class="news-link-button">
                            <i class="${link.icon}"></i>
                            <span>${link.text}</span>
                        </a>
                    `).join('')}
                </div>
            `;
        }
        
        newsItem.innerHTML = `
            <div class="news-header">
                <div class="news-date">${this.formatDate(news.date)}</div>
                ${categoryHtml}
            </div>
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
                Weitere News laden
            </button>
        `;
        
        showMoreButton.querySelector('button').addEventListener('click', () => {
            this.loadMoreNews();
        });
        
        this.newsContainer.appendChild(showMoreButton);
    }
    
    loadMoreNews() {
        this.currentPage++;
        this.displayAllNews();
    }
    
    getCategoryInfo(categoryId) {
        if (!this.categories || !categoryId) return null;
        return this.categories.find(cat => cat.id === categoryId);
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
                <p>Aktuell sind keine Neuigkeiten vorhanden. Schau später wieder vorbei!</p>
            </div>
        `;
    }
}

// Initialize all news loader when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new AllNewsLoader();
});
