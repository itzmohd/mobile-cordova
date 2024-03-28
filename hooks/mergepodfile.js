const fs = require('fs').promises;
const path = require('path');
const mergeFiles = require('merge-files');

module.exports = async function (ctx) {
    try {
        console.log("Started merging pod files to add the post_install script");
        
        const rootdir = ctx.opts.projectRoot;
        const outputPath = path.join(ctx.opts.plugin.dir, "src", "ios", "mergedPodfile");
        const projectPodfile = path.join(rootdir, "platforms", "ios", "Podfile");
        const pluginPodfile = path.join(ctx.opts.plugin.dir, "src", "ios", "Podfile");

        // Read content of project and plugin Podfiles
        const [projectContent, pluginContent] = await Promise.all([
            fs.readFile(projectPodfile, 'utf-8'),
            fs.readFile(pluginPodfile, 'utf-8')
        ]);

        // Merge files content
        const mergedContent = projectContent + '\n\n' + pluginContent;

        // Write merged content to output file
        await fs.writeFile(outputPath, mergedContent);

        // Remove the old Podfile
        await fs.unlink(projectPodfile);

        // Copy the merged Podfile to the original location
        await fs.copyFile(outputPath, projectPodfile);

        console.log("Ended merging pod files to add the post_install script");
    } catch (err) {
        console.error("An error occurred:", err);
    }
};
