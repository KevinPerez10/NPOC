import React from 'react'
import {Link} from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="grid font-poppins hover:cursor-pointer fixed">
        <div className="text-button-dblue flex items-center p-5">
            <Link to="/" className='flex items-center'>
                <img className="w-10" src="./images/logo.png" alt="" />
                <p className="text-3xl">NPOC</p>
            </Link>
        </div>
    </nav>
  )
}
