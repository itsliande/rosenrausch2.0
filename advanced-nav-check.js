#!/usr/bin/env node

/**
 * Advanced Navigation & CSS Consistency Checker
 * Überprüft sowohl HTML-Struktur als auch CSS-Styling-Konsistenz
 */

const fs = require('fs');
const path = require('path');

// HTML-Dateien
const HTML_FILES = [
    'index.html', 'team.html', 'termine.html', 'minecraft.html', 'quotes.html',
    'impressum.html', 'privacy.html', '404.html', '403.html', '401.html',
    '401_new.html', '500.html', '418.html', 'error.html', 'wartung.html'
];

/**
 * Überprüft CSS-Styling-Konsistenz
 */
function checkCSSConsistency(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const fileName = path.basename(filePath);
        
        console.log(`\n🎨 CSS-Check: ${fileName}`);
        
        const issues = [];
        
        // Prüfe auf inline <style> Tags mit Navigation-CSS
        const hasInlineNavCSS = content.includes('.navbar') && content.includes('<style>');
        const hasExternalMainCSS = content.includes('css/main.css');
        
        if (hasInlineNavCSS && hasExternalMainCSS) {
            issues.push('⚠️  Sowohl inline CSS als auch main.css für Navigation - Potentielle Konflikte!');
        }
        
        if (hasInlineNavCSS && !hasExternalMainCSS) {
            issues.push('❌ Verwendet inline CSS statt externes main.css');
        }
        
        // Prüfe spezifische CSS-Klassen in inline styles
        if (hasInlineNavCSS) {
            const inlineStyleMatch = content.match(/<style>([\s\S]*?)<\/style>/);
            if (inlineStyleMatch) {
                const inlineCSS = inlineStyleMatch[1];
                
                // Prüfe auf verschiedene navbar Implementierungen
                const navbarBgRegex = /\.navbar\s*{[^}]*background[^}]*}/;
                const navbarBg = navbarBgRegex.exec(inlineCSS);
                
                if (navbarBg) {
                    const bgStyle = navbarBg[0];
                    if (!bgStyle.includes('rgba(26, 16, 51, 0.8)')) {
                        issues.push('⚠️  Abweichender Navbar-Hintergrund');
                    }
                }
                
                // Prüfe nav-link Styling
                if (inlineCSS.includes('.nav-link') && !inlineCSS.includes('padding: 12px 24px')) {
                    issues.push('⚠️  Abweichendes nav-link Padding');
                }
                
                // Prüfe hamburger Styling
                if (inlineCSS.includes('.hamburger') && !inlineCSS.includes('gap: 4px')) {
                    issues.push('⚠️  Abweichendes hamburger Styling');
                }
            }
        }
        
        // Prüfe Mobile-Navigation JavaScript
        if (!content.includes('js/mobile-nav.js')) {
            issues.push('⚠️  mobile-nav.js nicht eingebunden');
        }
        
        // Prüfe FontAwesome
        if (!content.includes('font-awesome')) {
            issues.push('⚠️  FontAwesome nicht eingebunden');
        }
        
        if (issues.length === 0) {
            console.log('✅ CSS und Styling konsistent');
        } else {
            issues.forEach(issue => console.log(`  ${issue}`));
        }
        
        return { fileName, issues };
        
    } catch (error) {
        console.error(`❌ Fehler beim CSS-Check von ${filePath}:`, error.message);
        return { fileName, issues: [`Fehler: ${error.message}`] };
    }
}

/**
 * Überprüft Navigation HTML-Struktur im Detail
 */
function checkNavigationStructure(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const fileName = path.basename(filePath);
        
        console.log(`\n🔍 Struktur-Check: ${fileName}`);
        
        const issues = [];
        
        // Extrahiere Navigation HTML
        const navMatch = content.match(/<nav class="navbar">([\s\S]*?)<\/nav>/);
        if (!navMatch) {
            issues.push('❌ Navigation nicht gefunden');
            return { fileName, issues };
        }
        
        const navHTML = navMatch[1];
        
        // Prüfe Reihenfolge der Links
        const expectedOrder = ['index.html', 'team.html', 'termine.html', 'minecraft.html', 'quotes.html'];
        const linkMatches = [...navHTML.matchAll(/href="([^"]+)"/g)];
        const actualOrder = linkMatches.map(match => match[1]).filter(href => expectedOrder.includes(href));
        
        if (JSON.stringify(actualOrder) !== JSON.stringify(expectedOrder)) {
            issues.push(`⚠️  Link-Reihenfolge: Erwartet [${expectedOrder.join(', ')}], gefunden [${actualOrder.join(', ')}]`);
        }
        
        // Prüfe Icons
        const iconChecks = [
            { href: 'index.html', icon: 'fa-home' },
            { href: 'team.html', icon: 'fa-users' },
            { href: 'termine.html', icon: 'fa-calendar' },
            { href: 'minecraft.html', icon: 'fa-cube' },
            { href: 'quotes.html', icon: 'fa-quote-left' }
        ];
        
        iconChecks.forEach(check => {
            const linkPattern = new RegExp(`href="${check.href}"[^>]*>[^<]*<i class="[^"]*${check.icon}[^"]*">`);
            if (!linkPattern.test(navHTML)) {
                issues.push(`❌ Falsches oder fehlendes Icon für ${check.href}: ${check.icon}`);
            }
        });
        
        // Prüfe CSS-Klassen
        const requiredClasses = ['nav-container', 'nav-logo', 'nav-menu', 'nav-item', 'nav-link', 'hamburger'];
        requiredClasses.forEach(className => {
            if (!navHTML.includes(className)) {
                issues.push(`❌ CSS-Klasse fehlt: ${className}`);
            }
        });
        
        // Prüfe active Link (nur für Hauptseiten)
        const mainPages = ['index.html', 'team.html', 'termine.html', 'minecraft.html', 'quotes.html'];
        if (mainPages.includes(fileName)) {
            const activePattern = new RegExp(`href="${fileName}"[^>]*class="nav-link active"`);
            if (!activePattern.test(navHTML)) {
                issues.push(`⚠️  Active-Link nicht gesetzt für ${fileName}`);
            }
        }
        
        if (issues.length === 0) {
            console.log('✅ Navigation Struktur korrekt');
        } else {
            issues.forEach(issue => console.log(`  ${issue}`));
        }
        
        return { fileName, issues };
        
    } catch (error) {
        console.error(`❌ Fehler beim Struktur-Check von ${filePath}:`, error.message);
        return { fileName, issues: [`Fehler: ${error.message}`] };
    }
}

/**
 * Hauptfunktion
 */
function main() {
    console.log('🔍 Advanced Navigation & CSS Consistency Checker');
    console.log('===============================================\n');
    
    let totalIssues = 0;
    const allResults = [];
    
    HTML_FILES.forEach(fileName => {
        const filePath = path.join(process.cwd(), fileName);
        
        if (fs.existsSync(filePath)) {
            // HTML-Struktur Check
            const structureResult = checkNavigationStructure(filePath);
            
            // CSS-Styling Check
            const cssResult = checkCSSConsistency(filePath);
            
            const combinedIssues = [...structureResult.issues, ...cssResult.issues];
            allResults.push({ fileName, issues: combinedIssues });
            totalIssues += combinedIssues.length;
            
        } else {
            console.log(`⚠️  Datei nicht gefunden: ${fileName}`);
            allResults.push({ fileName, issues: ['Datei nicht gefunden'] });
            totalIssues++;
        }
    });
    
    // Finale Zusammenfassung
    console.log('\n\n📊 FINALE ZUSAMMENFASSUNG:');
    console.log('========================');
    
    const problemFiles = allResults.filter(r => r.issues.length > 0);
    const cleanFiles = allResults.filter(r => r.issues.length === 0);
    
    console.log(`✅ Perfekte Dateien: ${cleanFiles.length}`);
    cleanFiles.forEach(r => console.log(`   - ${r.fileName}`));
    
    if (problemFiles.length > 0) {
        console.log(`\n⚠️  Dateien mit Problemen: ${problemFiles.length}`);
        problemFiles.forEach(result => {
            console.log(`\n   📄 ${result.fileName}:`);
            result.issues.forEach(issue => console.log(`      ${issue}`));
        });
    }
    
    console.log(`\n🔢 Statistik:`);
    console.log(`   Gesamtdateien: ${allResults.length}`);
    console.log(`   Perfekte Dateien: ${cleanFiles.length} (${Math.round(cleanFiles.length/allResults.length*100)}%)`);
    console.log(`   Problematische Dateien: ${problemFiles.length}`);
    console.log(`   Gesamtprobleme: ${totalIssues}`);
    
    if (totalIssues === 0) {
        console.log('\n🎉 PERFEKT! Alle Navigationen sind vollständig konsistent!');
    } else {
        console.log('\n🔧 Empfehlung: Beheben Sie die gefundenen Probleme für vollständige Konsistenz.');
    }
}

// Script ausführen
if (require.main === module) {
    main();
}

module.exports = { checkNavigationStructure, checkCSSConsistency };
