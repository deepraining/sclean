const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');

const script = path.join(__dirname, 'index-3.js');
const demoDir = path.join(__dirname, 'demo-3');
const distDir = path.join(__dirname, 'demo-3/dist');

describe('clean command [demo]', () => {
  // 60s timeout
  jest.setTimeout(60000);

  beforeAll(() => {
    if (fs.existsSync(distDir)) {
      fse.removeSync(distDir);
    }
    fs.readdirSync(demoDir).filter(file => {
      if (file.slice(-4) === '.zip') {
        fse.removeSync(path.join(demoDir, file));
      }
    });
  });

  afterAll(() => {
    if (fs.existsSync(distDir)) {
      fse.removeSync(distDir);
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
    let errMessage = '';

    child.stderr.on('data', data => {
      errMessage += data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(1);
      expect(errMessage).toContain('Found 0');
      done();
    });
  });
});
