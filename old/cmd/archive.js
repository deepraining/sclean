const fs = require('fs');

const pathInfo = require('../data/path_info');
const share = require('../share/archive');
const logger = require('../util/logger');
const projectConfig = require('../project_config');

if (!fs.existsSync(`${pathInfo.projectRoot}/${projectConfig.target}`)) {
  logger.error(`
  Missing '${projectConfig.target}' directory for command: archive.
  `);
  process.exit(1);
}

const processArgv = process.argv;
// Modify `process.argv` for `gulp-cli`.
process.argv = [processArgv[0], processArgv[1], 'archive', '--gulpfile', pathInfo.gulpFile];

require('gulp-cli')(err => {
  if (err) {
    logger.error(err.stack || err);
  } else {
    logger.success(`
  Pack '${projectConfig.target}' directory successfully!
  
  You can find it '${share.zipFileName}' in current directory.
    `);
  }
});
