import React, {useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

export default function ForgotPass__NewPass({open, onClose,props}) {

  const navigate = useNavigate();
  const MIN_PASSWORD_LENGTH = 7;
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const prop = {
    email: props.email,
    password: newPassword
  };
  function changePass(){
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError("The password must contain at least 8 characters!")
    }
    else{
    axios.post('https://mysql-npoc.herokuapp.com/changepassword', {
        id: props.id,
        ps:newPassword
        })
    alert("Password has been changed!")
    navigate('/Sched', { state: { prop } })
      }
  }

    if (!open) return null
  return (
    <div className='bg-black/70 text-button-dblue fixed grid place-items-center w-full h-full z-20 top-0 left-0'>
        <div className='lg:w-1/2 w-4/5 h-4/5 grid place-items-center rounded-lg border-2 text-button-dblue shadow-lg px-10 py-5 bg-white'>
          <form className='grid grid-cols-2 w-full md:w-1/2 lg:w-4/5 gap-4'>
            <h2 className="text-center col-span-2 mb-4 w-full text-xl"> Enter your new password </h2>
              <div className="col-span-2 flex items-center border-b border-gray py-2">
                <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="password"
                  placeholder="Enter your new password"
                  aria-label="email"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="col-span-2 flex items-center border-b border-gray py-2">
                  <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="password"
                    placeholder="Confirm your password"
                    aria-label="email"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  />
              </div>
              <div
                  className='col-span-2 flex flex-col gap-2'
                  >
                  <button
                    onClick={()=> {newPassword === confirmPassword? changePass(): alert("Your passwords does not match!")
                    }}
                    className="w-full flex-shrink-0 bg-button-dblue hover:bg-gray-700 border-button-dblue hover:border-gray-700 text-sm border-4 text-white py-1 px-2 rounded-xl"
                    type="button"
                  >
                      Continue
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full flex-shrink-0 border-transparent border-4 bg-gray-500 text-white hover:text-red-500 hover:bg-gray-300 text-sm py-1 px-2 rounded-xl"
                  >
                      Cancel
                  </button>
              </div>
            </form>
        </div>
    </div>
  )
}
