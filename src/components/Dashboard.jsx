import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div className='grid grid-cols-2 gap-4 place-items-center'>
        <div className='row-span-3'>
            Nolasco - Perez Optical Clinic
        </div>
        <div className=''>
            Dashboard
        </div>
        <div className=''>
            Main
        </div>
        <div>
            Footer
        </div>
    </div>
  )
}
