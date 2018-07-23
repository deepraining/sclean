const forEach = require('lodash/forEach');

/**
 * Option for local name, it can override config root attribute.
 *
 * And this should only be defined in `sclean.config.js`
 *
 * @param config
 */
module.exports = config => {
  const option = config.local && config.localOptions && config.localOptions[config.local];

  if (!option) {
    return;
  }

  forEach(option, (value, key) => {
    config[key] = value;
  });
};
