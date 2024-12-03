import type { Config } from 'tailwindcss';

export default {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        teal: '#175761',
        green: '#51807F',
        gray: '#808793',
        orange: '#E47E4A',
        'mid-night-blue': '#1C2730',
      },
    },
  },
  plugins: [],
} satisfies Config;
