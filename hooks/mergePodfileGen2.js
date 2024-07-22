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
    const hookScriptPath = path.join(context.opts.projectRoot, 'hooks', 'postInstallHook.rb');

    if (!fs.existsSync(hookScriptPath)) {
        console.error('postInstallHook.rb not found.');
        return;
    }

    const hookScript = fs.readFileSync(hookScriptPath, 'utf8');

    if (!fs.existsSync(podfilePath)) {
        console.error('Podfile not found.');
        return;
    }

    let podfileContent = fs.readFileSync(podfilePath, 'utf8');

    if (!podfileContent.includes("post_install do |installer|")) {
        podfileContent += '\n' + hookScript;
        fs.writeFileSync(podfilePath, podfileContent, 'utf8');
        console.log('Added post_install hook to Podfile');
    } else {
        console.log('post_install hook already exists in Podfile');
    }
};
