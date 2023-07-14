import axios from 'axios';
import React, {useState} from 'react'

export default function Main__Reports({open, onClose, props}) {
    if(!open) return null

    const [pay, setPay] = useState(0)
    //const [amount, setAmount] = useState(props.amount)

    const getDate = (date) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
        var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var myDate = new Date(date)
        return monthNames[myDate.getMonth()] + " " + myDate.getDate() + ", " + myDate.getFullYear() + " (" + daysOfWeek[myDate.getDay()] + ")";
      }

    const isEmpty = () => {
        if (pay==0) {
            alert("Please enter an amount greater than 0!")
        } else if (pay>props.balance) {
            alert("The amount you entered was greater than the balance!")
        } else {
            updatePayment((parseInt(props.payment)+parseInt(pay)),(parseInt(props.balance)-parseInt(pay)))
        }
    }

    const updatePayment = (pmt,bln) => {
        axios.post('http://localhost:5174/updatepayment', {
         p: pmt,
         b: bln,
         id: props.tID
        }).then(()=>{
            alert("paid successfully!")
            onClose()
        })
    }

  return (
    <div className='bg-black/70 text-button-dblue fixed grid place-items-center w-full h-full z-20 top-0 left-0 text-lg'>
        <div className='w-1/2 h-4/5 grid grid-cols-2 place-items-center rounded-lg border-2 text-button-dblue shadow-lg px-10 py-5 bg-white'>
            <div className='w-full text-2xl'>{props.name}</div>
            <div className='w-full text-2xl text-right'>{props.phone}</div>
            <div className='w-full text-gray-300'>
                Date of Appointment:
                <div className='text-button-dblue'>
                    {getDate(props.createdAt)}
                </div>
            </div>
            <div className='col-span-2 flex gap-10'>
                <div className='col-span-2 text-gray-300'>
                    Price:
                    <div className='text-button-dblue'>
                        {props.amount}
                    </div>
                </div>
                <div className='col-span-2 text-gray-300'>
                    Payment:
                    <div className='text-button-dblue'>
                        {props.payment}
                    </div>
                </div>
                <div className='col-span-2 text-gray-300'>
                    Balance:
                    <div className='text-button-dblue'>
                        {props.balance}
                    </div>
                </div>
            </div>
            <div className='col-span-2 flex item-center gap-2'>
                Pay:
                <input className='border-2' type="number" onChange={(event) => (
                      event.target.value == ''? setPay(0) : setPay(event.target.value)
                    )}/>
            </div>
            
            <div className='text-white col-span-2 w-full gap-2 flex justify-center'>
                <button
                    onClick={onClose}
                    className='w-1/4 rounded-full bg-gray-700'
                >
                    Cancel
                </button>
                <button className='w-1/4 rounded-full bg-button-dblue' onClick={isEmpty}>
                    Save
                </button>
            </div>
        </div>
    </div>
  )
}
