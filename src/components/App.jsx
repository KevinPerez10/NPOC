import './App.css'
import React, { useState, useEffect } from 'react';
import { HashLoader } from 'react-spinners'
import AnimatedRoutes from './AnimatedRoutes'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div className="App">
      <div className='flex justify-center items-center h-screen w-full'>
        {loading ? (
          <HashLoader
            sizeUnit={"px"}
            size={100}
            color={"#123abc"}
            loading={loading}
          />
        ) : (
          <AnimatedRoutes />
        )}
      </div>
    </div>
  )
}

export default App
