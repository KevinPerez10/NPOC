/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'link': '#A8DADC',
        'button-dblue': '#1D3557',
        'button-lblue': '#60829B',
      },
      backgroundImage: {
        'npoc--landing__page': "url('./public/images/landing page.jpg')",
        'npoc--appointment__page': "url('./public/images/pexels-ksenia-chernaya-5752254.jpg')",
        'npoc--thankyou__page': "url('./public/images/thank you.jpg')"
      },
    },
    fontFamily: {
      'gilmer': '"Gilmer", Arial, sans-serif',
      'poppins': '"Poppins", Arial, sans-serif',
    },
    screens: {
      '2xl': '1536px',  //2xl
      'xl': '1200px',		//xl
      'lg': '1024px',		//lg 
      'md': '768px',			//md
      'sm': '640px',			//sm
      'xs': '480px',
      'xxs': '320px'
    },
  },
  plugins: [],
}
