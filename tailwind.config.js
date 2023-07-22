/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-orange': 'hsl(26, 100%, 55%)',
        'primary-pale-orange': 'hsl(25, 100%, 94%)',
        'neutral-very-dark-blue': 'hsl(220, 13%, 13%)',
        'neutral-dark-grayish-blue': 'hsl(219, 9%, 45%)',
        'neutral-grayish-blue': 'hsl(220, 14%, 75%)',
        'neutral-light-grayish-blue': 'hsl(223, 64%, 98%)',
        'white': 'hsl(0, 0%, 100%)',
        'black': 'hsl(0, 0%, 0%)',
        'light-mode-bg': 'hsl(0, 0%, 98%)',
      },
      fontSize: {
        '900': 'clamp(5rem, 8vw + 1rem, 9.375rem)',
        '800': '3.5rem',
        '700': '2.5rem',
        '600': '2rem',
        '500': '1.5rem',
        '400': '1rem',
        '300': '0.9375rem',
        '200': '0.85rem',
        '100': '0.8rem',
        'default': '1.125rem',
      },
      boxShadow: {
        'light': '0 2px 5px hsl(220,13%,13%,0.1)',
      },
      maxWidth: {
        '250': '250px',
      },
      minWidth: {
        '250': '250px',
      },
    },
  },
  plugins: [],
}