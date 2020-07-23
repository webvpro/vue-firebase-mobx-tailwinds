const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const atImport = require('postcss-import');
module.exports = {
  plugins: [
    atImport,
    tailwindcss,
    autoprefixer,
  ],
};