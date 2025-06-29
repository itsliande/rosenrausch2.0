const fs = require('fs');
const path = require('path');

// Vereinfachte Navigation Template - nur Links, kein Logo
const simplifiedNavigationTemplate = `    <nav class="navbar">
        <div class="nav-container">
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="index.html" class="nav-link">
                        <span>Home</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="team.html" class="nav-link">
                        <span>Team</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="termine.html" class="nav-link">
                        <span>Termine</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="minecraft.html" class="nav-link">
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

// Alle HTML-Dateien
const htmlFiles = [
    'index.html',
    'team.html', 
    'termine.html',
    'minecraft.html',
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

console.log('=== NAVIGATION VEREINFACHEN ===\n');

htmlFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`❌ ${file} nicht gefunden`);
        return;
    }
    
    console.log(`🔧 Vereinfache Navigation in ${file}...`);
    
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    // Navigation ersetzen
    const navRegex = /<nav[^>]*>[\s\S]*?<\/nav>/;
    if (navRegex.test(content)) {
        // Aktive Klasse basierend auf Dateiname setzen
        let currentNav = simplifiedNavigationTemplate;
        
        if (file === 'index.html') {
            currentNav = currentNav.replace('<a href="index.html" class="nav-link">', '<a href="index.html" class="nav-link active">');
        } else if (file === 'team.html') {
            currentNav = currentNav.replace('<a href="team.html" class="nav-link">', '<a href="team.html" class="nav-link active">');
        } else if (file === 'termine.html') {
            currentNav = currentNav.replace('<a href="termine.html" class="nav-link">', '<a href="termine.html" class="nav-link active">');
        } else if (file === 'minecraft.html') {
            currentNav = currentNav.replace('<a href="minecraft.html" class="nav-link">', '<a href="minecraft.html" class="nav-link active">');
        }
        
        content = content.replace(navRegex, currentNav);
        changed = true;
        console.log(`  ✅ Navigation vereinfacht (Logo entfernt)`);
    }
    
    // Datei speichern
    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`  💾 ${file} gespeichert`);
    } else {
        console.log(`  ℹ️  Keine Änderungen nötig`);
    }
    
    console.log('');
});

console.log('=== NAVIGATION VEREINFACHT ===');
console.log('🎯 Änderungen:');
console.log('  - Logo/Rosenrausch Text entfernt');
console.log('  - Nur noch 5 einfache Links');
console.log('  - Icons entfernt (nur Text)');
console.log('  - Minimalistisches Design');
