const { composePlugins, withNx } = require('@nx/next');

const nextConfig = {
  nx: {
    svgr: false,
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  transpilePackages: ['@simplesgestor/ui'],
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  }
};

module.exports = composePlugins(withNx(nextConfig));
