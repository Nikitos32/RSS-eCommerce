/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        Garamond: [
          '"EB Garamond"',
          'serif',
        ],
        Inter: ['Inter', 'sans-serif'],
      },
      colors: {
        moonNeutral: {
          100: '#ffffff',
          200: '#F7F6F5',
          300: '#E5E5E5',
          400: '#CAC9CF',
          500: '#A6A6A8',
          600: '#807F86',
          700: '#595667',
          800: '#3A3845',
        },
        moonBlack: '#3A3845',
        moonPeach: '#F7CCAC',
        moonBrown: '#C69B7B',
        moonGreen: '#826F66',
      },
    },
  },
  plugins: [],
};
