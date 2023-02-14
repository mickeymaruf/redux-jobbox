/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#691f74",
        secondary: "#FFF0D9",
      },
    },
  },
  plugins: [require('@tailwindcss/forms'),],
}