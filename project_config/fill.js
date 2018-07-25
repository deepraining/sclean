const cloneDeep = require('lodash/cloneDeep');
const forEach = require('lodash/forEach');

// Default config root attributes.
const defaultValue = {
  // Target directory to handle.
  target: 'dist',
  // Html extension, such as `html`, `jsp`, `php`, default is `html`.
  htmlExtension: 'html',
  // Hash code length.
  hashLength: 32,
  // Test a file is a chunk js file or not. See [Dynamic Imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports).
  testChunkFile: /^[0-9]{1,4}\./,
};

/**
 * Fill default value to config.
 *
 * @param config
 */
module.exports = config => {
  forEach(defaultValue, (value, key) => {
    if (typeof config[key] === 'undefined') {
      config[key] = typeof value === 'object' ? cloneDeep(value) : value;
    }
  });
};
