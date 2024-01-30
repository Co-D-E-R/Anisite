/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{jsx,js}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#f3c614',
        'secondary': '#353535',
        'danger': '#e3342f',
      },
      fontFamily: {
        'body': ['Roboto'],
      },
      screens: {
        'md': '900px',
      },
    },
  },
  plugins: [],
}

