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
   }
    },
  },
  plugins: [],
}

