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
        "accentOne": "rgb(214, 76, 58)"
      },
      height: {
        "showcase": "300px"
      }
    },
  },
  plugins: [],
}

