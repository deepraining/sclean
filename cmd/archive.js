const fs = require('fs');
const gulp = require('gulp');

const pathInfo = require('../data/path_info');
const share = require('../share/archive');
const logger = require('../util/logger');
const registerTasks = require('../tasks/register');
const projectConfig = require('../project_config');

if (!fs.existsSync(`${pathInfo.projectRoot}/${projectConfig.target}`)) {
  logger.error(`
  Missing '${projectConfig.target}' directory for command: archive.
  `);
  process.exit(1);
}

// Register gulp tasks.
registerTasks(gulp);

// Execute task.
gulp.series('archive', cb => {
  logger.success(`
  Pack '${projectConfig.target}' directory successfully!
  
  You can find it '${share.zipFileName}' in current directory.
  `);

  cb();
})();
