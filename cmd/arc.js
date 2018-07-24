const fs = require('fs');
const gulp = require('gulp');

const pathInfo = require('../data/path_info');
const archiveShare = require('../share/archive');
const logger = require('../util/logger');
const registerTasks = require('../tasks/register');
const projectConfig = require('../project_config');

if (!fs.existsSync(`${pathInfo.projectRoot}/${projectConfig.target}`)) {
  logger.error(`
  Missing '${projectConfig.target}' directory for command: arc.
  `);
  process.exit(1);
}

// Register gulp tasks.
registerTasks(gulp);

// Execute task.
gulp.series('arc', archiveShare.endHandler)();
