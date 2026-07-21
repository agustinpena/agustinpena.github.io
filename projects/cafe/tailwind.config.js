/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"], // Busca en todos los HTML del proyecto
  theme: {
    extend: {
      colors: {
        coffee: {
          50: "#fdf8f0",
          100: "#f9edda",
          200: "#f0d5b0",
          300: "#e4b87a",
          400: "#d99a4a",
          500: "#c07c2a",
          600: "#a36320",
          700: "#864c1d",
          800: "#6d3d1e",
          900: "#5a331d",
          950: "#331a0c",
        },
      },
    },
  },
  plugins: [],
};

