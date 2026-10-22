/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cloudinary: {
          blue: '#3448C5',
          dark: '#0e153a',
          cyan: '#00F0FF',
          accent: '#4353FF',
        }
      }
    },
  },
  plugins: [],
}
