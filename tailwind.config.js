/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#8de492',
          600: '#439755',
          700: '#2a5636',
        },
      },
    },
  },
  plugins: [],
}