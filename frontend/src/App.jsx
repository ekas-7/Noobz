import React from 'react'
import { Route,Routes } from 'react-router-dom'

import LandingPage from './pages/LandingPage.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Profile from './components/Profile/Profile.jsx'

const App = () => {
  return (
    <>
      <div className='text-2xl font-bold bg-red-500'>App</div>

      <Routes>
      <Route index path='/' element={<LandingPage />} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
    </>
  )
}

export default App