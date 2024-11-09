import React from 'react'
import HeroSection from '../components/landingPage/HeroSection'
import Navbar from '../components/Navbar'
import Features from '../components/landingPage/Features'
import HowItWorks from '../components/landingPage/HowItWorks'
import Benefits from '../components/landingPage/Benefits'
import Testimonials from '../components/landingPage/Testimonials'

const LandingPage = () => {
  return (
    <div className='min-h-screen font-inter'>
        <Navbar />
        <HeroSection />
        <Features />
        <HowItWorks />
        <Benefits />
        <Testimonials />
    </div>
  )
}

export default LandingPage