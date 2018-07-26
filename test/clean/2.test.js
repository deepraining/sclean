const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');

const filesCount = require('../../util/files_count');

const script = path.join(__dirname, 'index-2.js');
const demoDir = path.join(__dirname, 'demo-2');
const targetDir = path.join(__dirname, 'demo-2/target');
const bakDir = path.join(__dirname, 'demo-2/bak');

describe('clean command [demo-2]', () => {
  // 60s timeout
  jest.setTimeout(60000);

  beforeAll(() => {
    if (fs.existsSync(targetDir)) {
      fse.removeSync(targetDir);
    }
    fs.readdirSync(demoDir).filter(file => {
      if (file.slice(-4) === '.zip') {
        fse.removeSync(path.join(demoDir, file));
      }
    });
  });

  afterAll(() => {
    if (fs.existsSync(targetDir)) {
      fse.removeSync(targetDir);
    }
    fs.readdirSync(demoDir).filter(file => {
      if (file.slice(-4) === '.zip') {
        fse.removeSync(path.join(demoDir, file));
      }
    });
  });

  test('clean', done => {
    const child = spawn('node', [script]);

    // Last message
    let stdoutMessage = '';

    child.stdout.on('data', data => {
      stdoutMessage += data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      // Has stdout
      expect(stdoutMessage).not.toBeUndefined();
      // Has stdout
      expect(stdoutMessage).toContain('other.89abcdef.js');
      expect(stdoutMessage).toContain('inner/inner.12345678.css');
      expect(stdoutMessage).toContain('async.229.d4025f09.js');
      expect(stdoutMessage).toContain('async.9.3c7c4210.js');
      // Deleted 4 files
      expect(filesCount(targetDir)).toBe(filesCount(bakDir) - 4);
      expect(fs.existsSync(path.join(targetDir, 'other.89abcdef.js'))).toBeFalsy();
      expect(fs.existsSync(path.join(targetDir, 'inner/inner.12345678.css'))).toBeFalsy();
      expect(fs.existsSync(path.join(targetDir, 'async.229.d4025f09.js'))).toBeFalsy();
      expect(fs.existsSync(path.join(targetDir, 'async.9.3c7c4210.js'))).toBeFalsy();
      done();
    });
  });
});
