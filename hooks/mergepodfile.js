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

    // Read the Podfile
    const podfileContent = fs.readFileSync(projectPodfile, 'utf8');
    // Replace specific pod version for OneSignal
    const updatedPodfileContent = podfileContent.replace(/pod 'OneSignal', '~> \d+\.\d+\.\d+'/g, "pod 'OneSignal', '~> 2.16.7'");

    // Write back the updated Podfile content
    fs.writeFileSync(podfilePath, updatedPodfileContent, 'utf8');

    console.log("Files writeFileSync successfully");
    
    mergeFiles(inputPathList, outputPath).then((status) => {
        if (status){
            console.log("Files merged successfully");
        } else {
            throw ("Error merging files");
        }

        //remove the old Podfile (To make it compatible with MABS)
        fs.unlinkSync(projectPodfile);
        fs.copyFileSync(outputPath, projectPodfile, fs.constants.COPYFILE_FICLONE, function(err){
            if (err){
                throw (err);
            }
            console.log("Ended merging pod files to add the post_install script");
        });
    });
}
