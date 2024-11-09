import React from 'react'
import HeroSection from '../components/landingPage/HeroSection'
import Navbar from '../components/Navbar'

const LandingPage = () => {
  return (
    <div className='min-h-screen font-inter'>
        <Navbar />
        <HeroSection />
    </div>
  )
}

export default LandingPage