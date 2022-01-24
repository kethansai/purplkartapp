module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height:{
        'screen':'92vh'
      }
    },
  },
  plugins: [require('@tailwindcss/forms'),require('@tailwindcss/aspect-ratio'),],
}