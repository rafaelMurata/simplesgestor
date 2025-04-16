const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  images: {
    unoptimized: true,
  }
};

// Correct format for composePlugins
module.exports = composePlugins(withNx)(nextConfig);
