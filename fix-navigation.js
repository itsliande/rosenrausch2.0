#!/usr/bin/env node

/**
 * Navigation Consistency Fixer
 * Überprüft und repariert die Navigation auf allen HTML-Seiten
 */

const fs = require('fs');
const path = require('path');

// Standard Navigation HTML (exakt wie in main.css definiert)
const STANDARD_NAVIGATION = `    <nav class="navbar">
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
                <li class="nav-item">
                    <a href="quotes.html" class="nav-link">
                        <i class="fas fa-quote-left"></i>
                        <span>Quotes</span>
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

// Alle HTML-Dateien im Projekt
const HTML_FILES = [
    'index.html',
    'team.html', 
    'termine.html',
    'minecraft.html',
    'quotes.html',
    'impressum.html',
    'privacy.html',
    '404.html',
    '403.html', 
    '401.html',
    '401_new.html',
    '500.html',
    '418.html',
    'error.html',
    'wartung.html'
];

// Mapping für aktive Links
const ACTIVE_LINK_MAPPING = {
    'index.html': 'index.html',
    'team.html': 'team.html',
    'termine.html': 'termine.html',
    'minecraft.html': 'minecraft.html',
    'quotes.html': 'quotes.html'
};

/**
 * Setzt den aktiven Link für eine bestimmte Seite
 */
function setActiveLink(navHtml, currentPage) {
    let updatedNav = navHtml;
    
    // Entferne alle bestehenden active-Klassen
    updatedNav = updatedNav.replace(/class="nav-link active"/g, 'class="nav-link"');
    
    // Füge active-Klasse für aktuelle Seite hinzu
    if (ACTIVE_LINK_MAPPING[currentPage]) {
        const searchPattern = `href="${ACTIVE_LINK_MAPPING[currentPage]}" class="nav-link"`;
        const replacePattern = `href="${ACTIVE_LINK_MAPPING[currentPage]}" class="nav-link active"`;
        updatedNav = updatedNav.replace(searchPattern, replacePattern);
    }
    
    return updatedNav;
}

/**
 * Analysiert eine HTML-Datei und findet Navigation-Probleme
 */
function analyzeNavigation(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const fileName = path.basename(filePath);
        
        console.log(`\n📄 Analysiere: ${fileName}`);
        
        // Prüfe ob Navigation vorhanden ist
        const hasNav = content.includes('<nav class="navbar">');
        if (!hasNav) {
            console.log(`❌ Navigation fehlt komplett!`);
            return { hasIssues: true, issues: ['Navigation fehlt komplett'] };
        }
        
        // Prüfe Navigationselemente
        const issues = [];
        
        // Prüfe alle 5 Standard-Links
        const requiredLinks = [
            { href: 'index.html', icon: 'fa-home', text: 'Home' },
            { href: 'team.html', icon: 'fa-users', text: 'Team' },
            { href: 'termine.html', icon: 'fa-calendar', text: 'Termine' },
            { href: 'minecraft.html', icon: 'fa-cube', text: 'Minecraft' },
            { href: 'quotes.html', icon: 'fa-quote-left', text: 'Quotes' }
        ];
        
        requiredLinks.forEach(link => {
            if (!content.includes(`href="${link.href}"`)) {
                issues.push(`❌ Fehlender Link: ${link.text}`);
            } else if (!content.includes(link.icon)) {
                issues.push(`⚠️  Falsches Icon für: ${link.text}`);
            }
        });
        
        // Prüfe Hamburger-Menü
        if (!content.includes('<div class="hamburger">')) {
            issues.push(`❌ Hamburger-Menü fehlt`);
        }
        
        // Prüfe CSS-Klassen
        if (!content.includes('nav-container')) {
            issues.push(`❌ nav-container fehlt`);
        }
        if (!content.includes('nav-menu')) {
            issues.push(`❌ nav-menu fehlt`);
        }
        if (!content.includes('nav-item')) {
            issues.push(`❌ nav-item fehlt`);
        }
        if (!content.includes('nav-link')) {
            issues.push(`❌ nav-link fehlt`);
        }
        
        // Prüfe externe CSS
        if (!content.includes('css/main.css')) {
            issues.push(`⚠️  main.css nicht eingebunden`);
        }
        
        // Prüfe mobile-nav.js
        if (!content.includes('js/mobile-nav.js')) {
            issues.push(`⚠️  mobile-nav.js nicht eingebunden`);
        }
        
        if (issues.length === 0) {
            console.log(`✅ Navigation ist korrekt!`);
            return { hasIssues: false, issues: [] };
        } else {
            issues.forEach(issue => console.log(`  ${issue}`));
            return { hasIssues: true, issues };
        }
        
    } catch (error) {
        console.error(`❌ Fehler beim Lesen von ${filePath}:`, error.message);
        return { hasIssues: true, issues: [`Datei konnte nicht gelesen werden: ${error.message}`] };
    }
}

/**
 * Repariert die Navigation in einer HTML-Datei
 */
function fixNavigation(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const fileName = path.basename(filePath);
        
        console.log(`\n🔧 Repariere Navigation in: ${fileName}`);
        
        // Erstelle aktive Navigation für diese Seite
        const activeNav = setActiveLink(STANDARD_NAVIGATION, fileName);
        
        // Finde und ersetze die bestehende Navigation
        const navRegex = /<nav class="navbar">[\s\S]*?<\/nav>/;
        
        if (navRegex.test(content)) {
            content = content.replace(navRegex, activeNav);
            console.log(`✅ Navigation erfolgreich ersetzt`);
        } else {
            // Navigation nicht gefunden - nach <body> Tag einfügen
            const bodyRegex = /(<body[^>]*>)/;
            if (bodyRegex.test(content)) {
                content = content.replace(bodyRegex, `$1\n${activeNav}\n`);
                console.log(`✅ Navigation nach <body> eingefügt`);
            } else {
                console.log(`❌ Konnte keine geeignete Stelle für Navigation finden`);
                return false;
            }
        }
        
        // Stelle sicher, dass main.css eingebunden ist
        if (!content.includes('css/main.css')) {
            const headCloseRegex = /<\/head>/;
            if (headCloseRegex.test(content)) {
                const cssLink = '    <link rel="stylesheet" href="css/main.css">\n';
                content = content.replace(headCloseRegex, `${cssLink}</head>`);
                console.log(`✅ main.css eingebunden`);
            }
        }
        
        // Stelle sicher, dass mobile-nav.js eingebunden ist
        if (!content.includes('js/mobile-nav.js')) {
            const bodyCloseRegex = /<\/body>/;
            if (bodyCloseRegex.test(content)) {
                const jsScript = '    <script src="js/mobile-nav.js"></script>\n';
                content = content.replace(bodyCloseRegex, `${jsScript}</body>`);
                console.log(`✅ mobile-nav.js eingebunden`);
            }
        }
        
        // Schreibe die reparierte Datei
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ ${fileName} erfolgreich repariert`);
        
        return true;
        
    } catch (error) {
        console.error(`❌ Fehler beim Reparieren von ${filePath}:`, error.message);
        return false;
    }
}

/**
 * Hauptfunktion
 */
function main() {
    console.log('🔍 Navigation Consistency Checker & Fixer');
    console.log('=========================================\n');
    
    let totalIssues = 0;
    let fixedFiles = 0;
    
    // 1. Analysiere alle HTML-Dateien
    console.log('📊 ANALYSE-PHASE:');
    const analysisResults = [];
    
    HTML_FILES.forEach(fileName => {
        const filePath = path.join(process.cwd(), fileName);
        
        if (fs.existsSync(filePath)) {
            const result = analyzeNavigation(filePath);
            analysisResults.push({ fileName, filePath, ...result });
            if (result.hasIssues) {
                totalIssues += result.issues.length;
            }
        } else {
            console.log(`⚠️  Datei nicht gefunden: ${fileName}`);
        }
    });
    
    // 2. Zusammenfassung der Analyse
    console.log(`\n📋 ZUSAMMENFASSUNG:`);
    console.log(`   Analysierte Dateien: ${analysisResults.length}`);
    console.log(`   Dateien mit Problemen: ${analysisResults.filter(r => r.hasIssues).length}`);
    console.log(`   Gesamtanzahl Probleme: ${totalIssues}`);
    
    // 3. Reparatur-Phase
    if (totalIssues > 0) {
        console.log(`\n🔧 REPARATUR-PHASE:`);
        
        analysisResults.forEach(result => {
            if (result.hasIssues) {
                const success = fixNavigation(result.filePath);
                if (success) {
                    fixedFiles++;
                }
            }
        });
        
        console.log(`\n✅ ABGESCHLOSSEN:`);
        console.log(`   Reparierte Dateien: ${fixedFiles}`);
        console.log(`   Verbleibende Probleme: ${totalIssues - fixedFiles}`);
    } else {
        console.log(`\n🎉 Alle Navigationen sind bereits korrekt!`);
    }
}

// Script ausführen
if (require.main === module) {
    main();
}

module.exports = { analyzeNavigation, fixNavigation, setActiveLink };
