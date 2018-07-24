const fs = require('fs');
const gulp = require('gulp');

const pathInfo = require('../data/path_info');
const logger = require('../util/logger');
const registerTasks = require('../tasks/register');
const projectConfig = require('../project_config');

if (!fs.existsSync(`${pathInfo.projectRoot}/${projectConfig.target}`)) {
  logger.error(`
  Missing '${projectConfig.target}' directory for command: clean.
  `);
  process.exit(1);
}

// Register gulp tasks.
registerTasks(gulp);

// Execute task.
gulp.series('clean', cb => {
  logger.success(`
  Clean '${projectConfig.target}' directory successfully.
  `);

  cb();
})();
