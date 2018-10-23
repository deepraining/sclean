const fse = require('fs-extra');
const decompress = require('decompress');

const pathInfo = require('../../data/path_info');
const share = require('../../share/restore');
const projectConfig = require('../../project_config');

/**
 * Register `restore` task.
 * @param gulp
 */
module.exports = gulp => {
  gulp.task('restore', cb => {
    const targetPath = `${pathInfo.projectRoot}/${projectConfig.target}`;

    // Remove old `target` directory.
    fse.removeSync(targetPath);

    /**
     * Zip file name.
     *
     * Default sequence is from old to new, but actually want the reverse, from new to old.
     */
    share.restoreZip = share.packages[share.packages.length - share.index];

    decompress(`${pathInfo.projectRoot}/${share.restoreZip}`, targetPath).then(() => {
      cb();
    });
  });
};
