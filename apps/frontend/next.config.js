const { composePlugins, withNx } = require('@nx/next')

const nextConfig = {
  nx: {
    svgr: false,
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  }
}

module.exports = composePlugins(withNx, (config) => {
  return {
    ...config,
    experimental: {
      ...config.experimental,
      serverActions: true
    }
  }
})(nextConfig)
