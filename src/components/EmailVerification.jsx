import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Nav from './Nav'
import { motion } from 'framer-motion'
import axios from 'axios'

export default function EmailVerification({open, onClose, props}) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [counter, setCounter] = useState(30);
  const [countdownFinished, setCountdownFinished] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const prop = props;

const navigate = useNavigate()
  const [code, setCode] = useState('')
  const checkCode = () => {
    axios.post('https://mysql-npoc.herokuapp.com/checkcode', {
     c:code,
     e:props.email
    }).then((response)=>{
        if(response.data == true){
          // alert("You have successfully signed in!")
          setFlag(true)
          setPopup('You have successfully signed in!')
          setTimeout(() => {
            setPopup('')
            signupInfo()
          }, 2000)
        }
        else{
          // alert("Incorrect code! Please input the right code.")
          setFlag(false)
          setPopup('Incorrect code! Please input the right code.')
          setTimeout(() => setPopup(''), 5000)
        }
    })
  }

  const signupInfo = () => {
    axios.post('https://mysql-npoc.herokuapp.com/create', {
     f: props.first,
     l: props.last,
     b: props.birthday,
     p: props.phone,
     ad: props.address,
     em: props.email,
     pa: props.password  
    }).then(()=>{
        navigate('/Sched', { state: { prop } })
    })
     };

     const handleClick = () => {
      if (countdownFinished) {
        setIsDisabled(false);
        setCountdownFinished(false);
        setCounter(30);
      } else if (!isDisabled && counter === 30) { // only start a new countdown if button is not already disabled and the previous countdown has finished
        // clear existing interval before starting a new one
        clearInterval(intervalId);
        setCounter(30);
        handleSubmit();
        const id = setInterval(() => setCounter(c => c - 1), 1000);
        setIntervalId(id);
        setIsDisabled(true); // set the isDisabled state to true after the countdown has started successfully
      } else {
        // do nothing if button is disabled or countdown is already in progress
      }
    };
    
    
    const handleSubmit = () => {
      axios.post("https://mysql-npoc.herokuapp.com/emailverification", {
          first: props.first,
          last: props.last,
          email: props.email 
      }).then((response) => {
        })
        .catch((error) => {
          console.log(error);
        });
    };

    useEffect(() => {
      if (isDisabled && counter > 0) {
        setTimeout(() => setCounter(counter - 1), 1000);
      } else if (counter === 0) {
        setIsDisabled(false);
        setCountdownFinished(true); // update countdownFinished state variable
      }
      
      return () => clearInterval(intervalId);
    }, [isDisabled, counter, intervalId]);

    const [popup, setPopup] = useState('')
    const [flag, setFlag] = useState()

    function isEmpty(){
      if(code==''){
        // Empty field.")
        setFlag(false)
        setPopup('Fill all required fields.')
        setTimeout(() => setPopup(''), 5000)
      }
      else{
        checkCode()
      }
    }

  if (!open) return null
  return (
    <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className='fixed text-white font-poppins bg-emailverification bg-cover bg-center flex flex-col items-center w-full h-screen'
    >
      {flag ? (
        <div
          className={`z-20 bg-green-500 text-white p-3 rounded-lg absolute top-3 left-1/2 transform -translate-x-1/2 transition-all ${popup=='' ? 'hidden' : ''}`}
        >
          {popup}
        </div>
      ) : (
        <div
          className={`z-20 bg-red-500 text-white p-3 rounded-lg absolute top-3 left-1/2 transform -translate-x-1/2 transition-all ${popup=='' ? 'hidden' : ''}`}
        >
          {popup}
        </div>
      )}
            <Nav className='text-white self-center fixed lg:self-start' text='hidden lg:flex'/>
            <div className='flex flex-col text-center justify-center items-center bg-gray-900/40 w-full h-full'>
                <div className='text-button-dblue bg-white lg:w-1/2 lg:shadow-none flex flex-col gap-3 justify-center items-center shadow-lg rounded-3xl mx-5 px-10 py-5'>
                  <div className='font-gilmer text-2xl'>
                    Please check your email for a verification code
                  </div>
                  <div>
                    <input
                      className='border-2 rounded-lg px-3 py-2 text-center'
                      type="tel"
                      placeholder='Enter a 6-digit code'
                      maxLength='6'
                      value={code}
                      onChange={(event) => (
                        setCode(event.target.value.replace(/\D/,''))
                      )}
                    />
                  </div>
                  <div
                  id="resend"
                  onClick={()=>handleClick()}
                  disabled={isDisabled}
                  className={`text-sm mt-5 ${isDisabled ? 'text-gray-400 cursor-default' : 'hover:text-link cursor-pointer'}`}
                  >{isDisabled ? `Wait for ${counter} seconds` : 'Resend code?'}
                  </div>
                  
                  <div className='w-full flex items-center justify-center md:w-1/2 md:flex-row flex-col gap-3'>
                    <div onClick={()=>isEmpty()}className="cursor-pointer md:order-2 w-full flex-shrink-0 bg-button-dblue hover:bg-gray-700 border-button-dblue hover:border-gray-700 text-sm border-4 text-white py-1 px-2 rounded-xl">
                      Continue
                    </div>
                    <div onClick={()=>{
                      onClose()
                      setIsDisabled(false);
                      setCountdownFinished(true); 
                      setCounter(0)
                      }} className="cursor-pointer w-full flex-shrink-0 border-transparent border-4 bg-gray-500 text-white hover:text-red-500 hover:bg-gray-300 text-sm py-1 px-2 rounded-xl">
                      Cancel
                    </div>
                  </div>
                </div>
            </div>
    </motion.div>
  )
}
