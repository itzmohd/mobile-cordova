#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

module.exports = function(context) {
    var platformRoot = path.join(context.opts.projectRoot, 'platforms/android');
    var buildGradlePath = path.join(platformRoot, 'build.gradle');

    try {
        var buildGradleContent = fs.readFileSync(buildGradlePath, 'utf8');

        // Check if buildFeatures block is already present
        if (buildGradleContent.includes('buildFeatures')) {
            // Append viewBinding true to buildFeatures block
            buildGradleContent = buildGradleContent.replace(/(buildFeatures\s*{\s*)([^}]+)(})/, (match, p1, p2, p3) => {
                return p1 + 'viewBinding true, ' + p2 + p3;
            });

            fs.writeFileSync(buildGradlePath, buildGradleContent, 'utf8');
            console.log('Appended viewBinding true to buildFeatures block in build.gradle for Android platform.');
        } else {
            // Add the entire buildFeatures block
            buildGradleContent += `
            android {
                buildFeatures {
                    // Determines whether to support View Binding.
                    viewBinding true
                }
            }
            `;
            fs.writeFileSync(buildGradlePath, buildGradleContent, 'utf8');
            console.log('Added buildFeatures block with viewBinding true to build.gradle for Android platform.');
        }
    } catch (err) {
        console.error('Error modifying build.gradle:', err);
    }
};
