const mergeFiles = require('merge-files');
const path = require('path');
const fs = require('fs').promises; // Using fs.promises for async file operations

module.exports = async function (ctx) {
    try {
        console.log("Started merging pod files to add the post_install script");
        const rootdir = ctx.opts.projectRoot;
        const outputPath = path.join(ctx.opts.plugin.dir, "src", "ios", "mergedPodfile");
        const projectPodfile = path.join(rootdir, "platforms", "ios", "Podfile");
        const inputPathList = [
            projectPodfile,
            path.join(ctx.opts.plugin.dir, "src", "ios", "Podfile")
        ];

        // Merge files
        await mergeFiles(inputPathList, outputPath);

        // Remove the old Podfile (To make it compatible with MABS)
        await fs.unlink(projectPodfile);

        // Copy the merged Podfile to the original location
        await fs.copyFile(outputPath, projectPodfile);

        console.log("Ended merging pod files to add the post_install script");
    } catch (err) {
        console.error("An error occurred:", err);
    }
};
