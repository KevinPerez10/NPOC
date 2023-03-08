import React, {useState, useEffect} from 'react'
import Axios from 'axios'

export default function Confirmation__Comment({open, onClose, onConfirm, props}) {
    if (!open) return null
    const [reason, setReason] = useState("");

    //Notify the appointment to the user via email
    function notifycancel(){
        Axios.post('https://mysql-npoc.herokuapp.com/emailcancelledappointment', {
            email: props.email,
            name: props.name,
            date: props.date,
            time: props.time,
            reason: reason
            })
    }
  
    return (
        <div className='bg-black/70 fixed w-full h-full z-10 top-0 left-0 grid place-items-center'>
            <div className='bg-white xs:w-1/2 xs:h-1/2 w-4/5 h-1/2 rounded-lg flex flex-col gap-5 items-center justify-center p-2'>
                <div className='font-gilmer md:text-2xl text-center'>
                    Please input the reason for cancellation:
                </div>
                <div className='w-full grid place-items-center'>
                    <textarea className='border-2 w-full' name="" id="" cols="30" rows="4" onChange={(event) => (
                                            setReason(event.target.value)
                                        )}>

                    </textarea>
                </div>
                <div className='flex xs:flex-row flex-col gap-2 text-center'>
                    <div 
                        onClick={() => {
                            onClose()
                            //notifycancel()
                            onConfirm()
                        }}
                        className='text-white bg-button-dblue cursor-pointer rounded-full px-4 py-2 xs:order-2'
                    >
                            Confirm
                    </div>
                    <div onClick={onClose} className='bg-gray-300 cursor-pointer rounded-full px-4 py-2'>
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    )
}
