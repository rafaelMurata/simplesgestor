const { composePlugins, withNx } = require('@nx/next')

const nextConfig = {
  nx: {
    svgr: false,
  },
  experimental: {
    nodeMiddleware: true,
    serverActions: {}
  }
}

module.exports = composePlugins(withNx, nextConfig)
