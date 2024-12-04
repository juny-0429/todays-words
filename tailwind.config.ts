import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#E7D8C2',
        teal: '#175761',
        green: '#51807F',
        gray: '#808793',
        orange: '#E47E4A',
        beige: '#F7EDD9',
        'mid-night-blue': '#1C2730',
      },
    },
  },
  plugins: [],
} satisfies Config;
