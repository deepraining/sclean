const chalk = require('chalk');

const packageJson = require('../package.json');

const version = packageJson.version;

// cli options
const options = {};

// all commands
const commands = [
  {
    name: 'init',
    desc: 'Init current directory for clean.',
  },
  {
    name: 'archive',
    desc: 'Archive target directory.',
  },
  {
    name: 'arc',
    desc: 'Alias of command archive.',
  },
  {
    name: 'clean',
    desc: `${chalk.blue('[Default command]')} Clean redundant files caused by revision(filename by each file's hash code).`,
  },
  {
    name: 'revert',
    desc: 'Revert target directory to last archive state.',
  },
];

/**
 * show help info
 */
module.exports = () => {
  // Ensure process.argv has 'h|help' argument.
  process.argv.indexOf('-h') < 0 && process.argv.indexOf('--help') < 0 && process.argv.push('-h');

  // Must import `yargs` in here, for ensuring -h/--help which used by yargs.
  const yargs = require('yargs');

  // Make an instance
  const yargsInstance = yargs.usage('\nUsage: sclean <command> [args]');

  // Show all commands
  commands.forEach(cmd => {
    yargsInstance.command(cmd.name, cmd.desc);
  });

  // Make argv
  const argv = yargsInstance
    .help('help')
    .alias('help', 'h')
    .version('version', version)
    .alias('version', 'v')
    .options(options).argv;

  // print all
  console.dir(argv);
};
