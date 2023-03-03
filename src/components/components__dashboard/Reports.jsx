import React from 'react'

export default function Reports() {
  return (
    <div className='bg-white grid place-items-center px-5 md:mx-10 md:rounded-xl md:shadow-md h-fit'>
        <div className='grid gap-2 grid-cols-2 place-items-center w-full py-5'>
          <div className='shadow-inner border-2 bg-bg-dashboard rounded-lg p-10'>
            <label>Finance</label>
            <div>
              Balance
            </div>
            <div>
              Sales Report
            </div>
          </div>
          <div className='shadow-inner border-2 bg-bg-dashboard rounded-lg p-10'>
            <label>Pendings</label>
            <div>
              Unclaimed Frames
            </div>
          </div>
          <div className='bg-bg-dashboard px-20 py-5 flex flex-col items-center rounded-lg shadow-inner'>
            <p className=''>Appointments</p>
            <p className='text-5xl text-button-lblue'>19</p>
          </div>
          <div className='bg-bg-dashboard px-20 py-5 flex flex-col items-center rounded-lg shadow-inner'>
            <p className=''>New Patients</p>
            <p className='text-5xl text-button-lblue'>34</p>
          </div>
          <div className='bg-bg-dashboard col-span-2 px-20 py-5 flex flex-col items-center rounded-lg shadow-inner'>
            <p className=''>Cancelled Appointments</p>
            <p className='text-5xl text-button-lblue'>03</p>
          </div>
          <div className='bg-bg-dashboard col-span-2 px-20 py-5 flex flex-col items-center rounded-lg shadow-inner'>
            <p className=''>Cancelled Appointments</p>
            <p className='text-5xl text-button-lblue'>03</p>
          </div>
          <div className='bg-bg-dashboard col-span-2 px-20 py-5 flex flex-col items-center rounded-lg shadow-inner'>
            <p className=''>Cancelled Appointments</p>
            <p className='text-5xl text-button-lblue'>03</p>
          </div>
        </div>
    </div>
  )
}
