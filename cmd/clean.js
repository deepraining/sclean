const fs = require('fs');

const pathInfo = require('../data/path_info');
const logger = require('../util/logger');
const projectConfig = require('../project_config');

if (!fs.existsSync(`${pathInfo.projectRoot}/${projectConfig.target}`)) {
  logger.error(`
  Missing '${projectConfig.target}' directory for command: clean.
  `);
  process.exit(1);
}

const processArgv = process.argv;
// Modify `process.argv` for `gulp-cli`.
process.argv = [processArgv[0], processArgv[1], 'clean', '--gulpfile', pathInfo.gulpFile];

require('gulp-cli')(err => {
  if (err) {
    logger.error(err.stack || err);
  } else {
    logger.success(`
  Clean '${projectConfig.target}' directory successfully.
    `);
  }
});
