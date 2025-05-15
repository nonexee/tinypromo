/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#4F46E5', light: '#6366F1', dark: '#4338CA' }, // indigo
        accent: { DEFAULT: '#F59E0B', light: '#FBBF24', dark: '#D97706' }, // amber
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,.06)',
        'card-hover': '0 6px 18px rgba(0,0,0,.12)',
      },
    },
  },
  plugins: [],
};
