/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{ejs,html}", "./app.js"], // Ensure it scans EJS and HTML files
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'], // Define the key as 'nunito'
      },
    },
  },
  plugins: [],
}
