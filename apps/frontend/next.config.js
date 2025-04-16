// apps/frontend/next.config.js
const { composePlugins, withNx } = require('@nx/next');
const withTM = require('next-transpile-modules')(['@simplesgestor/ui']);

module.exports = composePlugins(withNx, withTM, {
  nx: { svgr: false },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    });
    return config;
  }
});
