import React, { useState } from 'react'
import {Link, NavLink, Outlet} from 'react-router-dom'
import { motion } from 'framer-motion'
import AdminLogIn from './AdminLogIn';
import axios from 'axios'
import Confirmation from './Confirmation';

export default function Dashboard() {
    const adminUser = [
    {
        name: "Admin2",
        email: "admin_2@npoc.com",
        password: "blueberry2023",
        role: "staff"
    },
    {
        name: "TEST",
        email: "1",
        password: "1",
        role: "staff"
    },
    {
        name: "Dr. Celna N. Perez",
        email: "doctor@npoc.com",
        password: "perez2023",
        role: "doctor"
    },
    {
        name: "Admin3",
        email: "admin_3@npoc.com",
        password: "strawberry2023",
        role: "staff"
    },
    {
        name: "Admin4",
        email: "admin_4@npoc.com",
        password: "blackberry2023",
        role: "staff"
    },
    {
        name: "Admin5",
        email: "admin_5@npoc.com",
        password: "raspberry2023",
        role: "staff"
    }
];
    
    const [user, setUser] = useState({name: "", email:"", password:"", role:""});
    const [error, setError] = useState("");

    const Login = (details) => {
        const matchedUser = adminUser.find(
          (user1) => user1.email === details.email && user1.password === details.password
        );
        if (matchedUser) {
          console.log("Logged in");
          setUser({
            name: matchedUser.name,
            email: matchedUser.email,
            password: matchedUser.password,
            role: matchedUser.role
          });
          axios.post('https://mysql-npoc.herokuapp.com/addvisits', {
            name: matchedUser.name,
            role: matchedUser.role
            })
          setError("");
        } else {
          setError("Details do not match!");
        }
      };
      

    const Logout = () => {
        setUser({
            name: "",
            email:"",
            password:""})
    }

    //handle hamburger
    const [open, setOpen] = useState(false)

    //handle logout
    const [confirm, setConfirm] = useState(false)


    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className='w-full'
            >
            {(user.email != "") ? (
            <div className='flex flex-col font-poppins lg:flex-row h-screen bg-bg-dashboard z-0'>
                {/* left panel */}
                <div className='text-center flex lg:flex-col gap-1 items-center bg-button-dblue text-white'>
                    <div className='flex items-center ml-5 font-gilmer lg:mx-5 my-5 gap-2'>
                        <img className='w-10' src="./images/logo.png" alt="" />
                        <h1>Nolasco - Perez Optical Clinic</h1>
                    </div>
                    <div className='hidden lg:flex items-center text-xs gap-2'>
                        <div className='text-2xl text-button-dblue bg-white p-2 border-2 rounded-full grid place-items-center'>
                            <ion-icon name="person"></ion-icon>
                        </div>
                        {user.name} <br />
                        Administrator
                    </div>
                    
                    {/* navbar */}
                    <div
                        onClick={() => setOpen(!open)}
                        className='hover:cursor-pointer lg:hidden ml-auto text-3xl mr-5 self-center'>
                        <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
                    </div>
                    <nav className={`lg:mt-10 lg:py-0 py-3 z-10 flex flex-col gap-2 w-full bg-button-dblue/75 backdrop-blur-sm lg:static absolute top-20 transition-all duration-100 ease-in ${open ? 'top-50' : 'top-[-490px]'}`}>
                        <NavLink
                            to="/dashboard"
                            replace
                            isActive={(location) => location.pathname === '/dashboard'}
                            className={`hover:bg-gray-700 px-5 py-2 mx-3 rounded-full transition-all ${location.pathname === '/dashboard' ? 'bg-button-lblue' : ''}`}
                        >
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/dashboard/records"
                            replace
                            isActive={(location) => location.pathname === '/dashboard/records'}
                            className={`hover:bg-gray-700 px-5 py-2 mx-3 rounded-full transition-all ${location.pathname === '/dashboard/records' ? 'bg-button-lblue' : ''}`}
                        >
                            Records
                        </NavLink>

                        <NavLink
                            to="/dashboard/appointments"
                            replace
                            isActive={(location) => location.pathname === '/dashboard/appointments'}
                            className={`hover:bg-gray-700 px-5 py-2 mx-3 rounded-full transition-all ${location.pathname === '/dashboard/appointments' ? 'bg-button-lblue' : ''}`}
                        >
                            Appointments
                        </NavLink>
                        
                        <NavLink
                            to="/dashboard/calendar"
                            replace
                            isActive={(location) => location.pathname === '/dashboard/calendar'}
                            className={`hover:bg-gray-700 px-5 py-2 mx-3 rounded-full transition-all ${location.pathname === '/dashboard/calendar' ? 'bg-button-lblue' : ''}`}
                        >
                            Calendar
                        </NavLink>
                        <div className='lg:hidden flex self-center gap-2'>
                            <div className='grid place-items-center text-3xl w-full mx-3 hover:cursor-pointer' src="./svg/bell-svgrepo-com.svg" alt="">
                                <ion-icon name="notifications-outline"></ion-icon>
                            </div>
                            <div className='grid place-items-center text-3xl w-full mx-3 hover:cursor-pointer' alt="" onClick={() => setConfirm(true)}>
                                <ion-icon name="log-out-outline"></ion-icon>
                            </div>
                            
                            <div className='text-2xl text-button-dblue bg-white p-2 mr-5 border-2 rounded-full grid place-items-center'>
                                <ion-icon name="person"></ion-icon>
                            </div>
                        </div>
                    </nav>
                </div>
                {/* main content */}
                <div className='flex flex-col justify-between w-full h-full'>
                    <div className='flex justify-center items-center lg:sticky bg-footer'>
                        <div className='p-5'>Welcome, <span>{user.name}</span>!</div>
                        <div className='hidden lg:flex ml-auto'>
                            {/*<div className='grid place-items-center text-3xl w-full mx-3 hover:cursor-pointer' src="./svg/bell-svgrepo-com.svg" alt="">
                                <ion-icon name="notifications-outline"></ion-icon>
                            </div>*/}
                            <div
                                className='grid place-items-center text-3xl w-full mx-3 hover:cursor-pointer' alt=""
                                onClick={() => {
                                    const confirmed = window.confirm("Are you sure you want to log out?")
                                    confirmed ? Logout() : null
                                    // setConfirm(true)
                                }}
                            >
                                <ion-icon name="log-out-outline"></ion-icon>
                            </div>
                            
                            <div className='text-2xl text-button-dblue bg-white p-2 mr-5 border-2 rounded-full grid place-items-center'>
                                <ion-icon name="person"></ion-icon>
                            </div>
                        </div>
                    </div>
                    {/* content */}
                    <div className='overflow-auto md:py-5 h-full'>
                        <Outlet/>
                    </div>
                    {/* footer */}
                    <div className='flex flex-col sm:flex-row justify-between items-center bg-footer py-5 px-5'>
                        <p>© 2022 NPOCadmin Dashboard</p>
                        <p>Designed by: NPOC Admin</p>
                    </div>
                    
                </div>
                <Confirmation open={confirm} onClose={() => setConfirm(false)} message={'Are you sure you want to logout?'}/>
            </div>
            ) : (
                <AdminLogIn Login={Login} error={error}/>
            )}
        </motion.div>
    )
}
