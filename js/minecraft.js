// Minecraft server and Discord functionality
class MinecraftManager {
    constructor() {
        this.serverIP = 'play.rosenrausch.de';
        this.discordInvite = 'https://discord.gg/rosenrausch';
        this.serverData = null;
        this.init();
    }

    async init() {
        await this.loadMinecraftData();
        this.setupEventListeners();
        this.loadServerStatus();
        this.startStatusUpdates();
        this.initializeAnimations();
    }

    async loadMinecraftData() {
        try {
            // Load minecraft data from JSON file
            const response = await fetch('data/minecraft.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            this.serverData = await response.json();
            
            // Update server IP and Discord invite from JSON
            this.serverIP = this.serverData.server.ip || this.serverIP;
            this.discordInvite = this.serverData.discord.invite || this.discordInvite;
            
            // Update page elements with data from JSON
            this.updatePageContent();
            
        } catch (error) {
            console.error('Error loading minecraft data from JSON:', error);
            // Continue with default values if JSON loading fails
        }
    }

    updatePageContent() {
        if (!this.serverData) return;

        // Update server IP display
        const serverIPElement = document.getElementById('server-ip');
        if (serverIPElement) {
            serverIPElement.textContent = this.serverIP;
        }

        // Update server description
        const serverDescElements = document.querySelectorAll('.minecraft-card .server-description');
        if (serverDescElements.length > 0 && this.serverData.server.description) {
            serverDescElements[0].textContent = this.serverData.server.description;
        }

        // Update Discord description
        const discordDescElements = document.querySelectorAll('.discord-card .server-description');
        if (discordDescElements.length > 0 && this.serverData.discord.description) {
            discordDescElements[0].textContent = this.serverData.discord.description;
        }
    }

    setupEventListeners() {
        // Copy server IP button
        const copyIPBtn = document.getElementById('copyIPBtn');
        if (copyIPBtn) {
            copyIPBtn.addEventListener('click', () => this.copyServerIP());
        }

        // Copy Discord invite button
        const copyDiscordBtn = document.getElementById('copyDiscordBtn');
        if (copyDiscordBtn) {
            copyDiscordBtn.addEventListener('click', () => this.copyDiscordInvite());
        }

        // Join server button
        const joinServerBtn = document.getElementById('joinServerBtn');
        if (joinServerBtn) {
            joinServerBtn.addEventListener('click', () => this.joinMinecraftServer());
        }

        // Join Discord button
        const joinDiscordBtn = document.getElementById('joinDiscordBtn');
        if (joinDiscordBtn) {
            joinDiscordBtn.addEventListener('click', () => this.joinDiscord());
        }

        // Refresh status button
        const refreshBtn = document.getElementById('refreshStatusBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.loadServerStatus());
        }

        // Rules accordion
        this.setupRulesAccordion();

        // Gallery modal
        this.setupGalleryModal();
    }

    async loadServerStatus() {
        const statusContainer = document.getElementById('serverStatus');
        if (!statusContainer) return;

        // Show loading state
        statusContainer.innerHTML = `
            <div class="status-loading">
                <i class="fas fa-spinner fa-spin"></i>
                <span>Serverstatus wird geladen...</span>
            </div>
        `;

        try {
            // Simulate server status check (replace with actual API call)
            const status = await this.checkServerStatus();
            this.displayServerStatus(status);
        } catch (error) {
            this.displayServerError();
        }
    }

    async checkServerStatus() {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock server data (replace with actual API call)
        return {
            online: Math.random() > 0.2, // 80% chance server is online
            players: {
                current: Math.floor(Math.random() * 20) + 1,
                max: 50
            },
            version: '1.20.4',
            motd: 'Willkommen auf dem Rosenrausch Server!',
            latency: Math.floor(Math.random() * 50) + 10
        };
    }

    displayServerStatus(status) {
        const statusContainer = document.getElementById('serverStatus');
        if (!statusContainer) return;

        const statusClass = status.online ? 'online' : 'offline';
        const statusText = status.online ? 'Online' : 'Offline';
        const statusIcon = status.online ? 'fa-check-circle' : 'fa-times-circle';

        statusContainer.innerHTML = `
            <div class="server-status ${statusClass}">
                <div class="status-header">
                    <i class="fas ${statusIcon}"></i>
                    <h3>Server Status: ${statusText}</h3>
                </div>
                ${status.online ? `
                    <div class="status-details">
                        <div class="status-item">
                            <span class="label">Spieler:</span>
                            <span class="value">${status.players.current}/${status.players.max}</span>
                        </div>
                        <div class="status-item">
                            <span class="label">Version:</span>
                            <span class="value">${status.version}</span>
                        </div>
                        <div class="status-item">
                            <span class="label">Ping:</span>
                            <span class="value">${status.latency}ms</span>
                        </div>
                        <div class="status-item motd">
                            <span class="label">MOTD:</span>
                            <span class="value">${status.motd}</span>
                        </div>
                    </div>
                    <div class="player-bar">
                        <div class="player-fill" style="width: ${(status.players.current / status.players.max) * 100}%"></div>
                    </div>
                ` : `
                    <div class="status-offline">
                        <p>Der Server ist momentan nicht erreichbar.</p>
                        <p>Versuche es später erneut oder kontaktiere uns auf Discord.</p>
                    </div>
                `}
            </div>
        `;

        // Add animation
        statusContainer.classList.add('status-updated');
        setTimeout(() => statusContainer.classList.remove('status-updated'), 1000);
    }

    displayServerError() {
        const statusContainer = document.getElementById('serverStatus');
        if (!statusContainer) return;

        statusContainer.innerHTML = `
            <div class="server-status error">
                <div class="status-header">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Fehler beim Laden</h3>
                </div>
                <div class="status-error">
                    <p>Serverstatus konnte nicht geladen werden.</p>
                    <button id="retryStatusBtn" class="btn btn-secondary">
                        <i class="fas fa-redo"></i>
                        Erneut versuchen
                    </button>
                </div>
            </div>
        `;

        // Add retry functionality
        document.getElementById('retryStatusBtn')?.addEventListener('click', () => {
            this.loadServerStatus();
        });
    }

    copyServerIP() {
        navigator.clipboard.writeText(this.serverIP).then(() => {
            this.showToast('Server-IP kopiert!', 'success');
            
            // Update button temporarily
            const btn = document.getElementById('copyIPBtn');
            if (btn) {
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i> Kopiert!';
                btn.classList.add('copied');
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.remove('copied');
                }, 2000);
            }
        }).catch(() => {
            this.showToast('Fehler beim Kopieren', 'error');
        });
    }

    copyDiscordInvite() {
        navigator.clipboard.writeText(this.discordInvite).then(() => {
            this.showToast('Discord-Link kopiert!', 'success');
            
            // Update button temporarily
            const btn = document.getElementById('copyDiscordBtn');
            if (btn) {
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i> Kopiert!';
                btn.classList.add('copied');
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.remove('copied');
                }, 2000);
            }
        }).catch(() => {
            this.showToast('Fehler beim Kopieren', 'error');
        });
    }

    joinMinecraftServer() {
        // Try to open Minecraft with server IP
        const minecraftUrl = `minecraft://${this.serverIP}`;
        window.location.href = minecraftUrl;
        
        this.showToast('Minecraft wird geöffnet...', 'info');
        
        // Fallback: show instructions
        setTimeout(() => {
            this.showJoinInstructions();
        }, 2000);
    }

    joinDiscord() {
        window.open(this.discordInvite, '_blank');
    }

    showJoinInstructions() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content join-instructions">
                <div class="modal-header">
                    <h3>Server beitreten</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="instruction-step">
                        <span class="step-number">1</span>
                        <div class="step-content">
                            <h4>Minecraft starten</h4>
                            <p>Öffne Minecraft und gehe zu "Multiplayer"</p>
                        </div>
                    </div>
                    <div class="instruction-step">
                        <span class="step-number">2</span>
                        <div class="step-content">
                            <h4>Server hinzufügen</h4>
                            <p>Klicke auf "Server hinzufügen" oder "Direktverbindung"</p>
                        </div>
                    </div>
                    <div class="instruction-step">
                        <span class="step-number">3</span>
                        <div class="step-content">
                            <h4>IP eingeben</h4>
                            <div class="server-ip-display">
                                <code>${this.serverIP}</code>
                                <button class="copy-ip-small" onclick="minecraftManager.copyServerIP()">
                                    <i class="fas fa-copy"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="instruction-step">
                        <span class="step-number">4</span>
                        <div class="step-content">
                            <h4>Verbinden</h4>
                            <p>Klicke auf "Dem Server beitreten" und hab Spaß!</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal;

        closeBtn.addEventListener('click', () => this.closeModal(modal));
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.closeModal(modal);
        });

        // Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                this.closeModal(modal);
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    setupRulesAccordion() {
        const ruleHeaders = document.querySelectorAll('.rule-header');
        ruleHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const ruleItem = header.parentElement;
                const isActive = ruleItem.classList.contains('active');
                
                // Close all other rules
                document.querySelectorAll('.rule-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Toggle current rule
                if (!isActive) {
                    ruleItem.classList.add('active');
                }
            });
        });
    }

    setupGalleryModal() {
        const galleryImages = document.querySelectorAll('.gallery-image');
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                this.openImageModal(img.src, img.alt);
            });
        });
    }

    openImageModal(src, alt) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img src="${src}" alt="${alt}" class="modal-image">
                <div class="image-caption">${alt}</div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => this.closeModal(modal));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal(modal);
        });

        // Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                this.closeModal(modal);
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    closeModal(modal) {
        modal.classList.add('closing');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }

    startStatusUpdates() {
        // Update server status every 5 minutes
        setInterval(() => {
            this.loadServerStatus();
        }, 5 * 60 * 1000);
    }

    initializeAnimations() {
        // Add ripple effect to buttons
        const buttons = document.querySelectorAll('.btn, .server-card, .discord-card');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRipple(e);
            });
        });
    }

    createRipple(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-times-circle',
            info: 'fa-info-circle'
        };
        
        toast.innerHTML = `
            <i class="fas ${icons[type]}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    getOnlinePlayerCount() {
        // This would typically fetch from a real API
        return Math.floor(Math.random() * 20) + 1;
    }

    formatUptime(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days}d ${hours % 24}h`;
        if (hours > 0) return `${hours}h ${minutes % 60}m`;
        return `${minutes}m ${seconds % 60}s`;
    }
}

// Initialize Minecraft manager when DOM is loaded
let minecraftManager;

document.addEventListener('DOMContentLoaded', () => {
    minecraftManager = new MinecraftManager();
});

// Export for global access
window.minecraftManager = minecraftManager;
