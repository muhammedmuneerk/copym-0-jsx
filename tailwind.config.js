/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00FF7F',
          dark: '#00CC66',
        },
        background: {
          DEFAULT: '#0A0A0A',
          lighter: '#1A1A1A',
          paper: '#121212',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A0A0A0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'pulse-glow': 'pulse-glow 1.5s ease-in-out infinite',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'pulse-glow': {
           '0%, 100%': {
             transform: 'scale(1)',
             'box-shadow': '0 0 10px #00FF7F, 0 0 20px #00FF7F',
           },
           '50%': {
             transform: 'scale(1.05)',
             'box-shadow': '0 0 20px #00FF7F, 0 0 40px #00FF7F',
           }
          }
      }
    },
  },
  plugins: [],
  important: true,
}