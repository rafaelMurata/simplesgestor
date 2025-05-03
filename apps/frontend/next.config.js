const { composePlugins, withNx } = require('@nx/next')

const nextConfig = {
  nx: {
    svgr: false,
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: true
  }
}

module.exports = composePlugins(withNx, nextConfig)
