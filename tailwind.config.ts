import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 2s ease-in-out',
      },
      colors: {
        background: '#E3D9C6',
        teal: '#175761',
        'light-green': '#96AFA6',
        green: '#51807F',
        gray: '#F1F1F1',
        'deep-gray': '#8F8F8F',
        'light-black': '#474444',
        orange: '#F1A066',
        'deep-ember': '#E06D5D',
        beige: '#FFF0DF',
        'deep-beige': '#C9BEAC',
        'light-brown': '#B49D82',
        'mid-night-blue': '#1C2730',
        'gradient-1': '#E7D2CB',
        'gradient-2': '#B0D4CA',
      },
    },
  },
  plugins: [],
} satisfies Config;
