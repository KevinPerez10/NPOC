import React from 'react'
import {Link} from 'react-router-dom';
import Nav from './Nav';

export default function Slots() {
  return (
    <div>
        <Nav />
        <div className='h-screen'>
                <div className='h-full w-full flex flex-col justify-center items-center'>
                    <div className='px-5 mb-5'>
                        <h1 className=""> Book Appointment  </h1>
                        <h4 className=""> Available slots:  </h4>
                    </div>
                    <div className='min-h-fit w-5/6 grid lg:grid-cols-2 gap-8 shadow-2xl rounded-2xl p-20 mx-5'>
                        <div className='grid gap-4 xs:grid-cols-3'>
                            <p className='xs:col-span-3'>November 17</p>
                            <label className='flex justify-center items-center border-2 cursor:pointer rounded-xl h-10 w-full'>11 AM</label>
                            <label className='flex justify-center items-center border-2 cursor:pointer rounded-xl h-10 w-full'>1 PM</label>
                            <label className='flex justify-center items-center border-2 cursor:pointer rounded-xl h-10 w-full'>3 PM</label>
                            <label className='flex justify-center items-center border-2 cursor:pointer rounded-xl h-10 w-full'>4 PM</label>
                            <label className='flex justify-center items-center border-2 cursor:pointer rounded-xl h-10 w-full'>6 PM</label>
                        </div>
                        <div className='grid gap-4 xs:grid-cols-3'>
                            <p className='xs:col-span-3'>November 23</p>
                            <label className='flex justify-center items-center border-2 cursor:pointer rounded-xl h-10 w-full'>10 AM</label>
                            <label className='flex justify-center items-center border-2 cursor:pointer rounded-xl h-10 w-full'>11 AM</label>
                        </div>
                        <div className='grid gap-4 xs:grid-cols-3'>
                            <p className='xs:col-span-3'>November 25</p>
                            <label className='flex justify-center items-center border-2 cursor:pointer rounded-xl h-10 w-full'>9 AM</label>
                            <label className='flex justify-center items-center border-2 cursor:pointer rounded-xl h-10 w-full'>10 AM</label>
                            <label className='flex justify-center items-center border-2 cursor:pointer rounded-xl h-10 w-full'>11 AM</label>
                        </div>
                    </div>
                    <div className='flex mt-5'>
                        <Link to="/sched" className='flex justify-center items-center border-black border cursor:pointer rounded-xl w-full px-5 py-1'>Previous</Link>
                        <Link to="/thankyou" className='text-white flex justify-center items-center bg-button-dblue cursor:pointer rounded-xl w-full px-5 py-1'>Next</Link>
                    </div>
                </div>
        </div>
    </div>
  )
}
