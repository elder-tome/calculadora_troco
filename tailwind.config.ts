import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {},
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
  variants: {
    scrollbar: ['rounded'],
  },
}
export default config
