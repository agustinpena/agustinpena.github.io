/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./js/**/*.js",
    "./projects/**/*.html",
    "./projects/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0ea5e9",
        accent: "#38bdf8",
        dark: {
          900: "#0a0e1a",
          800: "#0f1629",
          700: "#151d35",
          600: "#1c2744",
          500: "#243052",
        },
      },
    },
  },
  plugins: [],
};
