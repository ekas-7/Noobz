import React from 'react'
import { Route,Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Profile from './components/Profile/Profile.jsx'
import PredictPage from './pages/PredictPage.jsx'
import AllDoctors from './components/AllDoctors/AllDoctors.jsx'
import Appointment from './components/Appointments/Appointment.jsx'
import AllAppointments from './components/Dashboard/AllAppointments.jsx'

const App = () => {
  return (
    <>
      <div className='text-2xl font-bold bg-red-500'>App</div>

      <Routes>
        <Route index path='/' element={<LandingPage />} />
        <Route path='/predict' element={<PredictPage />} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/all-doctors' element={<AllDoctors/>} />
        <Route path="/all-doctors/:speciality" element={<AllDoctors/>}/>
        <Route path="/appointment/:docId" element={<Appointment/>}/>
        <Route path='/my-appointments' element={<AllAppointments/>} />
      </Routes>
    </>
  )
}

export default App