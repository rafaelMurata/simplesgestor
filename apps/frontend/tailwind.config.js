const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    ...createGlobPatternsForDependencies(__dirname),
    '../../libs/ui/src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1976d2',
        'primary-dark': '#115293'
      }
    }
  },
  plugins: [],
}
