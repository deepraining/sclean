const { spawn } = require('child_process');

describe('base', () => {
  // 60s timeout
  jest.setTimeout(60000);

  test('no cmd', done => {
    const child = spawn('node', ['test/no-cmd.js']);

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
});
