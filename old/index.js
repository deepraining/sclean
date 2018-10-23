const fs = require('fs');

const packageJson = require('./package.json');
const argv = require('./data/argv');
const cliInfo = require('./data/cli_info');
const pathInfo = require('./data/path_info');
const logger = require('./util/logger');
const help = require('./util/help');

// package version
const version = packageJson.version;

// -v --version
if (argv.v || argv.version) {
  logger.log(version);
  process.exit(0);
}
// -h --help
if (argv.h || argv.help) {
  help();
  process.exit(0);
}

// command name
const commandName = argv._[0] || 'clean';

// Record current command name.
cliInfo.command = commandName;

// File path corresponding to command.
const commandPath = `${pathInfo.scleanRoot}/cmd/${commandName}.js`;

// has command
if (commandName && fs.existsSync(commandPath)) {
  require(commandPath);
}
// no command or not exist
else {
  help();
  process.exit(0);
}
