/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        // S2S Brand Colors
        gold: {
          50: '#fdf8f3',
          100: '#f9f0e6',
          200: '#f3e1d1',
          300: '#e8c8a8',
          400: '#d9a97a',
          500: '#C49A6C', // Deep Gold - sovereignty, value, prosperity
          600: '#b08a5a',
          700: '#8f6f47',
          800: '#775a3d',
          900: '#624b33',
        },
        navy: {
          50: '#f4f5f7',
          100: '#e8e9ed',
          200: '#d1d4dc',
          300: '#a9aec0',
          400: '#7a8199',
          500: '#1C1F3B', // Midnight Navy - trust, structure, grounded presence
          600: '#1a1c35',
          700: '#16172c',
          800: '#121421',
          900: '#0f111a',
        },
        cream: {
          50: '#fdfcfb',
          100: '#faf8f5',
          200: '#f4f1e8', // Cream White - clarity, accessibility, balance
          300: '#e8e0d0',
          400: '#d4c7b0',
          500: '#c0ad8c',
          600: '#a8956f',
          700: '#8a7a5a',
          800: '#6f6248',
          900: '#5a503b',
        },
        emerald: {
          50: '#f2f7f4',
          100: '#e6f0e9',
          200: '#cce1d3',
          300: '#a3c9b0',
          400: '#6ba87e',
          500: '#3E7A5E', // Emerald Green - growth, parallel economy, regenerative systems
          600: '#366653',
          700: '#2d5444',
          800: '#254437',
          900: '#1e392d',
        },
        // Legacy colors for compatibility
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
