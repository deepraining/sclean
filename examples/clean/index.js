const fse = require('fs-extra'); // eslint-disable-line

const { copySync, removeSync } = fse;

removeSync(`${__dirname}/target`);
copySync(`${__dirname}/bak`, `${__dirname}/target`);

process.chdir(__dirname);
require('../exec')('sclean clean target');
