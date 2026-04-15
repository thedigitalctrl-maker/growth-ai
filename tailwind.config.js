/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F6B5E',
        secondary: '#FF6B4A',
        background: '#FFFFFF',
        text: '#2C3E50',
        linkedin: '#0A66C2',
      },
    },
  },
  plugins: [],
}