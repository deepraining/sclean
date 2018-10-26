const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');

const { existsSync, readdirSync } = fs;
const { removeSync } = fse;

const filesCount = require('../files-count');

const targetPath = path.join(__dirname, 'target');
const target2Path = path.join(__dirname, 'target-2');

const deleteTarget = () => {
  removeSync(targetPath);
  removeSync(target2Path);
};
const deleteAllZip = () => {
  readdirSync(__dirname).forEach(file => {
    if (file.slice(-4) === '.zip') {
      removeSync(path.join(__dirname, file));
    }
  });
};

describe('clean cmd', () => {
  // 60s timeout
  jest.setTimeout(60000);

  beforeAll(() => {
    deleteTarget();
    deleteAllZip();
  });

  afterAll(() => {
    deleteTarget();
    deleteAllZip();
  });

  test('no directory argument', done => {
    const child = spawn('node', ['test/clean/no-dir.js']);

    let msg = '';

    child.stdout.on('data', data => {
      msg += data.toString();
    });

    child.stderr.on('data', data => {
      msg += data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(1);
      expect(msg).toContain('missing required argument');
      expect(existsSync(targetPath)).toBeFalsy();
      done();
    });
  });

  test('clean build directory(not exist)', done => {
    const child = spawn('node', ['test/clean/not-exist.js']);

    let msg = '';

    child.stdout.on('data', data => {
      msg += data.toString();
    });

    child.stderr.on('data', data => {
      msg += data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      expect(msg).toBe('');
      done();
    });
  });

  test('clean target directory', done => {
    const child = spawn('node', ['test/clean/index.js']);

    let msg = '';

    child.stdout.on('data', data => {
      if (data.toString().indexOf('(Y/n)') > -1) child.stdin.write('\r');
      msg += data.toString();
    });

    child.stderr.on('data', data => {
      msg += data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      expect(msg).toContain('cleaned 4 files');
      expect(filesCount(targetPath)).toBe(14); // 18 - 4
      expect(
        existsSync(`${targetPath}/abcdef123456789abcdef123456789bb.js`)
      ).toBeFalsy();
      expect(
        existsSync(`${targetPath}/inner/123456789abcdef123456789abcdef33.css`)
      ).toBeFalsy();
      expect(
        existsSync(`${targetPath}/229.e2025f09faac9dd460cbac6913cfbd78.js`)
      ).toBeFalsy();
      expect(
        existsSync(`${targetPath}/9.7b7c4210539c2c41354207f419ec0243.js`)
      ).toBeFalsy();
      expect(filesCount(__dirname, '.zip')).toBe(1);
      done();
    });
  });

  test('clean target-2 directory', done => {
    const child = spawn('node', ['test/clean/2.js']);

    let msg = '';

    child.stdout.on('data', data => {
      if (data.toString().indexOf('(Y/n)') > -1) child.stdin.write('\r');
      msg += data.toString();
    });

    child.stderr.on('data', data => {
      msg += data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      expect(msg).toContain('cleaned 4 files');
      expect(filesCount(target2Path)).toBe(12); // 16 - 4
      expect(existsSync(`${target2Path}/other.89abcdef.js`)).toBeFalsy();
      expect(existsSync(`${target2Path}/inner/inner.12345678.css`)).toBeFalsy();
      expect(existsSync(`${target2Path}/async.229.d4025f09.js`)).toBeFalsy();
      expect(existsSync(`${target2Path}/async.9.3c7c4210.js`)).toBeFalsy();
      expect(filesCount(__dirname, '.zip')).toBe(2);
      done();
    });
  });
});
