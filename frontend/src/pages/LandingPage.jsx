import React from 'react'
import HeroSection from '../components/landingPage/HeroSection'
import Navbar from '../components/Navbar'
import Features from '../components/landingPage/Features'

const LandingPage = () => {
  return (
    <div className='min-h-screen font-inter'>
        <Navbar />
        <HeroSection />
        <Features />
    </div>
  )
}

export default LandingPage