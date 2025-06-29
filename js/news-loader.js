// News Loader for dynamic content
class NewsLoader {
    constructor() {
        this.newsContainer = document.getElementById('news-items-container');
        this.currentPage = 1;
        this.itemsPerPage = 3; // Only show 3 latest news on main page
        this.allNews = [];
        this.displayedNews = [];
        
        this.init();
    }
    
    async init() {
        try {
            const success = await this.retryLoadNews();
            if (success) {
                this.displayNews();
            } else {
                this.showNoNewsMessage();
            }
        } catch (error) {
            console.error('Error initializing news:', error);
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
            
            // Sort news by date (newest first) and take only first 3
            this.allNews = data.news
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 3); // Force only 3 news items
            
            // Store categories and metadata for potential future use
            this.categories = data.categories || [];
            this.metadata = data.meta || {};
            
        } catch (error) {
            console.error('Error loading news from JSON:', error);
            
            // Fallback to basic news items if JSON loading fails
            this.allNews = [
                {
                    id: 1,
                    title: "Willkommen bei Rosenrausch!",
                    content: "News werden geladen... Falls du diese Nachricht siehst, überprüfe deine Internetverbindung.",
                    date: new Date().toISOString().split('T')[0],
                    category: "general",
                    links: []
                }
            ];
            
            throw error; // Re-throw to be handled by init()
        }
    }
    
    displayNews() {
        if (!this.newsContainer) return;
        
        if (this.allNews.length === 0) {
            this.showNoNewsMessage();
            return;
        }
        
        this.newsContainer.innerHTML = '';
        
        // Ensure only the first 3 news items are shown on main page
        const newsToShow = this.allNews.slice(0, 3);
        
        console.log(`Displaying ${newsToShow.length} news items on main page`);
        
        newsToShow.forEach((news, index) => {
            const newsElement = this.createNewsElement(news, index);
            this.newsContainer.appendChild(newsElement);
        });
        
        // Add "View all news" button pointing to news.html
        this.addViewAllNewsButton();
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
    
    addViewAllNewsButton() {
        const existingButton = document.querySelector('.news-show-more');
        if (existingButton) existingButton.remove();
        
        const viewAllButton = document.createElement('div');
        viewAllButton.className = 'news-show-more';
        viewAllButton.innerHTML = `
            <button class="show-more-btn">
                <i class="fas fa-chevron-down"></i>
                Ältere News anzeigen
            </button>
        `;
        
        // Add click handler to redirect to news.html
        const button = viewAllButton.querySelector('.show-more-btn');
        button.addEventListener('click', () => {
            window.location.href = 'news.html';
        });
        
        this.newsContainer.appendChild(viewAllButton);
    }
    
    // loadMoreNews function removed - now using dedicated news.html page
    
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
                <p>Aktuell gibt es keine News. Schau bald wieder vorbei!</p>
            </div>
        `;
    }
    
    // Additional utility methods
    filterByCategory(categoryId) {
        if (!categoryId || categoryId === 'all') {
            return this.allNews;
        }
        return this.allNews.filter(news => news.category === categoryId);
    }
    
    getFeaturedNews() {
        return this.allNews.filter(news => news.featured);
    }
    
    getRecentNews(count = 3) {
        return this.allNews.slice(0, count);
    }
    
    refreshNews() {
        this.currentPage = 1;
        this.displayedNews = [];
        this.init();
    }
    
    // Error handling and retry mechanism
    async retryLoadNews(maxRetries = 3) {
        for (let i = 0; i < maxRetries; i++) {
            try {
                await this.loadNews();
                return true;
            } catch (error) {
                console.warn(`News loading attempt ${i + 1} failed:`, error);
                if (i === maxRetries - 1) {
                    console.error('All news loading attempts failed');
                    return false;
                }
                // Wait before retry (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
            }
        }
        return false;
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
    
    .news-item.featured {
        border-left: 4px solid #FFD700;
        background: rgba(255, 215, 0, 0.1);
    }
    
    .news-item:hover {
        transform: translateX(5px);
        background: rgba(168, 85, 247, 0.15);
        border-left-color: rgba(168, 85, 247, 0.6);
    }
    
    .news-item.featured:hover {
        background: rgba(255, 215, 0, 0.15);
        border-left-color: #FFD700;
    }
    
    .news-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        flex-wrap: wrap;
        gap: 10px;
    }
    
    .news-date {
        color: #A855F7;
        font-size: 0.9rem;
        font-weight: 500;
    }
    
    .news-category {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        padding: 4px 8px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
    }
    
    .news-item-title {
        color: #E9D5FF;
        font-size: 1.3rem;
        font-weight: 600;
        margin-bottom: 15px;
        margin-top: 0;
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
        background: rgba(168, 85, 247, 0.2);
        transform: none;
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
