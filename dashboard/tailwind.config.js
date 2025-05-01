/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#39FF14',
        'term-bg':     '#000000',
        'term-panel':  '#0A0A0A',
      },
      fontFamily: {
        mono: ['"Press Start 2P"', 'monospace'],
      }
    }
  },
  plugins: []
}
