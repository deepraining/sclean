const cloneDeep = require('lodash/cloneDeep');
const forEach = require('lodash/forEach');

// Default config root attributes.
const defaultValue = {
  // Target directory to handle.
  target: 'dist',
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
