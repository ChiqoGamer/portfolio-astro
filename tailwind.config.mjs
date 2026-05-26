/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#00fe9b',
        'primary-dark': '#014b2f85',
        'bg-dark': '#1d1c22',
        'bg-secondary': '#373541',
        'accent-blue': '#5667ff',
      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
      },
      keyframes: {
        girarBorde: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        showRight: {
          '100%': { width: '0' },
        },
      },
      animation: {
        'girar-borde': 'girarBorde 19s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease forwards',
      },
    },
  },
  plugins: [],
};
