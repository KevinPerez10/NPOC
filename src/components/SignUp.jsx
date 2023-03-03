import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Nav from './Nav'
import axios from 'axios'
import { motion } from 'framer-motion'
import EmailVerification from './EmailVerification'
import TermsCondition from './TermsCondition'


export default function SignUp() {
const navigate = useNavigate();
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const MIN_PASSWORD_LENGTH = 7;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

function getCurrentDate() {
    const today = new Date();
    var mon = today.getMonth()+1;
    if(mon<10){
        mon = "0"+ mon
    }
    var day = today.getDate();
    if(day<10){
        day = "0"+ day
    }

    return( mon+"/"+day+"/"+today.getFullYear());
  }
    const [openVerify, setOpenVerify] = useState(false)
    const [openTermsConditions, setOpenTermsConditions] = useState(false)
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [birthday, setBirthday] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [visible, setVisible] = useState(false)
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState("");

    const toggleVisibility = () => {
        setVisible(!visible)
    } 
    
    const propsToPass = {
        first: first,
        last: last,
        birthday: birthday,
        phone: phone,
        address: address,
        email: email,
        password: password
      };
      const prop = {
        email: "null",
        password: "null"
      };
    //validation
    function isEmpty(event){
        event.preventDefault();
    if (
      first !== '' &&
      last !== '' &&
      birthday !== '' &&
      phone !== '' &&
      address !== '' &&
      email !== '' &&
      password !== ''
    ) {
        const bd = new Date(birthday)
        const td = new Date(getCurrentDate())
        const diffInYears = (td.getTime() - bd.getTime()) / (1000 * 3600 * 24 * 365);

        if (bd >= td) {
            setError("Input a valid birth of date")
            setTimeout(() => setError(''), 5000)
        }
        else if (diffInYears <= 5) {
            setError("Invalid age")
            setTimeout(() => setError(''), 5000)
        }
        else if (password!=confirmpassword) {
            setError("Passwords doesn't match")
            setTimeout(() => setError(''), 5000)
        }
        else if (phone.length < 11) {
            setError("Phone number must be 11 digits")
            setTimeout(() => setError(''), 5000)
        }
        else if (isChecked == false) {
            setError("Check the terms and agreement!")
            setTimeout(() => setError(''), 5000)
        }
        else if(!EMAIL_REGEX.test(email)){
            setError("Please input a valid email!")
            setTimeout(() => setError(''), 5000)
        }
        else if(password.length <= MIN_PASSWORD_LENGTH){
            setError("The password must contain at least 8 characters!")
            setTimeout(() => setError(''), 5000)
        }
        else if (email.includes('@') && email.includes('.com')) {
        axios.post('https://mysql-npoc.herokuapp.com/checkemail', {
         e:email
        }).then((response)=>{
            if(response.data==false){
                handleSubmit();
                setOpenVerify(true)
            }
            else{
                setError("An email is already registered in this account!")
                setTimeout(() => setError(''), 5000)
            }
        })
        
        //setOpenVerify(true)
      } else {
        setError('Invalid email address!');
        setTimeout(() => setError(''), 5000)
      }
    } else {
      setError('Please fill all required fields!');
      setTimeout(() => setError(''), 5000)
    }
    }
    const handleSubmit = () => {
    axios.post("https://mysql-npoc.herokuapp.com/emailverification", {
        first: first,
        last: last,
        email:email 
    }).then((response) => {
      })
      .catch((error) => {
        console.log(error);
      });
  };
    return (
    <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className= 'h-full w-full flex flex-col'
        >
            <Nav className='self-center fixed lg:self-start' text='hidden text-black lg:flex' logo='hidden lg:flex'/>
            <div className='h-full overflow-hidden grid place-items-center font-poppins bg-signup--image bg-cover bg-no-repeat lg:bg-none lg:flex'>
                <div className='lg:w-1/2 lg:m-0 lg:p-0 lg:shadow-none flex flex-col justify-center items-center shadow-lg rounded-3xl bg-white mx-5 px-10 py-5'>
                    <div
                        className={`z-20 bg-red-500 text-white p-3 rounded-lg absolute lg:right-3 top-3 transition-all ${error=='' ? 'hidden' : ''}`}
                    >
                            {error}
                    </div>
                    <form className='grid grid-cols-2 gap-4'>
                        <h2 className="col-span-2 mb-4 font-gilmer text-button-dblue text-2xl"> Book with us now! </h2>
                        <div className="col-start-1 flex items-center border-b border-gray py-2">
                            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="First Name"
                                    aria-label="Full name"
                                    //for useState
                                    onChange={(event) => (
                                        setFirst(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1))
                                    )}/>
                        </div>
                        <div className="flex items-center border-b border-gray py-2">
                            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="Last Name"
                                    aria-label="last name"
                                    //for useState
                                    onChange={(event) => (
                                        setLast(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1))
                                    )}/>
            
                        </div>
                        <div className="flex items-center border-b border-gray py-2">
                            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    type="tel"
                                    maxLength="11"
                                    placeholder="Phone Number"
                                    aria-label="phone number"
                                    value={phone}
                                    //for useState
                                    onChange={(event) => (
                                        setPhone(event.target.value.replace(/\D/,''))
                                    )}/>
                        </div>
                        <input
                            type="text"
                            disabled
                            className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
                            placeholder='Date of Birth'
                        />
                        <div className="flex col-start-2 items-center border-b border-gray py-2 -mt-10">
                            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    type="date"
                                    placeholder="Date of Birth"
                                    aria-label="date of birth"
                                    //for useState
                                    onChange={(event) => (
                                        setBirthday(event.target.value)
                                    )}/>
                        </div>
                        {/* Address */}
                        <div className="col-span-2 flex items-center border-b border-gray py-2">
                            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="Address"
                                    aria-label="address"
                                    //for useState
                                    onChange={(event) => (
                                        setAddress(event.target.value)
                                    )}/>
                        </div>
                        {/* Email and Password */}
                        <div className="col-span-2 flex items-center border-b border-gray py-2">
                            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    type="email"
                                    placeholder="Email"
                                    aria-label="email"
                                    //for useState
                                    onChange={(event) => (
                                        setEmail(event.target.value)
                                    )}/>
            
                        </div>
                        <div className="flex items-center border-b border-gray py-2">
                            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    type={visible ? 'text' : 'password'}
                                    placeholder="Password"
                                    aria-label="password"
                                    value={password}
                                    //for useState
                                    onChange={(event) => (
                                        setPassword(event.target.value)
                                    )}/>
            
                        </div>
                        <div className="flex items-center border-b border-gray py-2">
                            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    type={visible ? 'text' : 'password'}
                                    placeholder="Confirm Password"
                                    aria-label="confirm password"
                                    onChange={(event) => (
                                        setConfirmPassword(event.target.value)
                                    )}/>
            
                            <div className='grid place-items-center text-xl cursor-pointer'>
                                {visible ? (
                                    <ion-icon onClick={toggleVisibility} name="eye-outline"></ion-icon>
                                ) : (
                                    <ion-icon onClick={toggleVisibility} name="eye-off-outline"></ion-icon>
                                )}
                            </div>
                        </div>
                        <div>
                            <p></p>
                        </div>
                        <div className="col-span-2 mt-5 flex justify-center gap-2">
                            <input className='lg:w-5 w-7 cursor-pointer' type="checkbox"checked={isChecked}
                            onChange={(event) => setIsChecked(event.target.checked)}/>
                            <div className='flex md:flex-row flex-col gap-1'>
                                By clicking this checkbox, you agree to our <div onClick={() => setOpenTermsConditions(true)} className='text-link cursor-pointer'>Terms and Conditions</div>
                            </div>
                        </div>
                        <div className='w-full flex justify-center items-center lg:flex-row flex-col gap-3 col-span-2'>
                            <Link onClick={isEmpty} className='w-full lg:order-2'>
                                <button class="w-full flex-shrink-0 bg-button-dblue hover:bg-gray-700 border-button-dblue hover:border-gray-700 text-sm border-4 text-white py-1 px-2 rounded-xl"
                                         type="submit">
                                    Sign Up
                                </button>
                            </Link>
                            <Link to="/" className='w-full'>
                                <button class="w-full flex-shrink-0 border-transparent border-4 bg-gray-500 text-white hover:text-red-500 text-sm py-1 px-2 rounded-xl" type="button"
                                >
                                    Cancel
                                </button>
                            </Link>
                        </div>
                        <div className="col-span-2">
                            Already have an account? <button onClick={()=>{navigate('/Sched', { state: { prop } })}} className='text-link'>Log In</button>
                        </div>
                    </form>
                </div>
                <div className='hidden lg:inline lg:absolute lg:right-0 lg:inset-y-0 lg:w-1/2'>
                    <img
                        src="./images/139472517_220155239842825_6914890826448897223_n.jpg"
                        alt=""
                        className='object-cover w-full h-full'
                    />
                </div>
                <EmailVerification props={propsToPass}open={openVerify} onClose={() => setOpenVerify(false)}/>
                <TermsCondition openTerms={openTermsConditions} onCloseTerms={() => setOpenTermsConditions(false)}/>
            </div>
    </motion.div>
  )
}
