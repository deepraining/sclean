require('../../util/change_cwd')(__dirname + '/demo');

require('../../util/exec')('sclean prettier test-2/*');
