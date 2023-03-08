/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        '4xl': '10rem'
      },
      colors: {
        'link': '#A8DADC',
        'button-dblue': '#1D3557',
        'button-lblue': '#60829B',
        'bg-dashboard': '#F3F3F3',
        'footer': '#DBDBDB',
        'morning': '#F8FE5E',
        'afternoon': '#FF8000'
      },
      backgroundImage: {
        'npoc--landing__page': "url('/images/landing page.jpg')",
        'npoc--appointment__page': "url('/images/pexels-ksenia-chernaya-5752254.png')",
        'npoc--thankyou__page': "url('/images/thank you.jpg')",
        'dashboard--search__svg': "url('/svg/search-svgrepo-com.svg')",
        'signup--image': "url('/images/139472517_220155239842825_6914890826448897223_n.jpg')",
        'login--image': "url('/images/116839142_906231729862518_2139663056183987943_n.jpg')",
        'emailverification': "url('/images/229332455_188066033341715_4624224522904347246_n.jpg')",
        'eye--exam': "url('/images/eye exam.jpg')",
        'new--frame': "url('/images/new frame.jpg')",
        'available--slots': "url('/images/pexels-nataliya-vaitkevich-5842835.jpg')",
        'forgot--password': "url('/images/145968518_463031511397312_2518398407531758990_n.jpg')"
      },
      fontSize: {
        'xxs': '.60rem'
      },
    },
    fontFamily: {
      'gilmer': '"gilmer", Arial, sans-serif',
      'poppins': '"poppins", Arial, sans-serif',
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
