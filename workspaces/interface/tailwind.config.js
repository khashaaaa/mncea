/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "main": "rgb(0, 52, 143)",
        "accentOne": "rgb(0, 65, 179)",
        "accentTwo": "rgb(46, 84, 219)"
      }
    },
  },
  plugins: [],
}

