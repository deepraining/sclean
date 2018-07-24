const cloneDeep = require('lodash/cloneDeep');
const forEach = require('lodash/forEach');

// Default config root attributes.
const defaultValue = {
  // Target directory to handle.
  target: 'dist',
  // Html extension, such as `html`, `jsp`, `php`, default is `html`.
  htmlExtension: 'html',
  /**
   * Match `js/css` files in html.
   *
   * @example
   *
   * ```
   * prefix/32-hash.js
   * prefix/32-hash.css
   * ```
   *
   * @returns {RegExp}
   */
  extractFromHtml: () => {
    return /\/([0-9a-f]{32})\./g;
  },
  /**
   * Match `js/css` file name.
   *
   * @example
   *
   * ```
   * 32-hash.js
   * 32-hash.css
   * ```
   *
   * @returns {RegExp}
   */
  matchFileName: () => {
    return /^([0-9a-f]{32})\./g;
  },
  /**
   * Match `js` file name.
   *
   * @example
   *
   * ```
   * prefix/32-hash.js
   *
   * ```
   *
   * @returns {RegExp}
   */
  matchJsFileName: () => {
    return /\/[0-9a-f]{32}\.js$/i;
  },
  /**
   * Match js chunk file name.
   *
   * @example
   *
   * ```
   * {"0":"7b7c4210539c2c41354207f419ec0249","1":"721ea8e8a5ae693fd7ed70b501c7d28c","2":"e2025f09faac9dd460cbac6913cfbda6"}
   * ```
   *
   * @returns {RegExp}
   */
  extractFromJs: () => {
    return /["']([0-9a-f]{32})["']/g;
  },
  /**
   * Match chunk js file name.
   *
   * @example
   *
   * ```
   * prefix/123.32-hash.js
   * ```
   *
   * @param hashLength
   * @returns {RegExp}
   */
  matchJsChunkFileName: hashLength => {
    return /\/[0-9]+\.[0-9a-f]{32}\.js$/i;
  },
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
