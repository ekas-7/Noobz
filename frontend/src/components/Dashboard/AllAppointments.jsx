import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

function AllAppointments() {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    const day = dateArray[0]
    const monthIndex = Number(dateArray[1])
    const year = dateArray[2]
    return `${day} ${months[monthIndex]} ${year}`
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancelAppointment', { appointmentId }, { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) {
        toast.success(data.message)
        listAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  const listAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/listAppointments', { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
      } else {
        console.log("Couldn't find appointments")
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  const isTimeForVideoCall = (appointmentTime) => {
    const currentTime = new Date()
    const appointmentDate = new Date(appointmentTime)
    return currentTime >= appointmentDate
  }

  useEffect(() => {
    if (token) listAppointments()
  }, [token])

  return (
    <div className="mt-16 pb-20">
      <p className="text-gray-600 font-semibold text-xl mb-4">My Appointments</p>
      <hr className="bg-gray-300 h-[2px] mb-6" />

      <div className="space-y-6">
        {appointments.map((item, index) => (
          <div key={index} className="border border-gray-300 rounded-lg shadow-md p-4 sm:flex gap-6 bg-white hover:shadow-lg transition-shadow">
            <img 
              className="w-full sm:w-40 h-40 object-cover rounded-lg bg-[#C9D8FF]"
              src={item.docData.image} 
              alt="Doctor"
            />

            <div className="w-full flex flex-col justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-800">{item.docData.name}</p>
                <p className="text-sm text-gray-500">{item.docData.speciality}</p>

                <p className="mt-4 font-semibold text-gray-700">Address:</p>
                <p className="text-sm text-gray-500">{item.docData.address.line1}</p>
                <p className="text-sm text-gray-500">{item.docData.address.line2}</p>

                <div className="mt-4 flex items-center gap-2">
                  <p className="font-semibold text-gray-700">Date & Time:</p>
                  <p className="text-sm text-gray-500">{slotFormat(item.slotDate)} | {item.slotTime}</p>
                </div>
              </div>
            </div>

            {/* Right side for buttons */}
            <div className="flex flex-col justify-center items-center ml-6 space-y-4">
              {!item.cancelled && isTimeForVideoCall(item.slotDate + ' ' + item.slotTime) && (
                <button className="px-6 py-2 text-sm font-medium text-white border border-blue-500 rounded bg-blue-500 hover:bg-blue-600 transition-colors">
                  Video Call Now
                </button>
              )}
              {!item.cancelled && (
                <button className="px-6 py-2 text-sm font-medium text-white border border-green-500 rounded bg-green-500 hover:bg-green-600 transition-colors">
                  Pay Now
                </button>
              )}
              {!item.cancelled && (
                <button onClick={() => cancelAppointment(item._id)} className="px-6 py-2 text-sm font-medium text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white">
                  Cancel Appointment
                </button>
              )}
              {item.cancelled && (
                <button className="px-6 py-2 text-sm font-medium text-gray-500 border border-red-500 rounded cursor-not-allowed">
                  Appointment Cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments
