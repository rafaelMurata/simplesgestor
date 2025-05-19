const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    ...createGlobPatternsForDependencies(__dirname),
    '../../libs/ui/src/**/*.{js,ts,jsx,tsx}' // Adicione caminho da lib UI
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
