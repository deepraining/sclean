import fs from 'fs';
import commander from 'commander';
import inquirer from 'inquirer';
import ora from 'ora';
import del from 'del';
import readdir from 'recursive-readdir';

import pkg from '../package.json';
import { registerArchiveTask, registerRestoreTask } from './tasks';
import { getArchiveName, getZipFile, hashCodes, filesToDelete } from './util';
import { log } from './logger';
import run from './run';

const { existsSync } = fs;
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
  .option('-i, --index [index]', 'last nth state to restore', 1)
  .action((dir, { index }) => {
    const file = getZipFile(dir, parseInt(index, 10));

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

// clean
commander
  .command('clean <directory>')
  .description('clean obsolete hash-code files')
  .option('-e, --ext [ext]', 'html extension', 'html')
  .option('-H, --hash [hash]', 'hash length', 32)
  .action((dir, { ext, hash }) => {
    if (!existsSync(dir)) return;

    const spinner = ora('loading files').start();
    readdir(dir, (err, files) => {
      if (err) throw err;

      if (!files || !files.length) {
        spinner.stop();
        return;
      }

      const result = hashCodes({ files, ext, hash });

      if (result.error) {
        spinner.stop();
        log(`
  ${result.message}    
        `);
        return;
      }

      const { codes } = result;
      const delFiles = filesToDelete({ files, hash, codes });

      spinner.stop();
      prompt([
        {
          name: 'goon',
          type: 'confirm',
          message: `${
            delFiles.length
          } files to be deleted, are you sure to continue?`,
        },
      ]).then(({ goon }) => {
        if (!goon) return;

        const archiveName = getArchiveName(dir);
        registerArchiveTask(dir, archiveName);
        run('archive', () => {
          spinner.text = 'deleting files';
          spinner.start();

          del(delFiles).then(() => {
            spinner.stop();

            log('');
            if (delFiles.length < 11)
              delFiles.forEach(file => {
                log(`  ${file}`);
              });
            else {
              [...delFiles.slice(0, 5), '...', ...delFiles.slice(-5)].forEach(
                file => {
                  log(`  ${file}`);
                }
              );
            }

            log(`
  cleaned ${delFiles.length} files
            `);
          });
        });
      });
    });
  });

commander.parse(process.argv);
