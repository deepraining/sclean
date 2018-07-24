module.exports = {
  target: 'target',
  htmlExtension: 'php',
  extractFromHtml: () => {
    return /\/[^.]+\.([0-9a-f]{8})\./g;
  },
  matchFileName: () => {
    return /^[^.]+\.([0-9a-f]{8})\.(js|css)$/g;
  },
  matchJsFileName: () => {
    return /\/[^.]+\.[0-9a-f]{8}\.js$/i;
  },
  extractFromJs: () => {
    return /["']([0-9a-f]{8})\.async["']/g;
  },
  matchJsChunkFileName: () => {
    return /^[0-9]+\.([0-9a-f]{8})\.async\.js$/i;
  },
};
