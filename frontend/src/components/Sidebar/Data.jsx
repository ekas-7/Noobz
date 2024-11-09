import React,{useContext} from 'react'
import {AppContext} from '../../context/AppContext.jsx'

function Data() {
    const {userData}  = useContext(AppContext)

  return (
    <div className='flex flex-col gap-3 items-center'>
        <img
            className='sm:w-[150px] rounded-full '
            src={userData.image} 
            alt="" 
        />

        <p className='font-semibold text-xl'>{userData.name}</p>
    </div>
  )
}

export default Data