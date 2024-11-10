import React,{useContext} from 'react'
import { DoctorContext } from './Context/DoctorContext.jsx';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from './components/Navbar.jsx';
import Login from './pages/Login.jsx';

function App() {
  const {dToken} = useContext(DoctorContext)

  return dToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <NavBar />
      <div className='flex items-start'>
        <SideBar/>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App