import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '400px',
        sm: '401px',
        '3xl': '1920px',
      },
      colors: {
        primary: '#111827',
        primaryBlack: '#0a101c',
        secondary: '#3fc0ac',
        secondaryLight: '#a6fef1',
        // secondary: '#ec1044',
      },

      maxWidth: {
        max_width: '1920px',
      },
      aspectRatio: {
        '2/3': '2 / 3',
        '3/3': '3 / 3',
      },
    },
  },
  plugins: [require('@vidstack/react/tailwind.cjs'), 'prettier-plugin-tailwindcss'],
};
export default config;
