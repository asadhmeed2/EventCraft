//** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
   
    extend: {
      colors: {
        
        'secondary': {
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#cfc22b',
          900: '#aac22b',
        },
        'primary':'#2222'
      },
    },
  },
  plugins: [],
}

