const fse = require('fs-extra');
const decompress = require('decompress');

const pathInfo = require('../../data/path_info');
const revertShare = require('../../share/revert');
const projectConfig = require('../../project_config');

/**
 * Register `revert` task.
 * @param gulp
 */
module.exports = gulp => {
  gulp.task('revert', cb => {
    const targetPath = `${pathInfo.projectRoot}/${projectConfig.target}`;

    // Remove old `target` directory.
    fse.removeSync(targetPath);

    /**
     * Zip file name.
     *
     * Default sequence is from old to new, but actually want the reverse, from new to old.
     */
    revertShare.revertZip = revertShare.packages[revertShare.packages.length - revertShare.index];

    decompress(`${pathInfo.projectRoot}/${revertShare.revertZip}`, targetPath).then(() => {
      cb();
    });
  });
};
