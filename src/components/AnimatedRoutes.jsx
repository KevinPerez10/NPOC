import React from 'react'
import HomePage from "./HomePage"
import SignUp from "./SignUp"
import LogIn from './LogIn'
import ForgotPass from './ForgotPass'
import Sched from './Sched'
import Slots from './Slots'
import ThankYou from './ThankYou'
import AdminLogIn from './AdminLogIn'
import Dashboard from './Dashboard'
import Main from './components__dashboard/Main'
import Records from './components__dashboard/Records'
import RxData from './components__records/AddRxData'
import Appointments from './components__dashboard/Appointments'
import Calendar from './components__dashboard/Calendar'
import EmailVerification from './EmailVerification'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'

export default function AnimatedRoutes() {
    const location = useLocation()
  return (
    <AnimatePresence>
        <Routes location={location} key={location.path}>
        <Route path='/' element={<HomePage/>} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<LogIn/>}/>
        <Route path='/forgotpass' element={<ForgotPass/>}/>
        <Route path='/sched' element={<Sched/>}/>
        <Route path='/emailverification' element={<EmailVerification/>}/>
        <Route path='/slots' element={<Slots/>}/>
        <Route path='/thankyou' element={<ThankYou/>}/>
        <Route path='/adminlogin' element={<AdminLogIn/>}/>
        <Route path='/dashboard' element={<Dashboard/>}>
            <Route index element={<Main/>}/>
            <Route path='records' element={<Records/>}/>
            <Route path='rxdata' element={<RxData/>}/>
            <Route path='appointments' element={<Appointments/>}/>
            <Route path='calendar' element={<Calendar/>}/>
        </Route>
        </Routes>
    </AnimatePresence>
  )
}
