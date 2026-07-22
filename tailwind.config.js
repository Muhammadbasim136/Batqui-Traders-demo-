// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FAF8F4',
          surface: '#FFFFFF',
          text: '#1C1B19',
          muted: '#6B6459',
          gold: '#B8935A',
          'gold-dark': '#8F6E3F',
          cta: '#2F4A3E',
        }
      },
      fontFamily: {
        heading: ['Fraunces', 'Playfair Display', 'serif'],
        body: ['Inter', 'Manrope', 'sans-serif'],
      },
      borderRadius: {
        'card': '20px',
        'button': '999px',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-soft': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}