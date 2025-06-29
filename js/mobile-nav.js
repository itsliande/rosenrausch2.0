// Mobile Navigation Handler
document.addEventListener('DOMContentLoaded', function() {
    // Handle mobile navigation if needed
    const navbar = document.querySelector('.navbar');
    const navItems = document.querySelectorAll('.nav-item');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    // Modern hamburger menu functionality
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.classList.toggle('nav-open');
        });
        
        // Close menu when clicking nav items
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.classList.remove('nav-open');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                !navbar.contains(e.target) && 
                navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
        
        // Add touch event listeners to prevent scrolling in nav menu
        navMenu.addEventListener('touchmove', function(e) {
            if (navMenu.classList.contains('active')) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Prevent scroll restoration when orientation changes
        window.addEventListener('orientationchange', function() {
            if (navMenu.classList.contains('active')) {
                setTimeout(() => {
                    document.body.classList.add('nav-open');
                }, 100);
            }
        });
    }
    
    // Legacy mobile toggle functionality (for pages with old nav structure)
    function createMobileToggle() {
        if (window.innerWidth <= 768 && !hamburger) {
            if (!document.querySelector('.mobile-nav-toggle')) {
                const toggleBtn = document.createElement('button');
                toggleBtn.className = 'mobile-nav-toggle';
                toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
                toggleBtn.addEventListener('click', toggleMobileNav);
                document.body.appendChild(toggleBtn);
            }
        } else if (!hamburger) {
            const existingToggle = document.querySelector('.mobile-nav-toggle');
            if (existingToggle) {
                existingToggle.remove();
            }
            navbar.classList.remove('mobile-open');
        }
    }
    
    function toggleMobileNav() {
        navbar.classList.toggle('mobile-open');
        const toggle = document.querySelector('.mobile-nav-toggle');
        const icon = toggle.querySelector('i');
        
        if (navbar.classList.contains('mobile-open')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    }
    
    // Handle nav item clicks on mobile
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navbar.classList.remove('mobile-open');
                const toggle = document.querySelector('.mobile-nav-toggle');
                if (toggle) {
                    toggle.querySelector('i').className = 'fas fa-bars';
                }
            }
        });
    });
    
    // Handle resize
    window.addEventListener('resize', createMobileToggle);
    createMobileToggle();
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !navbar.contains(e.target) && 
            !e.target.closest('.mobile-nav-toggle')) {
            navbar.classList.remove('mobile-open');
            const toggle = document.querySelector('.mobile-nav-toggle');
            if (toggle) {
                toggle.querySelector('i').className = 'fas fa-bars';
            }
        }
    });
});

// Add mobile navigation styles
const mobileNavStyles = `
    .mobile-nav-toggle {
        display: none;
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(168, 85, 247, 0.3);
        color: #E9D5FF;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 1.2rem;
        z-index: 1001;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(168, 85, 247, 0.2);
    }
    
    .mobile-nav-toggle:hover {
        background: rgba(168, 85, 247, 0.5);
        transform: scale(1.1);
    }
    
    @media (max-width: 768px) {
        .mobile-nav-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .navbar.mobile-open {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(26, 16, 51, 0.95);
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 30px;
            z-index: 1000;
        }
        
        .navbar.mobile-open .nav-item {
            font-size: 1.2rem;
            padding: 15px 30px;
        }
    }
`;

// Inject mobile navigation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileNavStyles;
document.head.appendChild(styleSheet);
