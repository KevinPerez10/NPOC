import React from 'react'
import {Link} from 'react-router-dom'
import Nav from './Nav'

export default function LogIn() {
  return (
    <div>
        <Nav />
        <div className='h-screen grid place-items-center'>
            <div className='min-h-fit w-fit flex flex-col justify-center items-center shadow-lg p-20'>
                <h2 className="text-center mb-4"> Welcome! Please login to your account </h2>
                <form className='grid grid-cols-2 gap-4'>
                    <div class="col-span-2 flex items-center border-b border-gray py-2">
                        <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Email"
                                aria-label="email"/>
        
                    </div>
                    <div class="col-span-2 flex items-center border-b border-gray py-2">
                        <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Password"
                                aria-label="password"/>
        
                    </div>
                    <Link to="/forgotpass" className='col-start-2'>
                        <div className="text-center text-link">
                            Forgot Password
                        </div>
                    </Link>
                    <Link to="/sched" className='col-start-2'>
                        <button class="w-full flex-shrink-0 bg-gray-500 hover:bg-gray-700 border-gray-500 hover:border-gray-700 text-sm border-4 text-white py-1 px-2 rounded"
                                type="submit">
                            Log In
                        </button>
                    </Link>
                </form>
                <div className="w-full text-center mt-10">
                    Not a member? <Link to="/signup" className='text-link'>Sign Up</Link>
                </div>
            </div>
        </div>
    </div>
  )
}
