const { composePlugins, withNx } = require('@nx/next');
const withImages = require('next-images');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@simplesgestor/shared-models', '@simplesgestor/ui'],
  env: {
    NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:4200/auth/login',
  },
};

// Combine os plugins corretamente
module.exports = composePlugins(withNx, withImages)(nextConfig);
