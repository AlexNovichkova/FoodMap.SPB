import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1900px',
    },
    fontFamily: {
      rubik: '"Rubik", sans-serif',
      caveat: '"Caveat", sans-serif',
    },
    keyframes: {
      textMoving: {
        '0%': { transform: 'translateX(0px)' },
        '50%': { transform: 'translateX(30px)' },
        '100%': { transform: 'translateX(27px)' },
      },
      textReturning: {
        '0%': { transform: 'translateX(27px)' },
        '50%': { transform: 'translateX(-3px)' },
        '100%': { transform: 'translateX(0px)' },
      },
      arrowMoving: {
        '0%': { transform: 'translateX(0px) scale(1.05)' },
        '50%': { transform: 'translateX(5px) scale(1.05)' },
        '100%': { transform: 'translateX(0px) scale(1.05)' },
      },
    },
    animation: {
      textForwards: 'textMoving 0.3s linear normal forwards',
      textBackwards: 'textReturning 0.3s linear forwards',
      arrowForwards: 'arrowMoving 0.5s linear infinite',
      none: 'none;',
    },
    colors: {
      orange: {
        400: 'rgb(255, 178, 56)',
      },
      green: {
        400: 'rgb(153, 206, 101)',
        600: 'rgb(27, 117, 71)',
      },
      transparent: 'rgba(0,0,0,0)',
      white: 'rgb(255, 255, 255)',
      black: {
        900: 'rgb(0, 0, 0)',
        700: 'rgb(33, 33, 33)',
        600: 'rgb(66, 66, 66)',
        500: 'rgb(80, 79, 79)',
        200: 'rgb(229,228,226)',
      },
      accent_green: 'rgb(37, 158, 98)',
      accent_orange: 'rgb(248, 130, 64)',
    },
    extend: {
      boxShadow: {
        'accent-orange':
          '0px 5px 10px 0px rgba(248, 130, 64, 0.29),0px 20px 40px 0px rgba(248, 130, 64, 0.29)',
        'orange-400': '0px 5px 20px 0px rgba(255, 178, 56, 0.24)',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/line-clamp')],
};
