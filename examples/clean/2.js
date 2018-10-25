const fse = require('fs-extra'); // eslint-disable-line

const { copySync, removeSync } = fse;

removeSync(`${__dirname}/target-2`);
copySync(`${__dirname}/bak-2`, `${__dirname}/target-2`);

process.chdir(__dirname);
require('../exec')('sclean target-2 --ext php --hash 8');
