const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,css}',
    ...createGlobPatternsForDependencies(__dirname),
    '../../libs/ui/src/**/*.{js,ts,jsx,tsx,css}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
