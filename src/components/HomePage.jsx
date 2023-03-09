import React from 'react';
import Nav from './Nav';
import {Link} from 'react-router-dom';
import { motion } from 'framer-motion'

export default function HomePage ()  {
    return (
            <motion.div className="text-center text-white font-poppins w-full h-full grid place-items-center items-center"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}>
                <Nav className='text-white fixed justify-center w-full self-center top-0' childClassName='justify-center' text='lg:flex' logo='lg:flex'/>
                
                <div className="bg-center bg-npoc--landing__page bg-cover bg-no-repeat h-screen w-full shadow-2xl">
                    <div className='flex flex-col justify-center items-center bg-gray-900/40 h-screen w-full'>
                        <h1 className="text-2xl font-gilmer xs:text-4xl lg:text-5xl xl:text-7xl text-white w-4/5">
                            MORE THAN MEETS THE EYE
                        </h1>
                        <div className="text-white text-xs xs:text-lg">
                            Need an appointment?
                        </div>
                        <Link to='/signup'>
                            <button className="text-sm my-5 px-10 py-3 text-white md:text-md lg:text-md rounded-lg bg-button-dblue hover hover:opacity-80">
                                BOOK NOW
                            </button>
                        </Link>
                    </div>
                </div>

                <div className='text-white font-gilmer flex flex-col md:flex-row md:justify-center md:items-center h-screen w-full items-center mt-20 md:rounded-tl-4xl md:rounded-br-4xl shadow-2xl'>
                    <Link to='/signup' className='md:w-1/2 grid place-items-center w-full h-full xxs:bg-center bg-eye--exam bg-cover bg-no-repeat text-5xl hover:cursor-pointer md:rounded-tl-4xl'>
                        <div className='bg-gray-900/40 hover:bg-gray-500/40 transition duration-150 ease-out w-full h-full grid place-items-center md:rounded-tl-4xl'>
                            NEED AN EYE EXAM?
                        </div>
                    </Link>
                    <Link to='/signup' className='md:w-1/2 grid place-items-center w-full h-full xxs:bg-center bg-new--frame bg-cover bg-no-repeat text-5xl hover:cursor-pointer md:rounded-br-4xl'>
                        <div className='bg-gray-900/40 hover:bg-gray-500/40 transition duration-150 ease-out w-full h-full grid place-items-center md:rounded-br-4xl'>
                            NEED A NEW FRAME?
                        </div>
                    </Link>
                </div>

                <div className='text-black flex flex-col items-center w-full lg:w-4/5 mt-40 lg:mt-60'>
                    <h1 className='text-4xl mb-10'>About Us</h1>
                    <div className='md:flex w-full'>
                        <p className='md:w-1/2 text-xl md:h-screen flex flex-col justify-center items-center px-10'>
                            <h1 className='font-gilmer text-2xl'>
                                Welcome to Nolasco-Perez Optical Clinic
                            </h1><br />
                            Where fashion and function meet. We specialize in eyewear that enhances your vision and elevates your personal style. <br /><br />
                            Whether you're in need of new prescription glasses or just looking for the perfect pair of sunglasses, we have something for everyone. 
                        </p>
                        <div className='md:w-1/2 md:h-screen mb-40 grid place-items-center'>
                            <img className='w-full md:h-4/5 object-cover md:rounded-3xl shadow-2xl' src="./images/pexels-antoni-shkraba-6749792.jpg" alt="" />
                        </div>
                    </div>
                    <div className='md:flex w-full'>
                        <p className='md:order-2 md:w-1/2 md:h-screen md:mb-0 mb-10 text-xl flex flex-col justify-center items-center px-10'>
                            <h1 className='font-gilmer text-2xl'>
                                With wide selection of frames
                            </h1><br />
                            From the latest designer collections to timeless classics, we're confident you'll find the perfect pair to suit your needs and taste. <br /><br />
                            Our experienced optometrist is here to help you find the perfect fit and ensure your complete satisfaction.
                        </p>
                        <div className='md:w-1/2 md:flex-1 md:h-screen mb-20 grid place-items-center'>
                            <img className='w-full md:h-4/5 object-cover md:rounded-3xl shadow-2xl' src="./images/243800926_862706367969244_1424878907909737901_n.png" alt="" />
                        </div>
                    </div>
                    <div className='my-10 text-xl flex flex-col items-center gap-5 w-full'>
                        <div className='md:w-1/2'>
                            <img className='w-full h-4/5 object-cover md:rounded-3xl shadow-2xl' src="./images/meet-doctor.jpg" alt="" />
                        </div>
                        <h1 className='font-gilmer text-2xl'> Dr. Celna N. Perez </h1>
                        <p className=''> Together with her husband/manager Elcris Perez, they have been in the industry for almost a decade. Since then, they just only work for different people but they have already worked with various companies and schools.</p>
                    </div>
                </div>

                <div className='grid place-items-center w-4/5 h-screen'>
                    <iframe
                        className='w-full h-4/5 border-2 shadow-xl rounded-lg transition-all'
                        src="https://maps.google.com/maps?q=nolasco%20-%20perez%20optical&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    />
                </div>

                <footer className="text-white bg-button-dblue py-3 mt-auto px-5 grid xs:text-lg md:grid-cols-3 md:gap-4 w-full">
                        <div className="md:text-left flex flex-col md:flex-row md:justify-start justify-center gap-3">
                            <div className='cursor-pointer flex justify-center items-center'>
                                <a href="https://goo.gl/maps/5aUSvWfavaoGqyMt8" target='_blank'>
                                <ion-icon name="navigate-outline"></ion-icon>
                                </a>
                            </div>
                            <div className='flex flex-col justify-center'>
                                <b>NOLASCO-PEREZ OPTICAL CLINIC</b>
                                <p>R2RP+JFQ San Jose del Monte Bulacan</p>
                            </div>
                        </div>
                        <div className="my-auto">
                            CONNECT WITH US:
                            <div className="flex items-center justify-center gap-2 m-2">
                                <div className="text-4xl flex justify-center hover:cursor-pointer">
                                    <a href="https://www.facebook.com/nolascoperezop" target='_blank'>
                                        <ion-icon name="logo-facebook"></ion-icon>
                                    </a>    
                                </div>
                                <div className="text-4xl flex justify-center hover:cursor-pointer">
                                    <a href="https://www.instagram.com/nolascoperezop/" target='_blank'>
                                        <ion-icon name="logo-instagram"></ion-icon>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="my-auto md:text-right">
                            Own this site? click <Link to="/dashboard" className="text-link" href="">here</Link>
                        </div>
                </footer>
            </motion.div>
    );
}