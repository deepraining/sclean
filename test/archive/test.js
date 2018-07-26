const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');

const filesCount = require('../../util/files_count');

const script = path.join(__dirname, 'archive.js');
const demoDir = path.join(__dirname, 'demo');

describe('archive command', () => {
  // 60s timeout
  jest.setTimeout(60000);

  beforeAll(() => {
    fs.readdirSync(demoDir).filter(file => {
      if (file.slice(-4) === '.zip') {
        fse.removeSync(path.join(demoDir, file));
      }
    });
  });

  afterAll(() => {
    fs.readdirSync(demoDir).filter(file => {
      if (file.slice(-4) === '.zip') {
        fse.removeSync(path.join(demoDir, file));
      }
    });
  });

  test('archive a non-existed directory', done => {
    const child = spawn('node', [path.join(__dirname, 'not-exist.js')]);

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
      expect(stderrMessage).toContain("Missing 'dist' directory for command: archive.");
      done();
    });
  });

  test('archive', done => {
    const child = spawn('node', [script]);

    // Last message
    let stdoutMessage;

    child.stdout.on('data', data => {
      stdoutMessage = data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      // Has stdout
      expect(stdoutMessage).not.toBeUndefined();
      // Has stdout
      expect(stdoutMessage).toContain("Pack 'dist' directory successfully!");
      // 1 files
      expect(filesCount(demoDir, '.zip')).toBe(1);
      done();
    });
  });
});
