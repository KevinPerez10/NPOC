import React from 'react'
import {Link} from 'react-router-dom'
import Nav from './Nav'

export default function ForgotPass() {
  return (
    <div>
        <Nav />
        <div className='h-full grid place-items-center border'>
            <div className='min-h-fit w-fit flex flex-col justify-center items-center shadow-lg p-20'>
                <h2 className="text-center mb-4"> Enter your email and we will send you a password reset link </h2>
                <form className='grid grid-cols-2 gap-4'>
                    <div class="col-span-2 flex items-center border-b border-gray py-2">
                        <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Email"
                                aria-label="email"/>
        
                    </div>
                    <button class="col-start-2 flex-shrink-0 bg-gray-500 hover:bg-gray-700 border-gray-500 hover:border-gray-700 text-sm border-4 text-white py-1 px-2 rounded"
                            type="submit">
                        Submit
                    </button>
                </form>
                <div className="w-full text-center mt-10">
                    Go back to <Link to="/login" className='text-link'>Log In</Link>
                </div>
            </div>
        </div>
    </div>
  )
}
