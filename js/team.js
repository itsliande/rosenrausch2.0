// Team Page JavaScript
class TeamManager {
    constructor() {
        this.teamContainer = document.getElementById('team-grid');
        this.teamData = [];
        this.init();
    }
    
    async init() {
        try {
            await this.loadTeamData();
            this.renderTeam();
        } catch (error) {
            console.error('Error loading team data:', error);
            this.showErrorMessage();
        }
    }
    
    async loadTeamData() {
        // Simulate loading team data
        // In a real implementation, this would fetch from data/team.json
        this.teamData = [
            {
                id: 1,
                name: "Rosenrausch",
                role: "Gründer & Künstler",
                bio: "Der kreative Kopf hinter Rosenrausch. Musik, Content Creation und Community sind meine Leidenschaft.",
                image: "images/profile.jpg",
                category: "leadership",
                social: {
                    instagram: "https://instagram.rosenrausch.xyz",
                    tiktok: "https://tiktok.rosenrausch.xyz",
                    spotify: "https://spotify.rosenrausch.xyz"
                }
            },
            {
                id: 2,
                name: "Community Manager",
                role: "Community Management",
                bio: "Ich sorge dafür, dass unsere Community ein freundlicher und einladender Ort bleibt.",
                image: "images/team1.jpg",
                category: "team",
                social: {
                    discord: "https://discord.rosenrausch.xyz"
                }
            },
            {
                id: 3,
                name: "Content Creator",
                role: "Content & Design",
                bio: "Kreative Inhalte und visuelles Design sind mein Spezialgebiet.",
                image: "images/team2.jpg",
                category: "team",
                social: {
                    instagram: "https://instagram.rosenrausch.xyz"
                }
            }
        ];
    }
    
    renderTeam() {
        if (!this.teamContainer) return;
        
        if (this.teamData.length === 0) {
            this.showErrorMessage();
            return;
        }
        
        // Group team members by category
        const categories = this.groupByCategory();
        
        this.teamContainer.innerHTML = '';
        
        Object.entries(categories).forEach(([category, members]) => {
            const categorySection = this.createCategorySection(category, members);
            this.teamContainer.appendChild(categorySection);
        });
    }
    
    groupByCategory() {
        const categories = {};
        
        this.teamData.forEach(member => {
            const category = member.category || 'team';
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push(member);
        });
        
        return categories;
    }
    
    createCategorySection(category, members) {
        const section = document.createElement('div');
        section.className = 'team-category';
        
        const categoryTitles = {
            leadership: 'Führung',
            team: 'Team Mitglieder',
            moderators: 'Moderatoren',
            contributors: 'Mitwirkende'
        };
        
        const title = categoryTitles[category] || 'Team';
        
        section.innerHTML = `
            <h2 class="category-title">${title}</h2>
            <div class="category-members" data-member-count="${members.length}">
                ${members.map((member, index) => this.createMemberCard(member, index)).join('')}
            </div>
        `;
        
        return section;
    }
    
    createMemberCard(member, index) {
        const socialLinks = this.createSocialLinks(member.social);
        
        return `
            <div class="team-member" style="animation-delay: ${index * 0.1}s">
                <img src="${member.image}" alt="${member.name}" loading="lazy">
                <h3>${member.name}</h3>
                <div class="role">${member.role}</div>
                <p class="bio">${member.bio}</p>
                ${socialLinks}
            </div>
        `;
    }
    
    createSocialLinks(social) {
        if (!social || Object.keys(social).length === 0) {
            return '';
        }
        
        const iconMap = {
            instagram: 'fab fa-instagram',
            tiktok: 'fab fa-tiktok',
            spotify: 'fab fa-spotify',
            discord: 'fab fa-discord',
            twitter: 'fab fa-twitter',
            youtube: 'fab fa-youtube',
            twitch: 'fab fa-twitch'
        };
        
        const links = Object.entries(social).map(([platform, url]) => {
            const icon = iconMap[platform] || 'fas fa-link';
            return `<a href="${url}" target="_blank" title="${platform}"><i class="${icon}"></i></a>`;
        }).join('');
        
        return `<div class="social-links">${links}</div>`;
    }
    
    showErrorMessage() {
        if (!this.teamContainer) return;
        
        this.teamContainer.innerHTML = `
            <div class="team-error">
                <i class="fas fa-users-slash"></i>
                <h3>Team-Daten konnten nicht geladen werden</h3>
                <p>Entschuldigung, die Team-Informationen sind momentan nicht verfügbar.</p>
            </div>
        `;
    }
}

// Team-specific styles
const teamPageStyles = `
    .team-error {
        text-align: center;
        padding: 60px 40px;
        background: rgba(26, 16, 51, 0.7);
        backdrop-filter: blur(20px);
        border-radius: 20px;
        border: 1px solid rgba(168, 85, 247, 0.2);
        margin: 40px 0;
        grid-column: 1 / -1;
    }
    
    .team-error i {
        font-size: 3rem;
        color: #A855F7;
        margin-bottom: 20px;
        opacity: 0.7;
    }
    
    .team-error h3 {
        color: #E9D5FF;
        font-size: 1.5rem;
        margin-bottom: 15px;
        font-weight: 600;
    }
    
    .team-error p {
        color: #9F7AEA;
        line-height: 1.6;
        opacity: 0.9;
    }
    
    .team-member img {
        transition: all 0.3s ease;
    }
    
    .team-member:hover img {
        transform: none;
    }
    
    .social-links a {
        position: relative;
        overflow: hidden;
    }
    
    .social-links a::before {
        display: none;
    }
    
    .social-links a:hover::before {
        display: none;
    }
`;

// Inject team styles
const teamStyleSheet = document.createElement('style');
teamStyleSheet.textContent = teamPageStyles;
document.head.appendChild(teamStyleSheet);

// Initialize team manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('team-grid')) {
        new TeamManager();
    }
});
