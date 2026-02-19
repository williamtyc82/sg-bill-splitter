/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#258cf4",
        "background-light": "#f5f7f8",
        "background-dark": "#0f1115",
        "glass-dark": "rgba(25, 29, 36, 0.6)",
        "glass-border": "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "full": "9999px"
      },
      boxShadow: {
        'neon': '0 0 15px rgba(37, 140, 244, 0.5), 0 0 5px rgba(37, 140, 244, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
        '3d': '0 4px 0px 0px rgba(30, 58, 138, 0.5)',
        '3d-active': '0 1px 0px 0px rgba(30, 58, 138, 0.5)',
      },
      keyframes: {
        pulseBorder: {
          '0%, 100%': { borderColor: 'rgba(37, 140, 244, 0.4)', boxShadow: '0 0 0px rgba(37, 140, 244, 0)' },
          '50%': { borderColor: 'rgba(37, 140, 244, 1)', boxShadow: '0 0 15px rgba(37, 140, 244, 0.4)' },
        }
      },
      animation: {
        'pulse-neon': 'pulseBorder 2s infinite',
      }
    },
  },
  plugins: [],
}
