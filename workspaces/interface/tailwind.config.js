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
      }
    },
  },
  plugins: [],
}

