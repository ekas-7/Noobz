import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DoctorContextProvider from './Context/doctorContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DoctorContextProvider>
      <App />
    </DoctorContextProvider>
  </StrictMode>,
)
