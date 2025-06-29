// Navigation Consistency Checker and Updater
// This script ensures all HTML pages have the same navigation structure

const fs = require('fs');
const path = require('path');

// Standard Navigation HTML Template
const standardNavigation = `
    <nav class="navbar">
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
                        <i class="fas fa-cube nav-icon"></i>
                        <span>Minecraft</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="tiktok.html" class="nav-link">
                        <i class="fab fa-tiktok nav-icon"></i>
                        <span>TikTok</span>
                    </a>
                </li>
                    </a>
                </li>
            </ul>

            <div class="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
    </nav>
`;

// Standard Footer HTML Template
const standardFooter = `
    <div class="footer">
        © 2025 Rosenrausch. Alle Rechte vorbehalten.
        <div class="legal-links">
            <a href="impressum.html">Impressum</a> |
            <a href="privacy.html">Datenschutz</a>
        </div>
    </div>
`;

// Pages to update with standard navigation
const pagesToUpdate = [
    'index.html',
    'team.html', 
    'termine.html',
    'minecraft.html',
    'impressum.html',
    'impressum_fixed.html',
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

// Function to set active nav link based on current page
function setActiveNavLink(navigationHtml, currentPage) {
    let updatedNav = navigationHtml;
    
    // Remove any existing active classes
    updatedNav = updatedNav.replace(/class="nav-link active"/g, 'class="nav-link"');
    
    // Add active class to current page
    const pageMapping = {
        'index.html': 'index.html',
        'team.html': 'team.html',
        'termine.html': 'termine.html', 
        'minecraft.html': 'minecraft.html'
    };
    
    if (pageMapping[currentPage]) {
        const searchPattern = `href="${pageMapping[currentPage]}" class="nav-link"`;
        const replacePattern = `href="${pageMapping[currentPage]}" class="nav-link active"`;
        updatedNav = updatedNav.replace(searchPattern, replacePattern);
    }
    
    return updatedNav;
}

// Function to update navigation in a file
function updateFileNavigation(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.log(`⚠️  File not found: ${filePath}`);
            return false;
        }

        let content = fs.readFileSync(filePath, 'utf8');
        const fileName = path.basename(filePath);
        
        // Skip files that don't need navigation update
        if (content.includes('<nav class="navbar">')) {
            console.log(`✅ Navigation already consistent in: ${fileName}`);
            return true;
        }
        
        // Set active nav link for current page
        let navigation = setActiveNavLink(standardNavigation, fileName);
        
        // Try different patterns to find and replace navigation
        const navPatterns = [
            // Standard navbar pattern
            /<nav class="navbar">[\s\S]*?<\/nav>/,
            // Alternative patterns
            /<nav[\s\S]*?class="navbar"[\s\S]*?<\/nav>/,
            /<nav[^>]*>[\s\S]*?<\/nav>/
        ];
        
        let updated = false;
        for (const pattern of navPatterns) {
            if (pattern.test(content)) {
                content = content.replace(pattern, navigation.trim());
                updated = true;
                break;
            }
        }
        
        if (!updated) {
            console.log(`⚠️  Could not find navigation pattern in: ${fileName}`);
            return false;
        }
        
        // Update footer if present
        const footerPatterns = [
            /<div class="footer">[\s\S]*?<\/div>/,
            /<footer[\s\S]*?<\/footer>/,
            /<div class="legal-footer">[\s\S]*?<\/div>/
        ];
        
        for (const footerPattern of footerPatterns) {
            if (footerPattern.test(content)) {
                content = content.replace(footerPattern, standardFooter.trim());
                break;
            }
        }
        
        // Write updated content
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated navigation in: ${fileName}`);
        return true;
        
    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
        return false;
    }
}

// Main execution
function main() {
    console.log('🚀 Starting Navigation Consistency Update...\n');
    
    let successCount = 0;
    let totalCount = 0;
    
    for (const page of pagesToUpdate) {
        const filePath = path.join(__dirname, page);
        totalCount++;
        
        if (updateFileNavigation(filePath)) {
            successCount++;
        }
    }
    
    console.log(`\n📊 Summary:`);
    console.log(`   ✅ Successfully updated: ${successCount}/${totalCount} files`);
    console.log(`   ❌ Failed to update: ${totalCount - successCount} files`);
    
    if (successCount === totalCount) {
        console.log('\n🎉 All navigation elements are now consistent!');
    } else {
        console.log('\n⚠️  Some files may need manual review.');
    }
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = {
    updateFileNavigation,
    setActiveNavLink,
    standardNavigation,
    standardFooter
};
