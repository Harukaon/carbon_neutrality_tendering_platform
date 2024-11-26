/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'dots-light': 'radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
        'dots-dark': 'radial-gradient(rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px)',
      },
      backgroundSize: {
        'dots': '40px 40px',
      },
    },
  },
  plugins: [],
} 