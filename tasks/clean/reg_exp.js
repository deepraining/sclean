/**
 * Get RegExp to extract or match hash codes.
 *
 * @param hashLength
 * @returns {RegExp}
 */
module.exports = hashLength => {
  return new RegExp(`[^0-9a-f]([0-9a-f]{${hashLength}})[^0-9a-f]`, 'g');
};
