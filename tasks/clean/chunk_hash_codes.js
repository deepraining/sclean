const fs = require('fs');
const rd = require('rd');

const pathInfo = require('../../data/path_info');
const pathUtil = require('../../util/path');
const projectConfig = require('../../project_config');

/**
 * Extract `js` chunk hash codes from all normal js files.
 *
 * @returns {Array}
 */
module.exports = () => {
  const hashCodes = [];

  const dir = `${pathInfo.projectRoot}/${projectConfig.target}`;
  const testRegExp = projectConfig.matchJsFileName();

  // Find all files and extract hash codes.
  rd.eachFileFilterSync(dir, file => {
    // File path.
    const filePath = pathUtil.replaceBackSlash(file);
    if (!testRegExp.test(filePath)) {
      return;
    }

    // File content.
    const content = fs.readFileSync(file);

    const regExp = projectConfig.extractFromJs();
    let result;
    while ((result = regExp.exec(content))) {
      hashCodes.push(result[1]);
    }
  });

  return hashCodes;
};
