const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');

const filesCount = require('../../util/files_count');

const script = path.join(__dirname, 'demo.js');
const demoDir = path.join(__dirname, 'demo');

describe('init command', () => {
  // 60s timeout
  jest.setTimeout(60000);

  beforeAll(() => {
    if (!fs.existsSync(demoDir)) {
      fse.ensureDirSync(demoDir);
    }
  });

  afterAll(() => {
    if (fs.existsSync(demoDir)) {
      fse.removeSync(demoDir);
    }
  });

  test('init', done => {
    const child = spawn('node', [script]);

    let stdoutCount = 0;
    let stdoutMessage;

    child.stdout.on('data', data => {
      stdoutCount += 1;
      stdoutMessage = data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      // Has one stdout
      expect(stdoutCount).toBe(1);
      // Has stdout
      expect(stdoutMessage).not.toBeUndefined();
      // Has stdout
      expect(stdoutMessage).toContain('successfully!');
      // 1 files `sclean.config.js`
      expect(filesCount(demoDir)).toBe(1);
      done();
    });
  });

  test('init second times', done => {
    const child = spawn('node', [script]);

    let stderrCount = 0;
    let stderrMessage;

    child.stderr.on('data', data => {
      stderrCount += 1;
      stderrMessage = data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(1);
      // Has one stderr
      expect(stderrCount).toBe(1);
      // Has stderr
      expect(stderrMessage).not.toBeUndefined();
      // Has stderr
      expect(stderrMessage).toContain('Current directory has already been initialized.');
      done();
    });
  });
});
