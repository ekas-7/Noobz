import React, { useContext, useState } from 'react'
import {AppContext} from '../../context/AppContext.jsx'
import {assets} from '../../assets/assets_frontend/assets.js'
import { toast } from 'react-toastify';
import axios from 'axios'

function Profile() {
    const [isEdit,setIsEdit] = useState(false);
    const [image,setImage] = useState(false);

    const {backendUrl,userData} = useContext(AppContext)
    
  return (
    <div className="grid grid-cols-12 grid-rows-12 gap-6 p-6 min-h-[80vh]">

        {/* left section */}
        <div className="col-span-2 row-span-11 bg-gray-50 p-5 flex flex-col items-center">
            <div>
            <div className="sm:flex sm:flex-wrap sm:items-center sm:justify-center">
                {
                isEdit
                ? <label htmlFor="image">
                    <div className="inline-block relative cursor-pointer max-w-[100px]">
                        <img className="w-36 rounded opacity-75" src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                        <img className="w-10 absolute bottom-12 right-12" src={image ? '' : assets.upload_icon} alt="" />
                    </div>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                    </label>
                : <img 
                    className="max-w-[100px] rounded-full"
                    src={userData.image} 
                    alt="" 
                    />
                }

                {/* name of patient */}
                {
                isEdit ? 
                    <input 
                    className="
                        bg-gray-200 text-[30px] sm:text-[20px] md:text-[25px] lg:text-[30px]
                        text-center font-medium mt-4 rounded-lg border border-blue-400
                        shadow-sm w-full
                    "
                    type="text"
                    name="name"
                    // onChange={(e) => setUserData(prev => ({...prev,name:e.target.value}))}
                    value={userData.name} 
                    />
                : <p className="text-[30px] sm:text-[20px] md:text-[25px] lg:text-[30px] mt-4 text-center font-medium">
                    {userData.name}
                    </p>
                }
            </div>
            </div>

            {/* save and edit button */}
            <div className="flex gap-4 mt-4 w-full">
            {
                isEdit 
                ? <button 
                    // onClick={updateUserProfileData}
                    className="w-full py-2 px-8 border border-blue-600 rounded-md bg-blue-600 text-white hover:bg-white hover:text-gray-400"
                >
                    Save Information
                </button>
                : <button 
                    // onClick={handleEdit}
                    className="w-full py-2 px-8 border text-center border-blue-600 rounded-md bg-blue-600 text-white hover:bg-white hover:text-gray-400"
                >
                    Edit Profile
                </button>
            }
            </div>
        </div>

        {/* right section */}
        <div className="col-span-10 row-span-11 bg-gray-50 p-5">
            {/* Basic information */}
            <div>
            <p className="text-[25px] font-medium">Basic Information</p>

            <div className="mt-4 flex gap-6 md:gap-10 flex-col md:flex-row">
                <div className="w-full md:w-1/2">
                <p className="font-medium text-lg">Birthdate :</p>
                {
                    isEdit 
                    ? <input 
                        className="max-w-40 bg-gray-100 rounded-lg" 
                        type="date" 
                        // onChange={(e) => setUserData(prev => ({...prev,DOB:e.target.value}))} 
                        value={userData.DOB}
                    />
                    : <p className="text-gray-500 font-medium border border-black rounded-lg p-2 mt-2 max-w-[300px] sm:max-w-[200px]">{userData.dob}</p>
                }
                </div>
                
                <div className="w-full md:w-1/2">
                <p className="font-medium text-lg">Gender :</p>
                {
                    isEdit 
                    ? <select className="max-w-20 bg-gray-100 rounded-lg" 
                    // onChange={(e) => setUserData(prev => ({...prev,gender:e.target.value}))} 
                    value={userData.gender}>
                        <option className="text-gray-500" value="Male">Male</option>
                        <option className="text-gray-500" value="Female">Female</option>
                    </select>
                    : <p className="text-gray-500 font-medium border border-black rounded-lg p-2 mt-2 max-w-[300px] sm:max-w-[200px]">
                        {userData.gender}
                    </p>
                }
                </div>
            </div>
            </div>

            {/* Contact Information */}
            <div className="mt-10">
            <p className="text-[25px] font-medium">Contact Information</p>

            <div className="mt-4 flex gap-6 md:gap-10 flex-col md:flex-row">
                <div className="w-full md:w-1/2">
                <p className="font-medium text-lg">Email :</p>
                <p className="text-gray-500 font-medium border border-black rounded-lg p-2 mt-2 max-w-[300px] sm:max-w-[200px]">
                    {userData.email}
                </p>
                </div>

                <div className="w-full md:w-1/2">
                <p className="font-medium text-lg">Phone:</p>
                {
                    isEdit 
                    ? <input 
                        className="bg-gray-100 max-w-52 rounded-lg"
                        type="phone"
                        name="phone"
                        // onChange={(e) => setUserData(prev => ({...prev,phone:e.target.value}))}
                        value={userData.phone}
                    />
                    : <p className="text-gray-500 font-medium border border-black rounded-lg p-2 mt-2 max-w-[300px] sm:max-w-[200px]">{userData.phone}</p>
                }
                </div>
            </div>

            <div className="mt-4">
                <p className="font-medium text-lg">Address :</p>
                {
                isEdit 
                ? <p>
                    <input 
                        className="bg-gray-100 max-w-60 rounded-lg"
                        type="text" 
                        // onChange={e => setUserData(prev => ({...prev,address:{...prev.address,line1: e.target.value}}))}
                        value={userData.address.line1}
                    />
                    <br />
                    <input 
                        className="bg-gray-100 max-w-60 rounded-lg mt-2"
                        type="text" 
                        // onChange={e => setUserData(prev => ({...prev,address:{...prev.address,line2: e.target.value}}))}
                        value={userData.address.line2}
                    />
                    </p>
                : <div className="text-gray-500 font-medium border border-black rounded-lg p-2 mt-2 w-[300px] sm:max-w-[200px]">
                    {/* <p>{userData.address.line1}</p>
                    <p>{userData.address.line2}</p> */}
                    </div>
                }
            </div>
            </div>
        </div>
        </div>

        )
    }

export default Profile