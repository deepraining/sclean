const path = require('path');

const pathInfo = {
  // sclean root directory
  scleanRoot: path.join(__dirname, '../'),
  // project root directory
  projectRoot: process.cwd(),
  // config file
  configFile: 'sclean.config.js',
};

// Config file path.
pathInfo.configFilePath = path.join(pathInfo.projectRoot, pathInfo.configFile);

// gulpfile.js
pathInfo.gulpFile = path.join(pathInfo.scleanRoot, 'gulpfile.js');

/**
 * Some path information.
 *
 * @type {{scleanRoot: *|string, projectRoot: *|String, configFile: string}}
 */
module.exports = pathInfo;
