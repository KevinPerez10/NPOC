import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import Nav from './Nav';
import { motion } from 'framer-motion'
import Axios from 'axios'

export default function Slots({open, onClose, props}) {
    if (!open) return null

    function timeZone(date){
      const dt = new Date(date);
      dt.setUTCHours(dt.getUTCHours() - 8);
      const singaporeTime = dt.toLocaleString('en-US', { timeZone: 'Asia/Singapore' });
      return singaporeTime;
  }
   
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
      Axios.post('https://mysql-npoc.herokuapp.com/checkappointments').then((response) => {
        response.data.forEach((element) => {
          const buttonId = getCurrentDateTime(timeZone(element.date));
          hideButton(buttonId);
        });
      });
    },[]);
    
    function getCurrentDateTime(dt) {
      if (!dt) {
        return null;
      }
      const now = new Date(dt);
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    
    function hideButton(buttonId) {
      const button = document.getElementById(buttonId);
      if (button) {
        button.style.display = "none";
      }
    }
    
//calendar closing
const [dates, setDates] = useState([]);
useEffect(() => {
  nextDays()
},[]);


  const nextDays = () => {
    const today = new Date();
    const tomorrow = new Date(timeZone(today));
    tomorrow.setDate(today.getDate() + 1);

    const datesArray = [tomorrow];
    for (let i = 0; i < 6; i++) {
      const nextDate = new Date(datesArray[i]);
      nextDate.setDate(datesArray[i].getDate() + 1);
      datesArray.push(nextDate);
    }
    setValue(datesArray);
  }

  async function setValue(date) {
    const promises = [];
    date.map((dt) => {
      promises.push(
        Axios.post('https://mysql-npoc.herokuapp.com/checkavailability', {
          d: formatDate(dt)
        })
      );
    });
    const responses = await Promise.all(promises);
    const newDate = responses.map((response, i) => {
      const dt = date[i];
      const newObject = {
        date: response.data[0] ? response.data[0].date : dt,
        period: response.data[0] ? response.data[0].period : 'open',
      };
      return newObject;
    });
    setDates(newDate);
  }
  

  const getDate = (pardate) => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const myDate = new Date(pardate);
    const date = myDate.getDate();
    const dayOfWeek = myDate.getDay();

    return (
      monthNames[myDate.getMonth()] +
      ' ' +
      date +
      ' (' +
      daysOfWeek[dayOfWeek] +
      ')'
    );
  };

  function thankYouAlert() {
    alert('Thank you for booking!');
  }

function handleTime(time){
  setSelectedTime(time)
}

function handleDate(time){
  const selected = new Date(time);
    const fday1 = selected.getDate();
    const day1 = fday1 < 10 ? '0' + fday1 : fday1;
    const fmonth1 = selected.getMonth() + 1;
    const month1 = fmonth1 < 10 ? '0' + fmonth1 : fmonth1;
    const year1 = selected.getFullYear();

  setSelectedDate(year1 + '-' + month1 + '-' + day1)
}
function formatDate(time){
  const selected = new Date(time);
    const fday1 = selected.getDate();
    const day1 = fday1 < 10 ? '0' + fday1 : fday1;
    const fmonth1 = selected.getMonth() + 1;
    const month1 = fmonth1 < 10 ? '0' + fmonth1 : fmonth1;
    const year1 = selected.getFullYear();

  return (year1 + '-' + month1 + '-' + day1)
}

function recordAppointment(){
  if (selectedTime != null) {
  Axios.post('https://mysql-npoc.herokuapp.com/addappointment', {
    d: selectedDate,
    t: selectedTime,
    u: props
    }).then(()=>{
        thankYouAlert()
        onClose()
    })
  }
  else{
    alert('Please select a schedule date and time.');
  }
  };

  return (
    <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className='fixed h-screen w-full flex flex-col font-poppins text-xl text-white bg-white'>
            <Nav className='self-center lg:self-start fixed' text='hidden lg:text-black lg:flex' logo='hidden lg:flex'/>
            <div className='h-full w-full grid lg:grid-cols-2 overflow-hidden'>
                <div className='min-h-screen w-full flex flex-col gap-5 lg:pt-20 pt-10 items-center justify-between bg-available--slots bg-cover bg-no-repeat lg:bg-none lg:flex'>
                    <div className='text-2xl text-black self-start ml-5'>
                        <h1 className="text-3xl"> Book Appointment: </h1>
                    </div>
                    <div className='h-full p-5 text-white w-5/6 grid gap-8 rounded-2xl bg-gray-900/75 overflow-auto'>
                    {dates.map((val,key) => {
                    return(
                        <div className='grid gap-1 xs:grid-cols-3 place-items-center' onClick={()=>handleDate(val.date)}>
                            <p className='xs:col-span-3 place-self-start'>{getDate(val.date)}</p>
                            
                            {val.period === 'open' && (
                            <>
                            <button id={formatDate(val.date) + ' 10:00:00'} onClick={()=>handleTime("10:00:00")}
                            className='focus:bg-gray-500 flex justify-center items-center border-2 xs:p-0 cursor-pointer hover:bg-gray-500/75 rounded-xl h-10 w-full py-5 px-5'>10AM</button>
                            <button id={formatDate(val.date) + ' 11:00:00'} onClick={()=>handleTime("11:00:00")}
                            className='focus:bg-gray-500 flex justify-center items-center border-2 xs:p-0 cursor-pointer hover:bg-gray-500/75 rounded-xl h-10 w-full py-5 px-5'>11AM</button>
                            <button id={formatDate(val.date) + ' 12:00:00'} onClick={()=>handleTime("12:00:00")}
                            className='focus:bg-gray-500 flex justify-center items-center border-2 xs:p-0 cursor-pointer hover:bg-gray-500/75 rounded-xl h-10 w-full py-5 px-5'>12PM</button>
                            <button id={formatDate(val.date) + ' 13:00:00'} onClick={()=>handleTime("13:00:00")}
                            className='focus:bg-gray-500 flex justify-center items-center border-2 xs:p-0 cursor-pointer hover:bg-gray-500/75 rounded-xl h-10 w-full py-5 px-5'>1PM</button>
                            <button id={formatDate(val.date) + ' 14:00:00'} onClick={()=>handleTime("14:00:00")}
                            className='focus:bg-gray-500 flex justify-center items-center border-2 xs:p-0 cursor-pointer hover:bg-gray-500/75 rounded-xl h-10 w-full py-5 px-5'>2PM</button>
                            <button id={formatDate(val.date) + ' 15:00:00'} onClick={()=>handleTime("15:00:00")}
                            className='focus:bg-gray-500 flex justify-center items-center border-2 xs:p-0 cursor-pointer hover:bg-gray-500/75 rounded-xl h-10 w-full py-5 px-5'>3PM</button>
                            <button id={formatDate(val.date) + ' 16:00:00'} onClick={()=>handleTime("16:00:00")}
                            className='focus:bg-gray-500 flex justify-center items-center border-2 xs:p-0 cursor-pointer hover:bg-gray-500/75 rounded-xl h-10 w-full py-5 px-5'>4PM</button>
                            </>
                            )}
                            {/*closed @ afternoon*/}
                            {val.period === 'afternoon' && (
                            <>
                            <button id={formatDate(val.date) + ' 10:00:00'} onClick={()=>handleTime("10:00:00")}
                            className='focus:bg-gray-500 flex justify-center items-center border-2 xs:p-0 cursor-pointer hover:bg-gray-500/75 rounded-xl h-10 w-full py-5 px-5'>10AM</button>
                            <button id={formatDate(val.date) + ' 11:00:00'} onClick={()=>handleTime("11:00:00")}
                            className='focus:bg-gray-500 flex justify-center items-center border-2 xs:p-0 cursor-pointer hover:bg-gray-500/75 rounded-xl h-10 w-full py-5 px-5'>11AM</button>
                            </>
                            )}
                            {/*closed @ morning*/}
                            {val.period === 'morning' && (
                            <>
                            <button id={formatDate(val.date) + ' 12:00:00'} onClick={()=>handleTime("12:00:00")}
                            className='focus:bg-gray-500 flex justify-center items-center border-2 xs:p-0 cursor-pointer hover:bg-gray-500/75 rounded-xl h-10 w-full py-5 px-5'>12PM</button>
                            <button id={formatDate(val.date) + ' 13:00:00'} onClick={()=>handleTime("13:00:00")}
                            className='focus:bg-gray-500 flex justify-center items-center border-2 xs:p-0 cursor-pointer hover:bg-gray-500/75 rounded-xl h-10 w-full py-5 px-5'>1PM</button>
                            <button id={formatDate(val.date) + ' 14:00:00'} onClick={()=>handleTime("14:00:00")}
                            className='focus:bg-gray-500 flex justify-center items-center border-2 xs:p-0 cursor-pointer hover:bg-gray-500/75 rounded-xl h-10 w-full py-5 px-5'>2PM</button>
                            <button id={formatDate(val.date) + ' 15:00:00'} onClick={()=>handleTime("15:00:00")}
                            className='focus:bg-gray-500 flex justify-center items-center border-2 xs:p-0 cursor-pointer hover:bg-gray-500/75 rounded-xl h-10 w-full py-5 px-5'>3PM</button>
                            <button id={formatDate(val.date) + ' 16:00:00'} onClick={()=>handleTime("16:00:00")}
                            className='focus:bg-gray-500 flex justify-center items-center border-2 xs:p-0 cursor-pointer hover:bg-gray-500/75 rounded-xl h-10 w-full py-5 px-5'>4PM</button>
                            </>
                            )}
                            {/*closed all day*/}
                            {val.period === 'whole' && (
                            <>
                             <p onClick={()=>handleTime()}>Closed</p>
                            </>
                            )}
                        </div>
                         )
                        })}
                    </div>
                    <div className='grid w-full mb-10 px-5 place-items-center text-center xs:grid-cols-2 gap-4'>
                        <button
                            onClick={() => {
                                recordAppointment();
                            }}
                            className='xs:col-start-2 w-full border-none bg-button-dblue hover:bg-gray-700 border-button-dblue hover:border-gray-700 border-4 text-white py-2 px-5 rounded-xl'
                        >
                            Next
                        </button>
                        <div
                            onClick={onClose}
                            className='xs:row-start-1 w-full border-none bg-gray-500 text-white hover:text-red-500 py-2 px-5 rounded-xl'
                        >
                            Previous
                        </div>
                    </div>
                </div>
                <div className='hidden lg:min-w-1/2 lg:inline lg:absolute lg:right-0 lg:inset-y-0 lg:w-1/2'>
                    <img
                        src="./images/pexels-nataliya-vaitkevich-5842835.jpg"
                        alt=""
                        className='object-cover w-full h-full'
                    />
                </div>
            </div>
    </motion.div>
  )
}