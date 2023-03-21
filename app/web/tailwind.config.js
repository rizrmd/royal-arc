/** @type {import('tailwindcss').Config} */
const color = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: color.blue,
      },
    },
  },
  plugins: [],
};
