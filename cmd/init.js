const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');

const pathInfo = require('../data/path_info');
const logger = require('../util/logger');

if (fs.existsSync(pathInfo.configFilePath)) {
  logger.warn(`
  Current directory has already been initialized.
  `);
  process.exit(0);
}

fse.copyFileSync(path.join(pathInfo.scleanRoot, 'project_files/sclean.config.js'), pathInfo.configFilePath);

logger.success(`
  Sclean initialize successfully!
`);
