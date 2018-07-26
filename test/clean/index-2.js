const fse = require('fs-extra');

fse.copySync(__dirname + '/demo-2/bak', __dirname + '/demo-2/target');

require('../../util/change_cwd')(__dirname + '/demo-2');

require('../../util/exec')('sclean');
