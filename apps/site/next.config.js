const { composePlugins, withNx } = require('@nx/next');

/** @type {import('next').NextConfig} */
const nextConfig = {
  nx: {
    svgr: false, // Desabilita SVGR integrado
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  transpilePackages: ['@simplesgestor/shared-models'],
  experimental: {
    optimizeCss: false,
  },
  env: {
    NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:4200/auth/login',
  },
};

module.exports = composePlugins(withNx)(nextConfig);
