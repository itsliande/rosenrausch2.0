// Quotes data and functionality
const quotesData = [
    {
        id: 1,
        quote: "Das war der beste Stream ever! Die Community ist einfach amazing!",
        author: "Rosenrausch",
        context: "Nach dem 12-Stunden Marathon Stream",
        category: "stream",
        timestamp: "2024-01-15",
        likes: 142
    },
    {
        id: 2,
        quote: "Minecraft ist Leben, Minecraft ist Liebe. Wer braucht schon Real Life?",
        author: "Rosenrausch",
        context: "Während des Castle-Builds",
        category: "minecraft",
        timestamp: "2024-01-20",
        likes: 89
    },
    {
        id: 3,
        quote: "Chat, ihr seid die besten! Ohne euch wäre ich nichts!",
        author: "Rosenrausch",
        context: "Bei 1000 Followern",
        category: "community",
        timestamp: "2024-02-01",
        likes: 234
    },
    {
        id: 4,
        quote: "Dieser Boss ist unmöglich! ...oder ich bin einfach schlecht",
        author: "Rosenrausch",
        context: "Dark Souls Stream",
        category: "gaming",
        timestamp: "2024-02-10",
        likes: 67
    },
    {
        id: 5,
        quote: "Die Rosen blühen wieder, der Rausch beginnt von neuem!",
        author: "Rosenrausch",
        context: "Stream-Comeback nach Pause",
        category: "stream",
        timestamp: "2024-02-15",
        likes: 156
    },
    {
        id: 6,
        quote: "Kaffee ist mein Lebenselixier. Ohne Kaffee, kein Stream!",
        author: "Rosenrausch",
        context: "Morgendlicher Stream-Start",
        category: "lifestyle",
        timestamp: "2024-02-20",
        likes: 78
    },
    {
        id: 7,
        quote: "Die Community entscheidet! Demokratie im Stream!",
        author: "Rosenrausch",
        context: "Bei schwierigen Entscheidungen",
        category: "community",
        timestamp: "2024-02-25",
        likes: 91
    },
    {
        id: 8,
        quote: "Fail nach Fail nach Fail... aber das macht es interessant!",
        author: "Rosenrausch",
        context: "Während schwieriger Gameplay-Momente",
        category: "gaming",
        timestamp: "2024-03-01",
        likes: 123
    }
];

class QuotesManager {
    constructor() {
        this.quotes = quotesData;
        this.currentFilter = 'all';
        this.currentSort = 'newest';
        this.init();
    }

    init() {
        this.renderQuotes();
        this.setupEventListeners();
        this.updateStats();
    }

    setupEventListeners() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.setFilter(filter);
            });
        });

        // Sort dropdown
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.renderQuotes();
            });
        }

        // Search functionality
        const searchInput = document.getElementById('quoteSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuotes(e.target.value);
            });
        }

        // Like buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('like-btn')) {
                const quoteId = parseInt(e.target.dataset.quoteId);
                this.toggleLike(quoteId);
            }
        });
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.renderQuotes();
    }

    renderQuotes() {
        const container = document.getElementById('quotesContainer');
        if (!container) return;

        let filteredQuotes = this.getFilteredQuotes();
        filteredQuotes = this.sortQuotes(filteredQuotes);

        if (filteredQuotes.length === 0) {
            container.innerHTML = `
                <div class="no-quotes">
                    <i class="fas fa-quote-left"></i>
                    <p>Keine Zitate gefunden.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredQuotes.map(quote => `
            <div class="quote-card" data-aos="fade-up">
                <div class="quote-header">
                    <div class="quote-category">
                        <span class="category-tag ${quote.category}">${this.getCategoryName(quote.category)}</span>
                    </div>
                    <div class="quote-date">${this.formatDate(quote.timestamp)}</div>
                </div>
                <div class="quote-content">
                    <i class="fas fa-quote-left quote-icon"></i>
                    <p class="quote-text">${quote.quote}</p>
                </div>
                <div class="quote-context">
                    <p><strong>Kontext:</strong> ${quote.context}</p>
                </div>
                <div class="quote-footer">
                    <div class="quote-author">
                        <i class="fas fa-user"></i>
                        <span>${quote.author}</span>
                    </div>
                    <div class="quote-actions">
                        <button class="like-btn" data-quote-id="${quote.id}">
                            <i class="fas fa-heart"></i>
                            <span>${quote.likes}</span>
                        </button>
                        <button class="share-btn" onclick="quotesManager.shareQuote(${quote.id})">
                            <i class="fas fa-share"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Reinitialize AOS for new elements
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }

    getFilteredQuotes() {
        if (this.currentFilter === 'all') {
            return this.quotes;
        }
        return this.quotes.filter(quote => quote.category === this.currentFilter);
    }

    sortQuotes(quotes) {
        return quotes.sort((a, b) => {
            switch (this.currentSort) {
                case 'newest':
                    return new Date(b.timestamp) - new Date(a.timestamp);
                case 'oldest':
                    return new Date(a.timestamp) - new Date(b.timestamp);
                case 'popular':
                    return b.likes - a.likes;
                default:
                    return 0;
            }
        });
    }

    searchQuotes(searchTerm) {
        const container = document.getElementById('quotesContainer');
        if (!container) return;

        if (!searchTerm.trim()) {
            this.renderQuotes();
            return;
        }

        const filteredQuotes = this.quotes.filter(quote => 
            quote.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quote.context.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quote.author.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filteredQuotes.length === 0) {
            container.innerHTML = `
                <div class="no-quotes">
                    <i class="fas fa-search"></i>
                    <p>Keine Zitate für "${searchTerm}" gefunden.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredQuotes.map(quote => `
            <div class="quote-card" data-aos="fade-up">
                <div class="quote-header">
                    <div class="quote-category">
                        <span class="category-tag ${quote.category}">${this.getCategoryName(quote.category)}</span>
                    </div>
                    <div class="quote-date">${this.formatDate(quote.timestamp)}</div>
                </div>
                <div class="quote-content">
                    <i class="fas fa-quote-left quote-icon"></i>
                    <p class="quote-text">${this.highlightSearchTerm(quote.quote, searchTerm)}</p>
                </div>
                <div class="quote-context">
                    <p><strong>Kontext:</strong> ${this.highlightSearchTerm(quote.context, searchTerm)}</p>
                </div>
                <div class="quote-footer">
                    <div class="quote-author">
                        <i class="fas fa-user"></i>
                        <span>${quote.author}</span>
                    </div>
                    <div class="quote-actions">
                        <button class="like-btn" data-quote-id="${quote.id}">
                            <i class="fas fa-heart"></i>
                            <span>${quote.likes}</span>
                        </button>
                        <button class="share-btn" onclick="quotesManager.shareQuote(${quote.id})">
                            <i class="fas fa-share"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    highlightSearchTerm(text, searchTerm) {
        if (!searchTerm.trim()) return text;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    toggleLike(quoteId) {
        const quote = this.quotes.find(q => q.id === quoteId);
        if (quote) {
            quote.likes += 1;
            
            // Update the like count in the DOM
            const likeBtn = document.querySelector(`[data-quote-id="${quoteId}"]`);
            if (likeBtn) {
                const likeCount = likeBtn.querySelector('span');
                likeCount.textContent = quote.likes;
                
                // Add animation
                likeBtn.classList.add('liked');
                setTimeout(() => {
                    likeBtn.classList.remove('liked');
                }, 300);
            }

            this.updateStats();
        }
    }

    shareQuote(quoteId) {
        const quote = this.quotes.find(q => q.id === quoteId);
        if (quote) {
            if (navigator.share) {
                navigator.share({
                    title: 'Rosenrausch Zitat',
                    text: `"${quote.quote}" - ${quote.author}`,
                    url: window.location.href
                });
            } else {
                // Fallback: copy to clipboard
                const text = `"${quote.quote}" - ${quote.author}\n\n${window.location.href}`;
                navigator.clipboard.writeText(text).then(() => {
                    this.showToast('Zitat in Zwischenablage kopiert!');
                });
            }
        }
    }

    getCategoryName(category) {
        const categories = {
            'stream': 'Stream',
            'minecraft': 'Minecraft',
            'community': 'Community',
            'gaming': 'Gaming',
            'lifestyle': 'Lifestyle'
        };
        return categories[category] || category;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    updateStats() {
        const totalQuotes = this.quotes.length;
        const totalLikes = this.quotes.reduce((sum, quote) => sum + quote.likes, 0);
        
        // Update stats in the DOM if elements exist
        const statsContainer = document.querySelector('.quotes-stats');
        if (statsContainer) {
            statsContainer.innerHTML = `
                <div class="stat-item">
                    <span class="stat-number">${totalQuotes}</span>
                    <span class="stat-label">Zitate</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${totalLikes}</span>
                    <span class="stat-label">Likes</span>
                </div>
            `;
        }
    }

    showToast(message) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    }

    getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * this.quotes.length);
        return this.quotes[randomIndex];
    }
}

// Initialize quotes manager when DOM is loaded
let quotesManager;

document.addEventListener('DOMContentLoaded', () => {
    quotesManager = new QuotesManager();
});

// Export for use in other scripts
window.quotesManager = quotesManager;
