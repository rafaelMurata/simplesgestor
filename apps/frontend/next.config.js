const { composePlugins, withNx } = require('@nx/next')

const nextConfig = {
  nx: {
    svgr: false,
  },
  experimental: {
    serverActions: true,
    optimizeCss: true
  }
}

module.exports = composePlugins(withNx(nextConfig));
