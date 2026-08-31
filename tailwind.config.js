/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        retro: {
          bg: '#B9D2E8',
          surface: '#FDF8EE',
          'surface-alt': '#FBF6EA',
          ink: '#2D2319',
          coral: '#F28B82',
          mustard: '#F6C445',
          teal: '#48B89F',
          sky: '#4BA3E3',
          lilac: '#C3A6E8'
        },
        brand: {
          dark: '#1e293b',
          nav: '#2c3e50',
          blue: '#1888ff',
          lightBlue: '#e0f2fe',
          green: '#48bb78',
          lightGreen: '#e6f9ed',
          gold: '#f59e0b',
          coral: '#f87171',
          bone: '#f8fafc'
        }
      },
      boxShadow: {
        'retro': '4px 4px 0px #2D2319',
        'retro-sm': '2px 2px 0px #2D2319',
        'retro-lg': '6px 6px 0px #2D2319',
        'retro-pressed': '1px 1px 0px #2D2319',
      },
      fontFamily: {
        sans: ['Rubik', 'Montserrat', 'system-ui', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
        display: ['Montserrat', 'Rubik', 'sans-serif']
      }
    },
  },
  plugins: [],
}
