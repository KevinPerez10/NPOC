import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Nav from './Nav'
import {motion} from 'framer-motion'
import ForgotPass__NewPass from './ForgotPass__NewPass'
import axios from 'axios'

export default function ForgotPass() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const [isDisabled, setIsDisabled] = useState(false);
    const [counter, setCounter] = useState(30);
    const [countdownFinished, setCountdownFinished] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [openSendCode, setOpenSendCode] = useState(false)
    const [openNewPass, setOpenNewPass] = useState(false)
    const [userID, setUserId] = useState(0)

    const navigate = useNavigate();
    const [propsToPass, setPropsToPass] = useState('')
    const prop = {
        email: "null",
        password: "null"
    };
    useEffect(()=>{
        setPropsToPass({email: email,id: userID });
    },[email,userID])

    function isEmpty(){
        if(email!=""){
            if (email.includes('@')&& email.includes('.com')) {
                axios.post('https://mysql-npoc.herokuapp.com/checkemail', {
                e:email
                }).then((response)=>{
                    if(response.data==false){
                        // alert("The email you provided is not registered to the system!")
                        setFlag(false)
                        setPopup('The email you provided is not registered to the system!')
                        setTimeout(() => setPopup(''), 5000)
                    }
                    else{
                        setUserId(response.data[0].userID)
                        handleSubmit(response.data[0].firstName, response.data[0].lastName)
                        setOpenSendCode(true)
                        setFirstName(response.data[0].firstName)
                        setLastName(response.data[0].lastName)
                    }
                })
                
              } else {
                // alert('Invalid email address!');
                setFlag(false)
                setPopup('Invalid email address!')
                setTimeout(() => setPopup(''), 5000)
              }
        }
        else{
            // alert('Please fill all required fields!');
            setFlag(false)
            setPopup('Please fill all required fields!')
            setTimeout(() => setPopup(''), 5000)
        }
    }

    const handleSubmit = (first, last) => {
        axios.post("https://mysql-npoc.herokuapp.com/forgotpassword", {
            first: first,
            last: last, 
            email:email 
        }).then((response) => {
          })
          .catch((error) => {
            console.log(error);
          });
      };

      function checkCode(){
        axios.post('https://mysql-npoc.herokuapp.com/checkcode', {
            c:code,
            e:email
           }).then((response)=>{
            if(response.data == true){
                setOpenNewPass(true)
            }
            else{
                // alert("Incorrect code! Please input the right code.")
                setFlag(false)
                setPopup('Incorrect code! Please input the right code.')
                setTimeout(() => setPopup(''), 5000)
            }
            })
      }

      const handleClick = () => {
        if (countdownFinished) {
          setIsDisabled(false);
          setCountdownFinished(false);
          setCounter(30);
        } else if (!isDisabled && counter === 30) { // only start a new countdown if button is not already disabled and the previous countdown has finished
          // clear existing interval before starting a new one
          clearInterval(intervalId);
          setCounter(30);
          handlesubmit();
          setIsDisabled(true); // set the isDisabled state to true after the countdown has started successfully
          setTimeout(() => {
            // check if the button was already clicked during the delay
            if (isDisabled) {
                return
            } 
            const id = setInterval(() => setCounter(c => c - 1), 1000);
            setIntervalId(id);
          }, 200)
        } else {
          // do nothing if button is disabled or countdown is already in progress
        }
      };

      const handlesubmit = () => {
        axios.post("https://mysql-npoc.herokuapp.com/forgotpassword", {
            first: firstName,
            last: lastName,
            email: email 
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

return (
    <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className= 'h-full w-full flex flex-col'
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
        <Nav className='self-center fixed lg:self-start' text='hidden text-black lg:flex'/>
        <div className='h-screen grid place-items-center font-poppins bg-forgot--password bg-cover bg-no-repeat lg:bg-none lg:flex'>
            <div className='lg:w-1/2 lg:m-0 lg:p-0 lg:shadow-none flex flex-col justify-center items-center bg-white w-4/5 h-3/4 p-10 shadow-lg rounded-3xl'>
                {/* Form Group */}
                {openSendCode ? (
                    <form className='grid grid-cols-2 w-full md:w-1/2 lg:w-4/5 gap-4'>
                            <h2 className="text-center col-span-2 mb-4 w-full text-xl"> Enter the code that we sent through your email. </h2>
                            <div className="col-span-2 flex items-center border-b border-gray py-2">
                                <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                        type="text"
                                        placeholder="Enter a 6-digit code"
                                        maxLength='6'
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                />
                            </div>
                            <div className='col-span-2'>
                                <div
                                id="resend"
                                onClick={()=>handleClick()}
                                disabled={isDisabled}
                                className={`text-sm mt-5 text-center ${isDisabled ? 'text-gray-400 cursor-default' : 'hover:text-link cursor-pointer'}`}
                                >
                                    {isDisabled ? `Wait for ${counter} seconds` : 'Resend Code?'}
                                </div>
                            </div>
                            <div className='col-span-2'
                                >
                                <button
                                    onClick={() => {
                                        checkCode()
                                    }}
                                    className="w-full flex-shrink-0 bg-button-dblue hover:bg-gray-700 border-button-dblue hover:border-gray-700 text-sm border-4 text-white py-1 px-2 rounded-xl"
                                    type="button"
                                >
                                    Continue
                                </button>
                                {/*<button
                                    onClick={() => setOpenSendCode(false)}
                                >
                                    cancel
                                </button>*/}
                            </div>
                    </form>
                ) : (
                    <form className='grid grid-cols-2 w-full md:w-1/2 lg:w-4/5 gap-4'>
                        <h2 className="text-center col-span-2 mb-4 w-full text-xl"> Enter your email and we will send you a code to reset your password. </h2>
                            <div className="col-span-2 flex items-center border-b border-gray py-2">
                                <input onChange={(event) => (setEmail(event.target.value))} 
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                        type="email"
                                        placeholder="Email"
                                        aria-label="email"
                                        />
                            </div>
                            <div
                            onClick={() => {isEmpty();}}
                                className='col-span-2'
                                >
                                <button className="w-full flex-shrink-0 bg-button-dblue hover:bg-gray-700 border-button-dblue hover:border-gray-700 text-sm border-4 text-white py-1 px-2 rounded-xl"
                                        type="button">
                                    Send Code
                                </button>
                            </div>
                    </form>
                )}
<div className="w-full text-center mt-10">
                    Go back to <button onClick={()=>{navigate('/Sched', { state: { prop } })}} className='text-link'>Log In</button>
                </div>
            </div>
            <div className='hidden lg:inline lg:absolute lg:right-0 lg:inset-y-0 lg:w-1/2'>
                <img
                    src="./images/145968518_463031511397312_2518398407531758990_n.jpg"
                    alt=""
                    className='object-cover w-full h-full'
                />
            </div>
            <ForgotPass__NewPass props={propsToPass} open={openNewPass} onClose={() => setOpenNewPass(false)}/>
        </div>
    </motion.div>
  )
}
