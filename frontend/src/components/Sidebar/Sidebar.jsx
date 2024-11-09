import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets_admin/assets.js'

import Data from './Data.jsx'

function Sidebar() {
    // const {aToken} = useContext(AdminContext)
    // const {dToken} = useContext(DoctorContext)

  return (
    <div className='h-screen col-span-2 row-span-10 fixed'>
        <Data/>

        <div className='min-h-screen bg-white border-r '>
            <ul className='text-{#515151} mt-5'>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3 md:px-9 md:min-w-60 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/dashboard'}>
                    <img src={assets.home_icon} alt="" />
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 py-3 md:px-9 md:min-w-60 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/my-appointments'}>
                    <img src={assets.appointment_icon} alt="" />
                    <p className='hidden md:block'>Appointments</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 py-3 md:px-9 md:min-w-60 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/all-doctors'}>
                    <img src={assets.people_icon} alt="" />
                    <p className='hidden md:block'>Doctor List</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 py-3 md:px-9 md:min-w-60 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/predict'}>
                    <img src={assets.people_icon} alt="" />
                    <p className='hidden md:block'>Dr. Derma</p>
                </NavLink>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar