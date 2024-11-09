import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {AppContext} from '../../context/AppContext'

function AllDoctors() {
  const {speciality} = useParams();
  const {doctors} = useContext(AppContext)
  const [filterDoc, setfilterDoc] = useState([]);
  const [showFilter,setShowFilter] = useState(false);
  const navigate = useNavigate();

  const applyFilter = () => {
    if(speciality){
      setfilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }else{
      setfilterDoc(doctors);
    }
  }

  useEffect(() => {
    applyFilter();
  },[doctors,speciality]);

  return (
    <div className='p-10 pt-4'>
      <p className='text-[18px] text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row gap-4 mt-4'>
        <div>
          <button className={`inline-block py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
        </div>
        
        <div className={`${showFilter ? '' : 'hidden'} sm:block`}>
          <p onClick={() => speciality === 'Medical Dermatology' ? navigate('/all-doctors') : navigate('/all-doctors/Medical Dermatology')} 
            className={`p-2 mb-2 border border-gray-300 lg:w-[200px] rounded-lg cursor-pointer ${speciality === 'Medical Dermatology' ? 'bg-[#C9D8FF]' : ''}`}>
              Medical Dermatology
          </p>

          <p onClick={() => speciality === 'Pediatric Dermatology' ? navigate('/all-doctors') : navigate('/all-doctors/Pediatric Dermatology')} 
            className={`p-2 mb-2 border border-gray-300 lg:w-[200px] rounded-lg cursor-pointer ${speciality === 'Pediatric Dermatology' ? 'bg-[#C9D8FF]' : ''}`}>
              Pediatric Dermatology
          </p>

          <p onClick={() => speciality === 'Cosmetic Dermatology' ? navigate('/all-doctors') : navigate('/all-doctors/Cosmetic Dermatology')} 
            className={`p-2 mb-2 border border-gray-300 lg:w-[200px] rounded-lg cursor-pointer ${speciality === 'Cosmetic Dermatology' ? 'bg-[#C9D8FF]' : ''}`}>
              Cosmetic Dermatology
          </p>

          <p onClick={() => speciality === 'Mohs Surgery' ? navigate('/all-doctors') : navigate('/all-doctors/Mohs Surgery')} 
            className={`p-2 mb-2 border border-gray-300 lg:w-[200px] rounded-lg cursor-pointer ${speciality === 'Mohs Surgery' ? 'bg-[#C9D8FF]' : ''}`}>
              Mohs Surgery
          </p>

          <p onClick={() => speciality === 'Immunodermatology' ? navigate('/all-doctors') : navigate('/all-doctors/Immunodermatology')} 
            className={`p-2 mb-2 border border-gray-300 lg:w-[200px] rounded-lg cursor-pointer ${speciality === 'Immunodermatology' ? 'bg-[#C9D8FF]' : ''}`}>
              Immunodermatology
          </p>

          <p onClick={() => speciality === 'Teledermatology' ? navigate('/all-doctors') : navigate('/all-doctors/Teledermatology')} 
            className={`p-2 mb-2 border border-gray-300 lg:w-[200px] rounded-lg cursor-pointer ${speciality === 'Teledermatology' ? 'bg-[#C9D8FF]' : ''}`}>
              Teledermatology
          </p>

        </div>

        <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4 gap-y-6  max-h-[88vh] overflow-y-scroll '>
        {
          filterDoc.map((item,index) => (
            <div onClick={() => navigate(`/appointment/${item._id}`)} className='rounded-lg border border-[#C9D8FF] cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
              <img src={item.image} alt="" className='bg-[#C9D8FF] w-full object-cover rounded-lg'/>
              <div className='p-4'>
                <div className='flex gap-2 items-center'>
                  <div className={`w-[5px] h-[5px] ${item.available ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></div>
                  <p className={`text-[10px] ${item.available ? 'text-green-500' : 'text-red-500'} `}>{item.available ? 'Available' : 'Not Available'}</p>
                </div>
                <p className='font-semibold'>{item.name}</p>
                <p className='text-[10px] text-gray-800'>{item.speciality}</p>
              </div>
            </div>
          ))
        }
      </div>

      </div>
    </div>
  )
}

export default AllDoctors