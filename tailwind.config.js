/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx}",

    // Path to Tremor module
    "./node_modules/@tremor/**/*.{js,ts,jsx}",
  ],  
  theme: {
    extend: {
       fontFamily : { 
          poppins : "Poppins"
       },
       
     },
   },
  plugins: [require('@headlessui/tailwindcss'), require('@tailwindcss/forms')],
}



