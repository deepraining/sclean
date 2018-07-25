const fs = require('fs');
const rd = require('rd');

const pathInfo = require('../../data/path_info');
const pathUtil = require('../../util/path');
const projectConfig = require('../../project_config');

const makeRegExp = require('../clean/reg_exp');

/**
 * Extract `js` chunk hash codes from all normal js files.
 *
 * @returns {Array}
 */
module.exports = () => {
  const hashCodes = [];

  const dir = `${pathInfo.projectRoot}/${projectConfig.target}`;

  // Find all files and extract hash codes.
  rd.eachFileFilterSync(dir, file => {
    // Only from js files.
    if (file.slice(-3) !== '.js') return;

    // File path.
    const filePath = pathUtil.replaceBackSlash(file);

    const lastSlashIndex = filePath.lastIndexOf('/');
    const fileName = lastSlashIndex === -1 ? filePath : filePath.slice(lastSlashIndex + 1);

    // Is js chunk file, not handle.
    if (projectConfig.testChunkFile.test(fileName)) return;

    // File content.
    const content = fs.readFileSync(file);

    const regExp = makeRegExp(projectConfig.hashLength);
    let result;
    while ((result = regExp.exec(content))) {
      hashCodes.push(result[1]);
    }
  });

  return hashCodes;
};
