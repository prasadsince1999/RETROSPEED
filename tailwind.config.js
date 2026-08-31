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
          bg: 'var(--rs-wallpaper)',
          surface: 'var(--rs-paper)',
          'surface-alt': 'var(--rs-paper-alt)',
          ink: 'var(--rs-ink)',
          coral: 'var(--rs-coral)',
          mustard: 'var(--rs-accent)',
          teal: 'var(--rs-mint)',
          sky: 'var(--rs-sky)',
          lilac: 'var(--rs-lilac)',
          titlebar: 'var(--rs-titlebar)',
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
        'retro': '4px 4px 0px var(--rs-shadow)',
        'retro-sm': '2px 2px 0px var(--rs-shadow)',
        'retro-lg': '6px 6px 0px var(--rs-shadow)',
        'retro-pressed': '1px 1px 0px var(--rs-shadow)',
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
