const { composePlugins, withNx } = require('@nx/next')

const nextConfig = {
  nx: {
    svgr: false,
  },
  experimental: {
    serverActions: {  },
    nodeMiddleware: false
  }
}

module.exports = composePlugins(withNx)(nextConfig);
