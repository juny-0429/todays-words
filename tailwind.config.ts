import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#E3D9C6',
        teal: '#175761',
        green: '#51807F',
        gray: '#F1F1F1',
        'deep-gray': '#8F8F8F',
        'light-black': '#474444',
        orange: '#F1A066',
        beige: '#FFF0DF',
        'light-brown': '#B49D82',
        'mid-night-blue': '#1C2730',
      },
    },
  },
  plugins: [],
} satisfies Config;
