const fse = require('fs-extra');

fse.copySync(__dirname + '/demo-3/bak', __dirname + '/demo-3/dist');

require('../../util/change_cwd')(__dirname + '/demo-3');

require('../../util/exec')('sclean');
