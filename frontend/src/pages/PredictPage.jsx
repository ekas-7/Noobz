import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/landingPage/Footer'
import ChatInterface from '../components/predict/ChatInterface'

const PredictPage = () => {
  return (
    <div>
        <Navbar />
        <ChatInterface />
        <Footer />
    </div>
  )
}

export default PredictPage