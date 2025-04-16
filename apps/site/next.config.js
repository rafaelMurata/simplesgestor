const { composePlugins, withNx } = require('@nx/next');

module.exports = composePlugins(withNx, {
  nx: {
    svgr: false,
  },
  // Remova 'output: export' se não for fazer deploy estático
  images: {
    unoptimized: true,
  }
});
