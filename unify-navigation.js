const fs = require('fs');
const path = require('path');

// Standard Navigation Template (Logo + 5 Menüpunkte, kein doppelter Home-Link)
const navigationTemplate = `    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="index.html">
                    <i class="fas fa-rose"></i>
                    <span>Rosenrausch</span>
                </a>
            </div>
            
            <ul class="nav-menu">
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

console.log('=== NAVIGATION VEREINHEITLICHEN ===\n');

htmlFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`❌ ${file} nicht gefunden`);
        return;
    }
    
    console.log(`🔧 Bearbeite ${file}...`);
    
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    // 1. Navigation ersetzen
    const navRegex = /<nav[^>]*>[\s\S]*?<\/nav>/;
    if (navRegex.test(content)) {
        // Aktive Klasse basierend auf Dateiname setzen
        let currentNav = navigationTemplate;
        
        if (file === 'team.html') {
            currentNav = currentNav.replace('<a href="team.html" class="nav-link">', '<a href="team.html" class="nav-link active">');
        } else if (file === 'termine.html') {
            currentNav = currentNav.replace('<a href="termine.html" class="nav-link">', '<a href="termine.html" class="nav-link active">');
        } else if (file === 'minecraft.html') {
            currentNav = currentNav.replace('<a href="minecraft.html" class="nav-link">', '<a href="minecraft.html" class="nav-link active">');
        }
        
        content = content.replace(navRegex, currentNav);
        changed = true;
        console.log(`  ✅ Navigation ersetzt`);
    }
    
    // 2. Inline-Styles entfernen (außer in head/meta/script tags)
    const inlineStyleRegex = /(<(?!head|meta|script|link)[^>]+)\s+style="[^"]*"/gi;
    const originalInlineCount = (content.match(inlineStyleRegex) || []).length;
    
    if (originalInlineCount > 0) {
        content = content.replace(inlineStyleRegex, '$1');
        changed = true;
        console.log(`  ✅ ${originalInlineCount} Inline-Styles entfernt`);
    }
    
    // 3. Sicherstellen, dass main.css eingebunden ist
    if (!content.includes('css/main.css')) {
        // Nach dem letzten <link> in head einfügen
        const headCloseIndex = content.indexOf('</head>');
        if (headCloseIndex !== -1) {
            const insertion = '    <link rel="stylesheet" href="css/main.css">\n';
            content = content.substring(0, headCloseIndex) + insertion + content.substring(headCloseIndex);
            changed = true;
            console.log(`  ✅ main.css hinzugefügt`);
        }
    }
    
    // 4. Sicherstellen, dass mobile-nav.js eingebunden ist
    if (!content.includes('js/mobile-nav.js')) {
        // Vor </body> einfügen
        const bodyCloseIndex = content.lastIndexOf('</body>');
        if (bodyCloseIndex !== -1) {
            const insertion = '    <script src="js/mobile-nav.js"></script>\n';
            content = content.substring(0, bodyCloseIndex) + insertion + content.substring(bodyCloseIndex);
            changed = true;
            console.log(`  ✅ mobile-nav.js hinzugefügt`);
        }
    }
    
    // 5. FontAwesome sicherstellen (falls nicht vorhanden)
    if (!content.includes('fontawesome') && !content.includes('font-awesome')) {
        const headCloseIndex = content.indexOf('</head>');
        if (headCloseIndex !== -1) {
            const fontAwesome = '    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" integrity="sha512-Avb2QiuDEEvB4bZJYdft2mNjVShBftLdPG8FJ0V7irTLQ8Uo0qcPxh4Plq7G5tGm0rU+1SPhVotteLpBERwTkw==" crossorigin="anonymous" referrerpolicy="no-referrer">\n';
            content = content.substring(0, headCloseIndex) + fontAwesome + content.substring(headCloseIndex);
            changed = true;
            console.log(`  ✅ FontAwesome hinzugefügt`);
        }
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

console.log('=== VEREINHEITLICHUNG ABGESCHLOSSEN ===');

// Verification
console.log('\n=== VERIFIKATION ===');
htmlFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    
    const content = fs.readFileSync(file, 'utf8');
    
    // Links zählen
    const navMatch = content.match(/<nav[^>]*>[\s\S]*?<\/nav>/);
    if (navMatch) {
        const nav = navMatch[0];
        const links = nav.match(/<a[^>]*href="[^"]*"[^>]*>/g) || [];
        
        // Logo-Link filtern (sollte nicht mitgezählt werden)
        const menuLinks = links.filter(link => !link.includes('nav-logo'));
        
        console.log(`${file}: ${menuLinks.length} Menü-Links + 1 Logo-Link`);
        
        // Inline-Styles prüfen
        const inlineStyles = content.match(/(<(?!head|meta|script|link)[^>]+)\s+style="[^"]*"/gi) || [];
        if (inlineStyles.length > 0) {
            console.log(`  ⚠️ Noch ${inlineStyles.length} Inline-Styles vorhanden`);
        }
    }
});

console.log('\n=== FERTIG ===');
