const mergeFiles = require('merge-files');
const path = require('path');
const fs = require('fs');

module.exports = function (ctx) {

    console.log("Started merging pod files to add the post_install script");
    var rootdir = ctx.opts.projectRoot;
    var outputPath = path.join(ctx.opts.plugin.dir, "src", "ios", "mergedPodfile")
    var projectPodfile = path.join(rootdir, "platforms", "ios", "Podfile");

    var inputPathList = [
        projectPodfile,
        path.join(ctx.opts.plugin.dir, "src", "ios", "Podfile")
    ];

    mergeFiles(inputPathList, outputPath).then((status) => {
        if (status) {
            console.log("Files merged successfully");

            // Read the merged Podfile
            var mergedPodfileContent = fs.readFileSync(outputPath, 'utf8');

            // Replace specific pod version for OneSignal
            var updatedPodfileContent = mergedPodfileContent.replace(/pod 'OneSignal', '~> \d+\.\d+\.\d+'/g, "pod 'OneSignal', '~> 2.16.7'");

            // Write back the updated Podfile content
            fs.writeFileSync(outputPath, updatedPodfileContent, 'utf8');

            // Remove the old Podfile and copy the updated one
            fs.unlinkSync(projectPodfile);
            fs.copyFileSync(outputPath, projectPodfile, fs.constants.COPYFILE_FICLONE, function (err) {
                if (err) {
                    throw (err);
                }
                console.log("Ended merging pod files to add the post_install script");
            });
        } else {
            throw ("Error merging files");
        }
    });
}
