const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');

const { existsSync } = fs;
const { removeSync } = fse;

const filesCount = require('../files-count');

const targetPath = path.join(__dirname, 'target');

const deleteTarget = () => {
  removeSync(targetPath);
};

describe('restore cmd', () => {
  // 60s timeout
  jest.setTimeout(60000);

  beforeAll(() => {
    deleteTarget();
  });

  afterAll(() => {
    deleteTarget();
  });

  test('no directory argument', done => {
    const child = spawn('node', ['test/restore/no-dir.js']);

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

  test('restore build directory(not exist)', done => {
    const child = spawn('node', ['test/restore/not-exist.js']);

    let msg = '';

    child.stdout.on('data', data => {
      msg += data.toString();
    });

    child.stderr.on('data', data => {
      msg += data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      expect(msg).toContain('file not found');
      expect(existsSync(targetPath)).toBeFalsy();
      done();
    });
  });

  test('restore target directory', done => {
    const child = spawn('node', ['test/restore/index.js']);

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
      expect(msg).toContain('starting task restore');
      expect(msg).toContain('finished task restore');
      expect(msg).toContain('restored');
      expect(filesCount(targetPath)).toBe(2);
      expect(existsSync(`${targetPath}/11.js`)).toBeTruthy();
      expect(existsSync(`${targetPath}/inner/12.js`)).toBeTruthy();
      done();
    });
  });

  test('restore target directory (index: 2)', done => {
    const child = spawn('node', ['test/restore/2.js']);

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
      expect(msg).toContain('starting task restore');
      expect(msg).toContain('finished task restore');
      expect(msg).toContain('restored');
      expect(filesCount(targetPath)).toBe(4);
      expect(existsSync(`${targetPath}/1.js`)).toBeTruthy();
      expect(existsSync(`${targetPath}/inner/2.js`)).toBeTruthy();
      done();
    });
  });

  test('restore target directory (index: 3)', done => {
    const child = spawn('node', ['test/restore/3.js']);

    let msg = '';

    child.stdout.on('data', data => {
      msg += data.toString();
    });

    child.stderr.on('data', data => {
      msg += data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      expect(msg).toContain('file not found');
      done();
    });
  });
});
