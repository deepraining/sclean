/**
 * Path utils.
 *
 * @type {{
 *     replaceBackSlash: function(*)
 * }}
 */
module.exports = {
  /**
   * Replace back slash with slash.
   *
   * @example
   *
   * ```
   * \\ -> /
   * \\\\ -> /
   * ```
   *
   * @param str
   * @returns {string}
   */
  replaceBackSlash: str => {
    return str.replace(/(\\\\|\\)/g, '/');
  },
};
