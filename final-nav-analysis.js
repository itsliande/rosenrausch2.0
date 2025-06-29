const fs = require('fs');
const path = require('path');

// Alle HTML-Dateien finden
const htmlFiles = [
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

console.log('=== FINALE NAVIGATIONSANALYSE ===\n');

const results = [];

htmlFiles.forEach(file => {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        
        // Navigation extrahieren
        const navMatch = content.match(/<nav[^>]*>[\s\S]*?<\/nav>/i);
        const navigation = navMatch ? navMatch[0] : 'KEINE NAVIGATION GEFUNDEN';
        
        // Links extrahieren
        const linkMatches = navigation.match(/<a[^>]*href="[^"]*"[^>]*>[\s\S]*?<\/a>/gi) || [];
        const links = linkMatches.map(link => {
            const hrefMatch = link.match(/href="([^"]*)"/);
            const textMatch = link.match(/>([^<]*)</);
            return {
                href: hrefMatch ? hrefMatch[1] : 'NO_HREF',
                text: textMatch ? textMatch[1].trim() : 'NO_TEXT',
                full: link
            };
        });
        
        // CSS-Einbindungen prüfen
        const cssMatches = content.match(/<link[^>]*rel="stylesheet"[^>]*>/gi) || [];
        const cssFiles = cssMatches.map(css => {
            const hrefMatch = css.match(/href="([^"]*)"/);
            return hrefMatch ? hrefMatch[1] : 'UNKNOWN';
        });
        
        // JS-Einbindungen prüfen
        const jsMatches = content.match(/<script[^>]*src="[^"]*"[^>]*>/gi) || [];
        const jsFiles = jsMatches.map(js => {
            const srcMatch = js.match(/src="([^"]*)"/);
            return srcMatch ? srcMatch[1] : 'UNKNOWN';
        });
        
        // Inline-Styles prüfen
        const inlineStyles = content.match(/<[^>]*style="[^"]*"/gi) || [];
        
        // FontAwesome prüfen
        const hasFontAwesome = content.includes('fontawesome') || content.includes('fa-') || content.includes('cdnjs.cloudflare.com/ajax/libs/font-awesome');
        
        results.push({
            file,
            links,
            cssFiles,
            jsFiles,
            inlineStyles: inlineStyles.length,
            hasFontAwesome,
            navigation: navigation.substring(0, 200) + '...'
        });
        
        console.log(`\n--- ${file} ---`);
        console.log(`Links (${links.length}):`);
        links.forEach((link, i) => {
            console.log(`  ${i+1}. ${link.href} → "${link.text}"`);
        });
        console.log(`CSS: ${cssFiles.join(', ')}`);
        console.log(`JS: ${jsFiles.join(', ')}`);
        console.log(`Inline-Styles: ${inlineStyles.length}`);
        console.log(`FontAwesome: ${hasFontAwesome ? 'JA' : 'NEIN'}`);
    }
});

// Inkonsistenzen analysieren
console.log('\n\n=== INKONSISTENZEN ===');

// Reference: Erste Datei als Referenz nehmen (index.html)
const reference = results.find(r => r.file === 'index.html');
if (!reference) {
    console.log('FEHLER: index.html nicht gefunden!');
    return;
}

console.log(`\nReferenz (${reference.file}):`);
console.log(`Links: ${reference.links.map(l => l.href).join(' | ')}`);

results.forEach(result => {
    if (result.file === reference.file) return;
    
    const issues = [];
    
    // Link-Anzahl prüfen
    if (result.links.length !== reference.links.length) {
        issues.push(`Unterschiedliche Anzahl Links (${result.links.length} vs ${reference.links.length})`);
    }
    
    // Link-Reihenfolge prüfen
    const resultHrefs = result.links.map(l => l.href);
    const refHrefs = reference.links.map(l => l.href);
    if (JSON.stringify(resultHrefs) !== JSON.stringify(refHrefs)) {
        issues.push(`Unterschiedliche Link-Reihenfolge: ${resultHrefs.join(' | ')}`);
    }
    
    // CSS-Einbindung prüfen
    if (!result.cssFiles.includes('css/main.css')) {
        issues.push('main.css nicht eingebunden');
    }
    
    // JS-Einbindung prüfen  
    if (!result.jsFiles.includes('js/mobile-nav.js')) {
        issues.push('mobile-nav.js nicht eingebunden');
    }
    
    // Inline-Styles prüfen
    if (result.inlineStyles > 0) {
        issues.push(`${result.inlineStyles} Inline-Styles gefunden`);
    }
    
    // FontAwesome prüfen
    if (!result.hasFontAwesome) {
        issues.push('FontAwesome fehlt');
    }
    
    if (issues.length > 0) {
        console.log(`\n${result.file}:`);
        issues.forEach(issue => console.log(`  ❌ ${issue}`));
    } else {
        console.log(`\n${result.file}: ✅ OK`);
    }
});

console.log('\n=== ANALYSE ABGESCHLOSSEN ===');
