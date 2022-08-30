import React from 'react';
import {Link} from 'react-router-dom';

export default function HomePage ()  {
    return (
            <div className="text-center font-poppins xxs:bg-center bg-npoc--landing__page bg-cover bg-no-repeat w-full grid min-h-screen">
                <nav className="grid place-items-center">
                    <div className="text-white flex items-center mb-auto pt-5">
                        <img className="w-10" src="./images/logo.png" alt="" />
                        <p className="text-3xl">NPOC</p>
                    </div>
                </nav>
                
                <div className="flex flex-col items-center my-auto">
                    <h1 className="text-2xl font-gilmer xs:text-4xl lg:text-5xl xl:text-7xl text-white w-4/5">
                        MORE THAN MEETS THE EYE
                    </h1>
                    <div className="text-white text-xs xs:text-lg">
                        Need an appointment?
                    </div>
                    <Link to='/signup'>
                        <button className="text-sm my-5 px-10 py-3 text-white md:text-md lg:text-md rounded-lg bg-button-dblue hover: hover:opacity-80">
                            BOOK NOW
                        </button>
                    </Link>
                </div>

                <footer className="text-white pb-1 mt-auto px-5 grid xs:text-lg md:grid-cols-3 md:gap-4">
                        <div className="md:text-left p-1">
                            <b>NOLASCO-PEREZ OPTICAL CLINIC</b><br/>
                            R2RP+JFQ San Jose del Monte Bulacan
                        </div>
                        <div className="my-auto">
                            CONNECT WITH US:
                            <div className="flex items-center justify-center m-2">
                                <div className="w-10 flex justify-center hover:cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                                        <path id="facebook" d="M30,15A15,15,0,1,0,15,30c.088,0,.176,0,.264,0V18.32H12.041V14.564h3.223V11.8c0-3.205,1.957-4.95,4.816-4.95A26.528,26.528,0,0,1,22.969,7v3.35H21c-1.555,0-1.857.739-1.857,1.824v2.392H22.86l-.485,3.756H19.14v11.1A15.008,15.008,0,0,0,30,15Zm0,0" fill="#fff"/>
                                    </svg>
                                </div>
                                <div className="w-10 flex justify-center hover:cursor-pointer">
                                    <svg id="Group_39730" data-name="Group 39730" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                                                <path id="Path_76562" data-name="Path 76562" d="M212.742,209.871A2.871,2.871,0,1,1,209.871,207,2.871,2.871,0,0,1,212.742,209.871Zm0,0" transform="translate(-194.871 -194.871)" fill="#fff"/>
                                                <path id="Path_76563" data-name="Path 76563" d="M149.261,137.47a2.852,2.852,0,0,0-1.635-1.635,4.766,4.766,0,0,0-1.6-.3c-.908-.041-1.181-.05-3.481-.05s-2.572.009-3.481.05a4.769,4.769,0,0,0-1.6.3,2.854,2.854,0,0,0-1.635,1.635,4.768,4.768,0,0,0-.3,1.6c-.041.908-.05,1.181-.05,3.481s.009,2.572.05,3.481a4.766,4.766,0,0,0,.3,1.6,2.852,2.852,0,0,0,1.635,1.635,4.76,4.76,0,0,0,1.6.3c.908.041,1.18.05,3.48.05s2.573-.009,3.481-.05a4.76,4.76,0,0,0,1.6-.3,2.852,2.852,0,0,0,1.635-1.635,4.77,4.77,0,0,0,.3-1.6c.041-.908.05-1.181.05-3.481s-.009-2.572-.05-3.481A4.759,4.759,0,0,0,149.261,137.47Zm-6.714,9.5a4.423,4.423,0,1,1,4.423-4.423A4.423,4.423,0,0,1,142.546,146.973Zm4.6-7.987a1.034,1.034,0,1,1,1.034-1.034A1.034,1.034,0,0,1,147.144,138.986Zm0,0" transform="translate(-127.546 -127.55)" fill="#fff"/>
                                                <path id="Instagram_" data-name="Instagram " d="M15,0A15,15,0,1,0,30,15,15,15,0,0,0,15,0Zm8.561,18.551a6.319,6.319,0,0,1-.4,2.091,4.4,4.4,0,0,1-2.519,2.519,6.324,6.324,0,0,1-2.091.4c-.919.042-1.212.052-3.551.052s-2.633-.01-3.551-.052a6.324,6.324,0,0,1-2.091-.4,4.4,4.4,0,0,1-2.519-2.519,6.318,6.318,0,0,1-.4-2.091C6.4,17.633,6.387,17.339,6.387,15s.01-2.633.052-3.551a6.32,6.32,0,0,1,.4-2.091A4.407,4.407,0,0,1,9.358,6.839a6.325,6.325,0,0,1,2.091-.4c.919-.042,1.212-.052,3.551-.052s2.633.01,3.551.052a6.327,6.327,0,0,1,2.091.4,4.405,4.405,0,0,1,2.519,2.519,6.319,6.319,0,0,1,.4,2.091c.042.919.052,1.212.052,3.551S23.6,17.633,23.561,18.551Zm0,0" fill="#fff"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="my-auto md:text-right">
                            Own this site? click <Link to="/adminlogin" className="text-link" href="">here</Link>
                        </div>
                </footer>
            </div>
    );
}