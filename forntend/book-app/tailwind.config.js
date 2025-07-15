/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        buttoncolor:"rgba(170, 120, 100, 1)",
        buttoncolor1:" rgba(243, 139, 120, 1)",
        maincolor:"rgba(252, 239, 234, 1)"
      },
   font:{
    samefont:"Inter"
   },
    boxShadow: {
        'custom-green': '0 4px 6px -1px rgba(23, 81, 86, 0.15)', // use rgba for opacity
      },
   keyframes: {
    'fade-in-pulse': {
      '0%': { opacity: '0', transform: 'scale(0.95)' },
      '50%': { opacity: '0.8', transform: 'scale(1.05)' },
      '100%': { opacity: '1', transform: 'scale(1)' },
    },
  },
   animation: {
    'fade-in-pulse': 'fade-in-pulse 2s ease-in-out infinite',
  },
    },
  },
 
  plugins: [],
}

