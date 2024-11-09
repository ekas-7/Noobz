import React from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {assets} from '../../assets/assets_frontend/assets.js'

function Appointments() {
  return (
    <div className='mt-16 pb-20'>
      <p className='text-gray-600 font-medium'>My appoitments</p>
      <hr className='bg-gray-300 h-[2px] mt-2'/>

      <div>
        {/* { */}
        {/* //   appointments.map((item,index) => ( */}
            <>
              {/* <div key={index} className='flex mt-4 gap-3 w-full flex-col sm:flex-row items-center'> */}
              <div className='flex mt-4 gap-3 w-full flex-col sm:flex-row items-center rounded-lg'>
                <img 
                  className='w-[300px] sm:w-[150px] object-cover h-auto bg-[#C9D8FF]'
                  src={assets.profile_pic} 
                />

                <div className='w-full flex flex-row justify-between gap-2'>
                  <div>
                    <p className='font-medium'>Saurabh Sahu</p>
                    <p className='text-[12px] text-gray-500'>MBBS</p>

                    <p className='mt-2 font-medium text-gray-700 text-[14px] pb-1'>Address:</p>
                    <p className='text-[12px] text-gray-500'>Delhi</p>
                    <p className='text-[12px] text-gray-500'>India</p>

                    <div className='flex w-full mt-2 items-center gap-2'>
                      <p className='font-medium text-gray-700 text-[14px]'>Date & Time : </p>
                      <p className='text-[12px] text-gray-500'>4:00 pm | Mon</p>
                    </div>
                  </div>

                  <div className='flex flex-col gap-3 justify-end text-[14px] text-gray-600'>
                    {/* {!item.cancelled && !item.payment && !item.isCompleted && <button className='w-48 py-2 border rounded text-stone-500 bg-indigo-50'>Paid</button>} */}
                    {/* {!item.cancelled && <button className='px-4 py-2 md:px-6 border hover:text-white hover:bg-primary'>Pay Online</button>}
                    {!item.cancelled && <button onClick={() => cancelAppointment(item._id)} className='px-4 py-2 md:px-6 border hover:bg-red-600 hover:text-white'>Cancel appointment</button>}
                    {item.cancelled && <button className='sm:min-w-48 py-2 border border-red-500 rouned text-red-500'>Appointment cancelled</button>} */}


                   <button className='px-4 py-2 md:px-6 border hover:text-white hover:bg-primary'>Pay Online</button>
                   <button onClick={() => cancelAppointment(item._id)} className='px-4 py-2 md:px-6 border hover:bg-red-600 hover:text-white'>Cancel appointment</button>
                    {/* {item.cancelled && <button className='sm:min-w-48 py-2 border border-red-500 rouned text-red-500'>Appointment cancelled</button>} */}
                  </div>
                </div>
              </div>
            <hr className='bg-gray-300 h-[2px] mt-2'/>
          </>
          {/* ))
        } */}
      </div>
    </div>
  )
}

export default Appointments