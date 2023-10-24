#!/usr/bin/env node

var fs = require('fs');
var path = 'platforms/ios/exportOptions.plist'; // Path to the exportOptions.plist file

module.exports = function(context) {
    if (context.opts.platforms.includes('ios')) {
        var buildConfiguration = process.env.CONFIGURATION || 'Release';

        // Check if the build configuration is App Store
        if (buildConfiguration.toLowerCase() === 'release') {
            try {
                // Check if the exportOptions.plist file exists
                if (fs.existsSync(path)) {
                    // Read existing exportOptions.plist file
                    var exportOptionsContent = fs.readFileSync(path, { encoding: 'utf-8' });

                    // Replace manageAppVersionAndBuildNumber value with false
                    exportOptionsContent = exportOptionsContent.replace('<key>manageAppVersionAndBuildNumber</key>\n\t<true/>', '<key>manageAppVersionAndBuildNumber</key>\n\t<false/>');

                    // Write modified content back to exportOptions.plist
                    fs.writeFileSync(path, exportOptionsContent, { encoding: 'utf-8' });
                    console.log('exportOptions.plist file has been modified for App Store distribution. manageAppVersionAndBuildNumber set to false.');
                } else {
                    // If exportOptions.plist file doesn't exist, create it with default content
                    
                    console.log(buildConfiguration.toLowerCase());
                }
            } catch (error) {
                console.error('Error occurred while modifying exportOptions.plist:', error);
            }
        } else {
            console.log('Non-App Store distribution detected. exportOptions.plist remains unchanged.');
        }
    }
};
