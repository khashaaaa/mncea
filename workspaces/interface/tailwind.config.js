/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "main": "rgb(7, 21, 92)",
        "sec": "rgb(13, 36, 77)",
        "acc": "rgb(255, 187, 0)"
      },
      backgroundImage: {
        'carousel_back': "url('/carousel_back.jpg')"
      },
      screens: {
        'sm': { min: '1px', max: '767px' },
        'md': { min: '768px', max: '1365px' },
        'lg': { min: '1366px', max: '1679px' },
        'xl': { min: '1680px', max: '1919px' },
        '2xl': { min: '1920px' }
      }
    },
  },
  plugins: [],
}

