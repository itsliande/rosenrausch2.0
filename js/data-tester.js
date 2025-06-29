// Data validation and testing script
class DataTester {
    constructor() {
        this.results = {
            passed: 0,
            failed: 0,
            errors: []
        };
    }

    async testAllDataFiles() {
        console.log('🔍 Testing all data files...\n');

        await this.testDataFile('news.json', this.validateNewsData);
        await this.testDataFile('team.json', this.validateTeamData);
        await this.testDataFile('events.json', this.validateEventsData);
        await this.testDataFile('minecraft.json', this.validateMinecraftData);
        await this.testDataFile('quotes.json', this.validateQuotesData);
        await this.testDataFile('config.json', this.validateConfigData);

        this.showResults();
    }

    async testDataFile(filename, validator) {
        try {
            console.log(`📄 Testing ${filename}...`);
            const response = await fetch(`data/${filename}`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            const isValid = validator.call(this, data);

            if (isValid) {
                console.log(`✅ ${filename} - Valid`);
                this.results.passed++;
            } else {
                console.log(`❌ ${filename} - Invalid structure`);
                this.results.failed++;
            }
        } catch (error) {
            console.log(`❌ ${filename} - Error: ${error.message}`);
            this.results.errors.push(`${filename}: ${error.message}`);
            this.results.failed++;
        }
        console.log('');
    }

    validateNewsData(data) {
        if (!data.news || !Array.isArray(data.news)) return false;
        if (!data.categories || !Array.isArray(data.categories)) return false;
        
        // Check required fields in news items
        return data.news.every(item => 
            item.id && item.title && item.content && item.date && item.category
        );
    }

    validateTeamData(data) {
        if (!data.team || !Array.isArray(data.team)) return false;
        if (!data.categories || !Array.isArray(data.categories)) return false;
        
        // Check required fields in team members
        return data.team.every(member => 
            member.id && member.name && member.role && member.bio && member.category
        );
    }

    validateEventsData(data) {
        if (!data.events || !Array.isArray(data.events)) return false;
        if (!data.eventTypes || !Array.isArray(data.eventTypes)) return false;
        
        // Check required fields in events
        return data.events.every(event => 
            event.id && event.title && event.date && event.description && event.type
        );
    }

    validateMinecraftData(data) {
        if (!data.server || !data.discord || !data.rules) return false;
        if (!Array.isArray(data.rules)) return false;
        
        // Check server data
        return data.server.name && data.server.ip && data.server.description &&
               data.discord.name && data.discord.invite && data.discord.description;
    }

    validateQuotesData(data) {
        if (!data.quotes || !Array.isArray(data.quotes)) return false;
        if (!data.categories || !Array.isArray(data.categories)) return false;
        
        // Check required fields in quotes
        return data.quotes.every(quote => 
            quote.id && quote.quote && quote.author && quote.category
        );
    }

    validateConfigData(data) {
        if (!data.site || !data.social || !data.features) return false;
        
        // Check basic site config
        return data.site.name && data.site.url && data.social.discord;
    }

    showResults() {
        console.log('📊 Test Results:');
        console.log(`✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed}`);
        
        if (this.results.errors.length > 0) {
            console.log('\n🚨 Errors:');
            this.results.errors.forEach(error => console.log(`   ${error}`));
        }

        const total = this.results.passed + this.results.failed;
        const percentage = total > 0 ? Math.round((this.results.passed / total) * 100) : 0;
        console.log(`\n🎯 Success Rate: ${percentage}%`);

        if (percentage === 100) {
            console.log('🎉 All data files are valid and ready to use!');
        } else {
            console.log('⚠️  Some data files need attention.');
        }
    }
}

// Auto-run tests when script is loaded
document.addEventListener('DOMContentLoaded', async () => {
    const tester = new DataTester();
    await tester.testAllDataFiles();
});

// Export for manual testing
window.DataTester = DataTester;
