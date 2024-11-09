/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#36454f',
        melon: '#febaad',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      }
    }
  },
  plugins: [],
}