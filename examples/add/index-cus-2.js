
require('../../util/change_cwd')(__dirname + '/demo');

require('./cus');

require('../../util/exec')('sclean add parent/test/index');
