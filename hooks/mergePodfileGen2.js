#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

module.exports = function(context) {
        const platforms = context.opts.cordova.platforms;

        if (platforms.indexOf('ios') === -1) {
            return;
        }

        const iosPlatformPath = path.join(context.opts.projectRoot, 'platforms', 'ios');
        const podfilePath = path.join(iosPlatformPath, 'Podfile');
        var rootdir = ctx.opts.projectRoot;
        var projectPodfile = path.join(rootdir, "platforms", "ios", "Podfile");

        if (fs.existsSync(podfilePath)) {
            let podfileContent = fs.readFileSync(podfilePath, 'utf8');

            let hookScript = fs.readFileSync(projectPodfile, 'utf8');

            if (!podfileContent.includes("post_install do |installer|")) {
                podfileContent += hookScript;
                fs.writeFileSync(podfilePath, podfileContent, 'utf8');
                console.log('Added post_install hook to Podfile');
            } else {
                console.log('post_install hook already exists in Podfile');
            }
        } else {
            console.log('Podfile not found.');
        }
