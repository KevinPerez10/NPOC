import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Nav from './Nav';

export default function AdminLogIn({Login, error}) {
  const [details, setDetails] = useState({email: "", password: ""});

  const [errors, setErrors] = useState()

  useEffect(()=>{
    setErrors(error);
},[error])

  const submitHandler = e => {
    e.preventDefault();
    if(details.email === "" || details.password === ""){
        setErrors("Please fill all required! fields");
        setTimeout(() => setErrors(''), 5000)
      } else {
        Login(details);
      }
  }

    return (
    <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className='flex flex-col'
        >

        <Nav className='fixed justify-center w-full self-center top-0 text-white' childClassName='justify-center' text='hidden lg:flex'/>
    
        <div className='text-white h-screen grid place-items-center bg-gradient-to-tr from-button-dblue to-button-lblue'>
            <div className='min-h-fit w-full lg:w-2/5 flex flex-col justify-center items-center font-poppins p-20'>
                <h2 className='font-gilmer text-3xl self-start'> Welcome! </h2>
                <h3 className='font-poppins self-start mb-5'> Please login to your account </h3>
                {(errors != "") ? (<div className="error">{errors}</div>) : ""}
                <form className='w-full grid grid-cols-2 gap-4' onSubmit={submitHandler}>
                    <div className="col-span-2 flex items-center border-b border-gray py-2">
                        <input className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Email"
                                aria-label="email"
                                onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
        
                    </div>
                    <div className="col-span-2 flex items-center border-b border-gray py-2">
                        <input className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                                type="password"
                                placeholder="Password"
                                aria-label="password"
                                onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
        
                    </div>
                    <div className='xs:col-start-2 col-span-2'>
                        <button className="w-full flex-shrink-0 bg-button-dblue hover:bg-gray-700 border-button-dblue hover:border-gray-700 text-sm border-4 text-white py-1 px-2 rounded-xl"
                                type="submit">
                            Log In
                        </button>
                    </div>
                </form>
                <div className="w-full text-center mt-10">
                    Not the owner? <Link to="/signup" className='text-link'>Sign Up</Link>
                </div>
            </div>
        </div>
    </motion.div>
  )
}
