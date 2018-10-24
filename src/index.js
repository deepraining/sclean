import commander from 'commander';
import inquirer from 'inquirer';

import pkg from '../package.json';
import { registerArchiveTask, registerRestoreTask } from './tasks';
import { getArchiveName, getZipFile } from './util';
import { log } from './logger';
import run from './run';

const { prompt } = inquirer;

// version
commander.version(pkg.version);

// archive
commander
  .command('archive <directory>')
  .description('archive target directory to a zip file')
  .action(dir => {
    const archiveName = getArchiveName(dir);
    registerArchiveTask(dir, archiveName);
    run('archive', () => {
      log(`
  archived ${archiveName}    
      `);
    });
  });

// restore
commander
  .command('restore <directory>')
  .description('restore target directory to last nth archive state')
  .option('-i, --index [index]', 'last nth state to restore')
  .action((dir, { index = 1 }) => {
    const file = getZipFile(dir, index);

    if (!file) {
      log(`
  file not found by directory ${dir} and index ${index}    
      `);
      return;
    }

    prompt([
      {
        name: 'goon',
        type: 'confirm',
        message: 'existed files will be overwritten, are you sure to restore?',
      },
    ]).then(({ goon }) => {
      if (!goon) return;

      registerRestoreTask(dir, file);
      run('restore', () => {
        log(`
  restored ${file} to ${dir}    
      `);
      });
    });
  });

commander.parse(process.argv);
