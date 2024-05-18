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
          200: '#f8faff',
          300: '#edeff5',
          400: '#d7dbe7',
          500: '#a1a7bb',
          600: '#6d758f',
          700: '#353e5c',
          800: '#19213d',
        },
        moonBlack: '#ff2d46',
        moonPeach: '#2388ff',
        moonBrown: '#ffc700',
        moonGreen: '#63de77',
      },
    },
  },
  plugins: [],
};
