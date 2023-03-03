import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Nav from './Nav'

export default function ThankYou() {
  return (
    <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className='text-white font-poppins bg-npoc--thankyou__page bg-cover bg-center flex flex-col w-full h-full'>
        <Nav className='text-white self-center lg:self-start fixed' text='hidden lg:flex'/>
        {/* <nav className="grid font-poppins hover:cursor-pointer fixed">
            <div className="text-white flex items-center p-5">
                <Link to="/" className='flex items-center'>
                    <img className="w-10" src="./images/logo.png" alt="" />
                    <p className="text-3xl">NPOC</p>
                </Link>
            </div>
        </nav> */}
        <div className="text-center w-full min-h-screen bg-gray-900/40 flex flex-col">
            <div className="flex flex-col items-center my-auto">
                <h1 className="text-2xl font-gilmer xs:text-4xl lg:text-5xl xl:text-7xl text-white w-4/5">
                    Thanks for booking!
                </h1>
                <div className="text-white text-xs xs:text-lg">
                    You booked an appointment in November 2022 at 11am
                </div>
                <div className='my-5 text-white'>
                    Go to my <Link to='/sched' className='text-link'> appointments </Link>
                </div>
            </div>
        </div>
    </motion.div>
  )
}
