// Script to update all error pages with consistent design
const fs = require('fs');
const path = require('path');

const errorPages = ['403.html', '401.html', '500.html', '418.html', 'error.html'];

const navigationHTML = `    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="index.html">
                    <i class="fas fa-rose"></i>
                    <span>Rosenrausch</span>
                </a>
            </div>
            
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="index.html" class="nav-link">
                        <i class="fas fa-home"></i>
                        <span>Home</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="team.html" class="nav-link">
                        <i class="fas fa-users"></i>
                        <span>Team</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="termine.html" class="nav-link">
                        <i class="fas fa-calendar"></i>
                        <span>Termine</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="minecraft.html" class="nav-link">
                        <i class="fas fa-cube"></i>
                        <span>Minecraft</span>
                    </a>
                </li>
            </ul>

            <div class="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
    </nav>`;

const navigationCSS = `        .navbar {
            background: rgba(26, 16, 51, 0.8);
            backdrop-filter: blur(15px);
            border-bottom: 1px solid rgba(168, 85, 247, 0.2);
            padding: 20px;
            position: sticky;
            top: 0;
            z-index: 1000;
            transition: all 0.3s ease;
        }

        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .nav-logo a {
            color: white;
            text-decoration: none;
            font-size: 1.5rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .nav-logo i {
            color: #A855F7;
        }

        .nav-menu {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 2rem;
        }

        .nav-link {
            color: #E9D5FF;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 25px;
            transition: all 0.3s ease;
            font-weight: 500;
            letter-spacing: 0.5px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .nav-link:hover {
            background: rgba(168, 85, 247, 0.15);
            color: white;
        }

        .hamburger {
            display: none;
            flex-direction: column;
            cursor: pointer;
            gap: 4px;
        }

        .bar {
            width: 25px;
            height: 3px;
            background: white;
            border-radius: 2px;
            transition: 0.3s;
        }

        .footer {
            color: #9F7AEA;
            text-align: center;
            padding: 30px 20px;
            margin-top: 50px;
            font-size: 0.9rem;
            border-top: 1px solid rgba(168, 85, 247, 0.1);
        }

        /* Mobile Navigation */
        @media (max-width: 768px) {
            .nav-container {
                padding: 0 1rem;
            }
            
            .nav-menu {
                position: fixed;
                left: -100%;
                top: 70px;
                flex-direction: column;
                background: rgba(26, 16, 51, 0.95);
                width: 100%;
                text-align: center;
                transition: 0.3s;
                backdrop-filter: blur(20px);
                border-top: 1px solid rgba(168, 85, 247, 0.2);
                padding: 2rem 0;
            }

            .nav-menu.active {
                left: 0;
            }

            .hamburger {
                display: flex;
            }

            .hamburger.active .bar:nth-child(2) {
                opacity: 0;
            }

            .hamburger.active .bar:nth-child(1) {
                transform: translateY(7px) rotate(45deg);
            }

            .hamburger.active .bar:nth-child(3) {
                transform: translateY(-7px) rotate(-45deg);
            }

            .error-container {
                padding: 2rem 1.5rem;
            }

            .error-code {
                font-size: 80px;
            }

            .error-message {
                font-size: 22px;
            }

            .button-group {
                flex-direction: column;
                align-items: center;
            }

            .back-button {
                width: 100%;
                max-width: 250px;
            }
        }`;

const footerHTML = `    <footer class="footer">
        <p>&copy; 2025 Rosenrausch. Made with <i class="fas fa-heart"></i> for the community.</p>
        <div class="legal-links">
            <a href="impressum.html">Impressum</a> |
            <a href="privacy.html">Datenschutz</a>
        </div>
    </footer>`;

console.log('Error page design update script created.');
console.log('To run: node update_error_pages.js');
