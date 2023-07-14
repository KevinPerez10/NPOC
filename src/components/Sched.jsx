import React,{useState, useEffect} from 'react'
import Nav from './Nav'
import {Link, useLocation} from 'react-router-dom'
import LogIn from './LogIn'
import Slots from './Slots'
import Confirmation from './Confirmation'
import Axios from 'axios'
import { motion } from 'framer-motion'
import moment from 'moment';

export default function Sched() {

    const location = useLocation();
    const props = location.state.prop;

    const [confirm, setConfirm] = useState(false)
    const [messageQuery, setMessageQuery] = useState('')

    const [openSlots, setOpenSlots] = useState(false)
    const [isEmpty, setIsEmpty] = useState(0)
    const [selectedID, setSelectedId] = useState()
    const [loginStatus, setLoginStatus] = useState("");
    const [error, setError] = useState("");
    const [appointment, setAppointment] = useState([])
    const [flag, setFlag] = useState(0)

    useEffect(()=>{
        Axios.post("http://localhost:5174/login", {
            email: props.email,
            password: props.password
            }).then((response) => {
            if(response.data===false){

            } else {
                const userData = response.data[0].firstName + " " + response.data[0].lastName;
                setSelectedId(response.data[0].userID);
                //localStorage.setItem('userData', userData);
                setLoginStatus(userData);
             
            }	
        });
    },[])

    function timeZone(date){
        const dt = new Date(date);
        dt.setUTCHours(dt.getUTCHours() - 8);
        const singaporeTime = dt.toLocaleString('en-US', { timeZone: 'Asia/Singapore' });
        return singaporeTime;
    }
    useEffect(() => {
        if(selectedID) { // Add this condition to check if selectedID is defined
            Axios.post('http://localhost:5174/appointment', {
              s: selectedID
            }).then((response) => {
                setIsEmpty(response.data.length)
                setAppointment(response.data);
                // Set the appointment state with the response data
            });
        }
    }, [openSlots, flag, selectedID]);
     
    const Login = details => {
        Axios.post("http://localhost:5174/login", {
            email: details.email,
            password: details.password
        }).then((response) => {
            if(response.data===false){
                setError("Wrong email or password")
                setTimeout(() => setError(''), 5000)
            } else {
                const userData = response.data[0].firstName + " " + response.data[0].lastName;
                setSelectedId(response.data[0].userID);
                //localStorage.setItem('userData', userData);
                setLoginStatus(userData + " " + selectedID);
            }	
        });
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
        const myDate = new Date(timeZone(pardate));
        const date = myDate.getDate();
        const dayOfWeek = myDate.getDay();
    
        return (
          monthNames[myDate.getMonth()] + ' ' + date +
          ', '+ myDate.getFullYear() + ' (' +
          daysOfWeek[dayOfWeek] +
          ')'
        );
      };

      function convertTimeToString(pardate) {
        const time = new Date(timeZone(pardate))
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // convert 0 to 12
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
        
      }

      function deleteRow(id) {
        Axios.post('http://localhost:5174/deleteappointment', {
              s: id
            }).then((reponse)=>{
                setFlag(flag+1)
            })
            
      }

  return (
    <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className='w-full h-full xxs:bg-center bg-npoc--appointment__page bg-cover bg-no-repeat'>
            {(loginStatus != "") ? (
                <div className='flex flex-col h-full md:backdrop-blur-none backdrop-blur-lg'>
                    <Nav className='self-center lg:self-start text-white fixed' text='hidden text-black lg:flex' logo='hidden lg:flex'/>
                    <div className="text-white text-center font-poppins flex flex-col items-center justify-center h-full">
                        <div className='pb-5 w-full h-full font-gilmer text-xl flex flex-col items-center pt-3 bg-gray-900/75 md:rounded-2xl md:w-5/6 md:h-5/6'>
                            My Appointment
                            {appointment.map((val,key) => {
                            return (
                            <div className="cards my-auto grid place-items-center w-full overflow-x-auto overflow-y-auto md:text-lg text-xs">
                                <div className="relative m-5 p-6 h-fit xs:w-fit w-full gap-3 flex flex-col text-left text-white rounded-sm border-none shadow-md bg-gradient-to-b from-button-lblue to-button-dblue hover:rounded-br-3xl hover:rounded-tl-3xl hover:scale-105 transition-all">
                                        <div
                                            onClick={() => {
                                                setMessageQuery('Are you sure you want to cancel this appointment?')
                                                setConfirm(true)
                                            }}
                                            className='absolute flex self-end text-3xl cursor-pointer text-white hover:text-black hover:scale-105 transition-all'
                                        >
                                                <ion-icon name="close-outline"></ion-icon>
                                        </div>
                                        <h5 className="mb-2 flex items-center text-white text-2xl">
                                            <div className='mr-3'>
                                            </div>
                                            Eye Consultation
                                        </h5>
                                        <p className="mb-3 flex items-center">
                                            <div className='mr-3 grid place-items-center'>
                                                <ion-icon name="eye-outline"></ion-icon>
                                            </div>
                                            Dr. Cricelna Perez
                                        </p>
                                        <p className="mb-3 flex items-center">
                                            <div className='mr-3 grid place-items-center'>
                                                <ion-icon name="calendar-outline"></ion-icon>
                                            </div>
                                            {getDate(val.date)}
                                        </p>
                                        <p className="mb-3 flex items-center">
                                            <div className='mr-3 grid place-items-center'>
                                                <ion-icon name="time-outline"></ion-icon> 
                                            </div>
                                            {convertTimeToString(val.date)}
                                        </p>
                                        <p className="mb-3 flex items-center">
                                            <div className='mr-3 grid place-items-center'>
                                                <ion-icon name="navigate-outline"></ion-icon>
                                            </div>
                                            Nolasco - Perez Optical Clinic San Jose del Monte
                                        </p>
                                        <p className="mb-3 flex items-center">
                                            <div className='mr-3 grid place-items-center'>
                                                <ion-icon name="call-outline"></ion-icon>
                                            </div>
                                            +63 922 842 0989
                                        </p>
                                        <p className="mb-3 flex items-center">
                                            <div className='mr-3 grid place-items-center'>
                                                <ion-icon name="mail-outline"></ion-icon>
                                            </div>
                                            nolascoperezop@gmail.com
                                        </p>
                                </div>

                            </div>
                            )})}
                            <div className='flex flex-col lg:flex-row-reverse gap-2 mt-auto justify-center w-1/2'>
                            {isEmpty != 1?(
                                <div
                                    onClick={() => setOpenSlots(true)}
                                    className="min-w-lg mt-auto rounded-full flex items-center justify-center bg-button-dblue px-10 py-3 hover:bg-button-lblue transition-all"
                                >
                                        <p className='cursor-pointer hidden lg:inline'>
                                            Add
                                        </p>
                                        <div className='lg:hidden'>
                                            <ion-icon name="add-circle-outline"></ion-icon>
                                        </div>
                                </div>)
                                :(console.log())
                                }
                                
                                <div className='cursor-pointer mt-auto rounded-full flex items-center justify-center bg-button-dblue px-10 py-3 hover:bg-button-lblue transition-all'
                                    onClick={()=>setLoginStatus("")}
                                >
                                    <div className="cursor-pointer" >
                                        <ion-icon name="log-out-outline"></ion-icon>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Confirmation open={confirm} onClose={() => setConfirm(false)} onConfirm={() => deleteRow(selectedID)} message={messageQuery}/>
                    <Slots props={selectedID} open={openSlots} onClose={() => setOpenSlots(false)}/>
                </div>
            ): (
                <LogIn Login={Login} error={error}/>
                )}
    </motion.div>
  )
}
