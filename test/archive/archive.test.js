const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');

const { readdirSync } = fs;
const { removeSync } = fse;

const filesCount = require('../files-count');

const deleteAllZip = () => {
  readdirSync(__dirname).forEach(file => {
    if (file.slice(-4) === '.zip') {
      removeSync(path.join(__dirname, file));
    }
  });
};

describe('archive cmd', () => {
  // 60s timeout
  jest.setTimeout(60000);

  beforeAll(() => {
    deleteAllZip();
  });

  afterAll(() => {
    deleteAllZip();
  });

  test('no directory argument', done => {
    const child = spawn('node', ['test/archive/no-dir.js']);

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
      expect(filesCount(__dirname, '.zip')).toBe(0);
      done();
    });
  });

  test('archive build directory(not exist)', done => {
    const child = spawn('node', ['test/archive/not-exist.js']);

    let msg = '';

    child.stdout.on('data', data => {
      msg += data.toString();
    });

    child.stderr.on('data', data => {
      msg += data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      expect(msg).toContain('starting task archive');
      expect(msg).toContain('finished task archive');
      expect(msg).toContain('archived');
      expect(filesCount(__dirname, '.zip')).toBe(0);
      done();
    });
  });

  test('archive target directory', done => {
    const child = spawn('node', ['test/archive/index.js']);

    let msg = '';

    child.stdout.on('data', data => {
      msg += data.toString();
    });

    child.stderr.on('data', data => {
      msg += data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      expect(msg).toContain('starting task archive');
      expect(msg).toContain('finished task archive');
      expect(msg).toContain('archived');
      expect(filesCount(__dirname, '.zip')).toBe(1);
      done();
    });
  });
});
