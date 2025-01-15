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
        'light-black': '#474444',
        orange: '#E47E4A',
        beige: '#F7EDD9',
        'light-brown': '#B49D82',
        'mid-night-blue': '#1C2730',
      },
    },
  },
  plugins: [],
} satisfies Config;
