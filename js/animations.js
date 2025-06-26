// Animation Controller
class AnimationController {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupParallaxEffects();
        this.setupHoverEffects();
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate in
        document.querySelectorAll('.glass-card, .news-container, .link-button, .team-member, .event-card, .quote-card, .server-card, .rule-item').forEach(el => {
            observer.observe(el);
        });
    }
    
    setupParallaxEffects() {
        // Parallax effects disabled for professional appearance
    }
    
    setupHoverEffects() {
        // Enhanced hover effects disabled for professional appearance
    }
    
    createRippleEffect(e) {
        // Ripple effect disabled for professional appearance
    }
    
    // Smooth scroll functionality
    smoothScrollTo(target, duration = 1000) {
        const targetPosition = target.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }
}

// Enhanced animation styles
const animationStyles = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
            opacity: 0.8;
        }
        50% {
            transform: scale(1.05);
            opacity: 1;
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease-out;
    }
    
    .animate-pulse {
        animation: pulse 2s ease-in-out infinite;
    }
    
    .animate-float {
        animation: float 3s ease-in-out infinite;
    }
    
    /* Smooth transitions for all interactive elements */
    * {
        transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
    }
    
    /* Scroll behavior */
    html {
        scroll-behavior: smooth;
    }
    
    /* Loading states */
    .loading {
        opacity: 0.7;
        pointer-events: none;
        position: relative;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid rgba(168, 85, 247, 0.3);
        border-radius: 50%;
        border-top-color: #A855F7;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
    
    /* Enhanced focus states for accessibility */
    .link-button:focus,
    .nav-item:focus,
    .server-button:focus,
    button:focus,
    input:focus {
        outline: 2px solid #A855F7;
        outline-offset: 2px;
    }
    
    /* Reduced motion for users who prefer it */
    @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        .rose-decoration {
            animation: none !important;
        }
        
        html {
            scroll-behavior: auto;
        }
    }
`;

// Inject animation styles
const animationStyleSheet = document.createElement('style');
animationStyleSheet.textContent = animationStyles;
document.head.appendChild(animationStyleSheet);

// Initialize animation controller
document.addEventListener('DOMContentLoaded', function() {
    new AnimationController();
    
    // Add loading class removal after page load
    window.addEventListener('load', () => {
        document.body.classList.remove('loading');
    });
    
    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
