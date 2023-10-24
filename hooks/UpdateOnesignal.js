const path = require('path');
const fs = require('fs');

module.exports = function (ctx) {
    console.log("Started updating OneSignal pod version");

    const rootdir = ctx.opts.projectRoot;
    const podfilePath = path.join(rootdir, 'platforms', 'ios', 'Podfile');

    if (fs.existsSync(podfilePath)) {
        // Read the Podfile
        const podfileContent = fs.readFileSync(podfilePath, 'utf8');

        // Replace specific pod version for OneSignal
        const updatedPodfileContent = podfileContent.replace(/pod 'OneSignal', '~> \d+\.\d+\.\d+'/g, "pod 'OneSignal', '~> 2.16.7'");

        // Write back the updated Podfile content
        fs.writeFileSync(podfilePath, updatedPodfileContent, 'utf8');

        console.log("OneSignal pod version updated successfully!");
    } else {
        console.error('Podfile not found. Make sure you have added the iOS platform.');
    }
};
