const logger = require('../util/logger');
const projectConfig = require('../project_config');

const share = {
  // File name of zip.
  zipFileName: '',
};

// End handler after archive.
share.endHandler = cb => {
  logger.success(`
  Pack '${projectConfig.target}' directory successfully!
  
  You can find it '${share.zipFileName}' in current directory.
  `);

  cb();
};

module.exports = share;
