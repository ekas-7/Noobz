import React from 'react'
import { Route,Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'

const App = () => {
  return (
    <>
      <Routes>
        <Route index path='/' element={<LandingPage />} />
      </Routes>
    </>
  )
}

export default App