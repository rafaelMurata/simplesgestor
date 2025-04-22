const { composePlugins, withNx } = require('@nx/next');

const nextConfig = {
  nx: {
    svgr: false,
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['@nestjs/microservices', '@grpc/grpc-js']
  }
};

module.exports = composePlugins(withNx(nextConfig));
