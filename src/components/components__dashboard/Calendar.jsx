import React, {useState, useEffect} from 'react'
import Appointments__Calendar from './Appointments__Calendar'
import Appointments__Calendar__Edit from './Appointments__Calendar__Edit'

export default function Reports() {
  const [openCalendar, setOpenCalendar] = useState(false)
  return (
    <div className='bg-white grid place-items-center px-5 md:mx-10 md:rounded-xl md:shadow-md h-fit'>
        <p className='text-3xl place-self-center mt-5'> Calendar </p>
        <div className='flex flex-col items-center mb-5 w-full mt-5'>
          <div onClick={() => setOpenCalendar(true)} className='px-5 py-2 m-1 mb-5 xs:px-10 bg-button-dblue hover:bg-gray-700 bottom-0 z-10 absolute md:static text-white rounded-full transition-all md:self-start hover:cursor-pointer'>
            Edit Calendar
          </div>
        <div className='w-full flex flex-col items-center'>
          <Appointments__Calendar props={openCalendar}/>
        </div>
      </div>
        <Appointments__Calendar__Edit open={openCalendar} onClose={() => setOpenCalendar(false)}/>
    </div>
  )
}
