const fs = require('fs');
const rd = require('rd');

const pathInfo = require('../../data/path_info');
const logger = require('../../util/logger');
const projectConfig = require('../../project_config');

const makeRegExp = require('../clean/reg_exp');

/**
 * Extract `js/css` hash codes from all html files.
 *
 * @returns {Array}
 */
module.exports = () => {
  const hashCodes = [];

  const targetDir = `${pathInfo.projectRoot}/${projectConfig.target}`;

  let htmlFileCount = 0;

  // Find all files and extract hash codes.
  rd.eachFileFilterSync(targetDir, file => {
    if (file.slice(0 - projectConfig.htmlExtension.length) !== projectConfig.htmlExtension) return;

    // File content.
    const content = fs.readFileSync(file);

    const regExp = makeRegExp(projectConfig.hashLength);
    let result;
    while ((result = regExp.exec(content))) {
      hashCodes.push(result[1]);
    }

    htmlFileCount += 1;
  });

  if (!htmlFileCount) {
    logger.error(`
  Found 0 '${projectConfig.htmlExtension}' files in '${projectConfig.target}' directory.
    `);

    process.exit(1);
  }

  return hashCodes;
};
