import React from 'react'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import Nav from './Nav'
import axios from 'axios'

export default function SignUp() {
    
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [age, setAge] = useState(0);
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signupInfo = () => {
        axios.post('http://127.0.0.1:5174/create', {
         f:first,
         l:last,
         a:age,
         p:phone,
         ad:address,
         em:email,
         pa:password  
        }).then(()=>{
            console.log("success");
        })
         };
    return (
    <div>
        <Nav />
        <div className='h-screen grid place-items-center'>
            <div className='min-h-fit w-1/2 flex flex-col justify-center items-center shadow-lg p-10'>
                <h2 className="text-center mb-4"> Book now with us! </h2>
                <form className='grid grid-cols-2 gap-4'>
                    <div className="flex items-center border-b border-gray py-2">
                        <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                type="text"
                                placeholder="First Name"
                                aria-label="Full name"
                                //for useState
                                onChange={(event) => (
                                    setFirst(event.target.value)
                                )}/>
                    </div>
                    <div className="flex items-center border-b border-gray py-2">
                        <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Last Name"
                                aria-label="last name"
                                //for useState
                                onChange={(event) => (
                                    setLast(event.target.value)
                                )}/>
        
                    </div>
                    <div className="flex items-center border-b border-gray py-2">
                        <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Phone Number"
                                aria-label="phone number"
                                //for useState
                                onChange={(event) => (
                                    setPhone(event.target.value)
                                )}/>
        
                    </div>
                    <div className="flex items-center border-b border-gray py-2">
                        <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                type="number"
                                placeholder="Age"
                                aria-label="age"
                                //for useState
                                onChange={(event) => (
                                    setAge(event.target.value)
                                )}/>
        
                    </div>
                    {/* <div class="inline-block relative w-full">
                        <select class="block appearance-none w-full bg-transparent border-none border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option>Age</option>
                            <option>99</option>
                            <option>98.44</option>
        
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div> */}
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
                                type="text"
                                placeholder="Email"
                                aria-label="email"
                                //for useState
                                onChange={(event) => (
                                    setEmail(event.target.value)
                                )}/>
        
                    </div>
                    <div className="flex items-center border-b border-gray py-2">
                        <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Password"
                                aria-label="password"
                                //for useState
                                onChange={(event) => (
                                    setPassword(event.target.value)
                                )}/>
        
                    </div>
                    <div className="flex items-center border-b border-gray py-2">
                        <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Confirm Password"
                                aria-label="confirm password"/>
        
                    </div>
                    <Link to="/" className='grid'>
                        <button class="flex-shrink-0 border-transparent border-4 text-gray-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button"
                        >
                            Cancel
                        </button>
                    </Link>
                    <Link to="/login" className='grid'>
                        <button class="flex-shrink-0 bg-gray-500 hover:bg-gray-700 border-gray-500 hover:border-gray-700 text-sm border-4 text-white py-1 px-2 rounded"
                                onClick={signupInfo} type="submit">
                            Sign Up
                        </button>
                    </Link>
                </form>
                <div className="w-full text-right mt-5">
                    Already have an account? <Link to="/login" className='text-link'>Log In</Link>
                </div>
            </div>
        </div>
    </div>
  )
}
