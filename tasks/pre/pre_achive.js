const zip = require('gulp-zip');
const moment = require('moment');

const pathInfo = require('../../data/path_info');
const archiveShare = require('../../share/archive');
const projectConfig = require('../../project_config');

/**
 * Register `pre_archive` task.
 *
 * @param gulp
 */
module.exports = gulp => {
  gulp.task('pre_archive', () => {
    const fileName = `${projectConfig.target}-${moment().format('YYYY-MM-DD-HH-mm-ss')}.zip`;

    archiveShare.zipFileName = fileName;

    return gulp
      .src(`${pathInfo.projectRoot}/${projectConfig.target}/**/*`)
      .pipe(zip(fileName))
      .pipe(gulp.dest(pathInfo.projectRoot));
  });
};
