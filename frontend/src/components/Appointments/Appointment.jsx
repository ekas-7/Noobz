import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/assets_frontend/assets.js';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext.jsx';
import RelatedDoctors from './RelatedDoctors.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';

function Appointments() {
  const { docId } = useParams();
  const [doc, setDoc] = useState({});
  const [docSlot, setDocSlot] = useState([]);
  const [slotIdx, setSlotIdx] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const navigate = useNavigate();

  // Find the doctor data by ID
  const findDoc = () => {
    const doctor = doctors.find(doc => doc._id === docId);
    if (doctor) setDoc(doctor);
  };

  // Get available slots for the next 7 days
  const getAvailableSlots = async () => {
    setDocSlot([]);
    let today = new Date();
    let startHour = 10;  // Starting hour for slots
    let endHour = 21;    // Ending hour for slots

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      currentDate.setHours(startHour, 0, 0, 0);
      let timeSlots = [];

      while (currentDate.getHours() < endHour) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;
        const isSlotAvailable = !doc.slots_booked?.[slotDate]?.includes(formattedTime);

        if (isSlotAvailable) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime
          });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlot(prev => [...prev, timeSlots]);
    }
  };

  // Book appointment handler
  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book an appointment');
      return navigate('/login');
    }
    try {
      const date = docSlot[slotIdx][0].dateTime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;
      const { data } = await axios.post(`${backendUrl}/api/user/bookAppointment`, { docId, slotDate, slotTime }, { headers: {  Authorization: `Bearer ${token}`  } });
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    findDoc();
  }, [doctors, docId]);

  useEffect(() => {
    if (doc) getAvailableSlots();
  }, [doc]);

  return (
    <div className='flex flex-col justify-center align-middle gap-2'>
      <div className="flex flex-col sm:flex-row px-4 w-full gap-2">
        {/* Doctor Image Section */}
        <div className="flex-1 w-full sm:max-w-[300px] sm:w-[30vw] h-auto">
          <img
            className="bg-[#C9D8FF] w-full sm:max-w-[1000px] rounded-lg object-cover"
            src={doc.image}
            alt=""
          />
        </div>

        {/* Doctor Information Section */}
        <div className="flex-1 p-8 py-7 border border-gray-400 rounded-lg sm:mx-0 flex flex-col">
          <div className="flex items-center gap-3">
            <p className="text-3xl font-semibold text-gray-700">{doc.name}</p>
            <img src={assets.verified_icon} alt="Verified Icon" />
          </div>

          <div className="text-md flex gap-3 text-gray-500 items-center mt-2">
            <p>{doc.degree} - {doc.speciality}</p>
            <p className="border border-gray-600 py-[1px] px-3 rounded-full">{doc.experience} years</p>
          </div>

          <div className="flex gap-2 mt-2">
            <p>About</p>
            <img src={assets.info_icon} alt="Info Icon" />
          </div>

          <p className="text-md text-gray-500 mt-1">{doc.about}</p>

          <div className="flex mt-3 items-center">
            <p className="text-lg text-gray-600">Appointment fees:</p>
            <p className="ml-2">{currencySymbol}{doc.fees}</p>
          </div>
        </div>
      </div>

      {/* Slot Selection Section */}
      <div className="flex flex-col sm:flex-row px-4 w-full gap-2">
        <div className="flex-1 max-w-[300px] w-[30vw] h-auto"></div>

        <div className="flex-1 mt-4 sm:mx-0 flex-col">
          <p className="text-md text-gray-500">Booking Slots</p>
          <div className='flex flex-wrap gap-2 mt-4'>
            {docSlot.length ? (
              docSlot.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col justify-center items-center border border-gray-400 ${slotIdx === index ? 'bg-peach text-white' : ''} py-6 px-3 w-[60px] rounded-full text-[13px] cursor-pointer`}
                  onClick={() => setSlotIdx(index)}
                >
                  <p>{item[0] && dayOfWeek[item[0].dateTime.getDay()]}</p>
                  <p>{item[0] && item[0].dateTime.getDate()}</p>
                </div>
              ))
            ) : (
              <p>No available slots</p>
            )}
          </div>

          <div className='flex flex-wrap gap-2 mt-4 overflow-x-auto'>
            {docSlot[slotIdx]?.map((item, index) => (
              <p 
                key={index}
                className={`flex justify-center items-center border border-gray-400 ${slotTime === item.time ? 'bg-peach text-white' : ''} rounded-full text-[13px] cursor-pointer py-2 px-6`}
                onClick={() => setSlotTime(item.time)}
              >
                {item.time}
              </p>
            ))}
          </div>

          {/* Book Appointment Button */}
          <div className='mt-4 flex justify-center sm:justify-normal'>
            <button onClick={bookAppointment} className='w-[170px] sm:w-[150px] md:w-[200px] lg:w-[250px] bg-black p-2 rounded-full cursor-pointer text-white'>
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      <RelatedDoctors docId={docId} speciality={doc.speciality}/>
    </div>
  );
}

export default Appointments;
