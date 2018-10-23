
const fse = require('fs-extra');
fse.copySync(__dirname + '/demo/bak', __dirname + '/demo/target');

require('../../util/change_cwd')(__dirname + '/demo');

require('../../util/exec')('sclean');
