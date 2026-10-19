/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F5F1E8',
          light: '#FAF7F0',
          dark: '#EBE5D8',
        },
        ink: {
          DEFAULT: '#22231F',
          soft: '#3A3B35',
        },
        'muted-text': '#77766D',
        olive: {
          DEFAULT: '#777D5A',
          light: '#8E946E',
          dark: '#5E6344',
        },
        chartreuse: {
          DEFAULT: '#D8F36A',
          hover: '#C8E653',
        },
        'paper-border': '#DAD5C9',
        'muted-rose': '#C9A6A0',
        ginger: '#C98555',
        'dusty-pink': '#D7B8B0',
        cream: {
          50: '#FDFCF7',
          100: '#FAF7F0',
          200: '#F5EFEB',
          300: '#EDE4DC',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        serif: ['Syne', '"Instrument Serif"', 'Georgia', 'serif'],
        display: ['Syne', '"Space Grotesk"', 'sans-serif'],
        heading: ['Syne', 'sans-serif'],
        editorial: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"Space Grotesk"', 'monospace'],
        handwriting: ['"Caveat"', 'cursive'],
        book: ['Newsreader', '"Instrument Serif"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(216, 180, 254, 0.18), 0 4px 10px -2px rgba(251, 207, 232, 0.12)',
        'hover': '0 20px 40px -8px rgba(192, 132, 252, 0.22), 0 8px 18px -4px rgba(244, 114, 182, 0.15)',
        'glass': '0 8px 32px 0 rgba(192, 132, 252, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.9)',
        'polaroid': '0 14px 28px rgba(0,0,0,0.06), 0 10px 10px rgba(0,0,0,0.04)',
        'glow-pink': '0 0 25px rgba(244, 114, 182, 0.35)',
        'glow-amber': '0 0 25px rgba(251, 191, 36, 0.35)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}

