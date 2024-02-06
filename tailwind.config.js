/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{jsx,js}",
  ],
  theme: {
    extend: {
      scrollbar: ['rounded', 'dark'],
      colors: {
        'primary': '#f3c614',
        'secondary': '#353535',
        'danger': '#e3342f',
        'custom-blue': '#8A8AFF',
      },
      fontFamily: {
        'body': ['Roboto'],
      },
      screens: {
        'md': '900px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

