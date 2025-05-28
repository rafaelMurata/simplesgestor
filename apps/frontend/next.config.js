const { composePlugins, withNx } = require('@nx/next')

const nextConfig = {
  nx: {
    svgr: false,
  },
  experimental: {
    serverActions: true,
    nodeMiddleware: true
  }
}

module.exports = composePlugins(withNx(nextConfig));
