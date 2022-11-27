/** @type {import('tailwindcss').Config} */
const color = require('tailwindcss/colors')
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',],
  theme: {
    extend: {
      colors: {
        primary: color.blue
      }
    },
  },
  plugins: [],
}
