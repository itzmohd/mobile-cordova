#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const plist = require('plist');

module.exports = function(context) {
    const platforms = context.opts.cordova.platforms;

    if (platforms.indexOf('ios') === -1) {
        return;
    }

    const iosPlatformPath = path.join(context.opts.projectRoot, 'platforms', 'ios');
    const exportOptionsPath = path.join(iosPlatformPath, 'exportOptions.plist');

    if (fs.existsSync(exportOptionsPath)) {
        const plistContent = fs.readFileSync(exportOptionsPath, 'utf8');
        const parsedPlist = plist.parse(plistContent);

        parsedPlist.manageAppVersionAndBuildNumber = false;

        const updatedPlistContent = plist.build(parsedPlist);
        fs.writeFileSync(exportOptionsPath, updatedPlistContent, 'utf8');

        console.log('Updated exportOptions.plist: manageAppVersionAndBuildNumber set to false');
    } else {
        console.log('exportOptions.plist not found.');
    }
};
