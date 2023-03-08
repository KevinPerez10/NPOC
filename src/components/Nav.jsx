import {React, useEffect} from 'react'
import {Link} from 'react-router-dom';
import { useState } from 'react';

export default function Nav(props) {
  const [className, setClassName] = useState(props.className)
  const [text, setText] = useState(props.text)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    } 
  }, [])

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setClassName(`${props.className} lg:bg-white lg:shadow-lg`)
      setText(`${props.text} text-black`)
    } else {
      setClassName(props.className)
      setText(props.text)
    }
  }

  return (
    <nav
      className={`font-poppins cursor-pointer transition-all ease-in duration-200 ${className}`}
    >
        <div className={`flex items-center p-5 ${props.childClassName}`}>
            <Link to="/" className='flex items-center'>
                <img className={`w-10 ${props.logo}`} src="./images/logo.png" alt="" />
                <p className={`text-3xl ml-2 ${text}`}>NPOC</p>
            </Link>
        </div>
    </nav>
  )
}
