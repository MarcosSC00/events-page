/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'modal':'1px 1px 10px rgb(0,0,0)'
      }
    },
  },
  plugins: [],
}

