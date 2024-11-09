import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext.jsx';
import { assets } from '../../assets/assets_frontend/assets.js';
import { toast } from 'react-toastify';
import axios from 'axios';

function Profile() {
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(false);

    const { backendUrl, userData, setUserData, token, loadUserProfileData } = useContext(AppContext);

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();

            formData.append('name', userData.name || '');
            formData.append('phone', userData.phone || '');
            formData.append('address', JSON.stringify(userData.address || {}));
            formData.append('gender', userData.gender || '');
            formData.append('dob', userData.dob || '');

            image && formData.append('image', image);

            const { data } = await axios.post(`${backendUrl}/api/user/updateProfile`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (data.success) {
                toast.success(data.message);
                await loadUserProfileData();
                setIsEdit(false);
                setImage(false);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    };

    const handleEdit = () => setIsEdit(!isEdit);

    return (
        <div className="grid grid-cols-12 gap-6 p-4 md:p-6 min-h-[80vh]">
            {/* Left Section */}
            <div className="col-span-12 md:col-span-4 lg:col-span-3 bg-gray-50 p-5 flex flex-col items-center rounded-lg shadow-lg">
                <div className="flex flex-col items-center">
                    <div className="relative cursor-pointer">
                        {isEdit ? (
                            <label htmlFor="image">
                                <div className="relative cursor-pointer">
                                    <img
                                        className="w-36 h-36 md:w-32 md:h-32 rounded-full object-cover"
                                        src={image ? URL.createObjectURL(image) : userData.image}
                                        alt=""
                                    />
                                    {!image && (
                                        <img
                                            className="absolute bottom-2 right-2 w-8 h-8"
                                            src={assets.upload_icon}
                                            alt=""
                                        />
                                    )}
                                </div>
                                <input
                                    type="file"
                                    id="image"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    hidden
                                />
                            </label>
                        ) : (
                            <img
                                className="w-36 h-36 md:w-32 md:h-32 rounded-full object-cover"
                                src={userData.image}
                                alt=""
                            />
                        )}
                    </div>

                    {/* Name */}
                    {isEdit ? (
                        <input
                            className="bg-gray-200 text-xl md:text-2xl text-center font-medium mt-4 rounded-lg border border-blue-400 shadow-sm w-full"
                            type="text"
                            name="name"
                            onChange={(e) =>
                                setUserData((prev) => ({ ...prev, name: e.target.value }))
                            }
                            value={userData.name || ''}
                        />
                    ) : (
                        <p className="text-xl md:text-2xl mt-4 text-center font-medium">
                            {userData.name}
                        </p>
                    )}
                </div>

                {/* Save and Edit Button */}
                <div className="flex gap-4 mt-4 w-full">
                    {isEdit ? (
                        <button
                            onClick={updateUserProfileData}
                            className="w-full py-2 px-4 md:px-6 border border-blue-600 rounded-md bg-blue-600 text-white hover:bg-white hover:text-gray-400 transition"
                        >
                            Save Information
                        </button>
                    ) : (
                        <button
                            onClick={handleEdit}
                            className="w-full py-2 px-4 md:px-6 border border-blue-600 rounded-md bg-blue-600 text-white hover:bg-white hover:text-gray-400 transition"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>

            {/* Right Section */}
            <div className="col-span-12 md:col-span-8 lg:col-span-9 bg-gray-50 p-5 rounded-lg shadow-lg">
                {/* Basic Information */}
                <div className="mb-8">
                    <p className="text-lg md:text-xl font-medium">Basic Information</p>

                    <div className="mt-4 flex flex-col md:flex-row gap-4 md:gap-8">
                        <div className="w-full md:w-1/2">
                            <p className="font-medium text-lg">Birthdate :</p>
                            {isEdit ? (
                                <input
                                    type="date"
                                    className="w-full p-2 bg-gray-100 rounded-lg mt-2"
                                    onChange={(e) =>
                                        setUserData((prev) => ({ ...prev, dob: e.target.value }))
                                    }
                                    value={userData.dob || ''}
                                />
                            ) : (
                                <p className="text-gray-500 font-medium border border-gray-300 rounded-lg p-2 mt-2">
                                    {userData.dob}
                                </p>
                            )}
                        </div>

                        <div className="w-full md:w-1/2">
                            <p className="font-medium text-lg">Gender :</p>
                            {isEdit ? (
                                <select
                                    className="w-full p-2 bg-gray-100 rounded-lg mt-2"
                                    onChange={(e) =>
                                        setUserData((prev) => ({ ...prev, gender: e.target.value }))
                                    }
                                    value={userData.gender || ''}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            ) : (
                                <p className="text-gray-500 font-medium border border-gray-300 rounded-lg p-2 mt-2">
                                    {userData.gender}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div>
                    <p className="text-lg md:text-xl font-medium">Contact Information</p>

                    <div className="mt-4 flex flex-col md:flex-row gap-4 md:gap-8">
                        <div className="w-full md:w-1/2">
                            <p className="font-medium text-lg">Email :</p>
                            <p className="text-gray-500 font-medium border border-gray-300 rounded-lg p-2 mt-2">
                                {userData.email}
                            </p>
                        </div>

                        <div className="w-full md:w-1/2">
                            <p className="font-medium text-lg">Phone :</p>
                            {isEdit ? (
                                <input
                                    type="text"
                                    className="w-full p-2 bg-gray-100 rounded-lg mt-2"
                                    onChange={(e) =>
                                        setUserData((prev) => ({ ...prev, phone: e.target.value }))
                                    }
                                    value={userData.phone || ''}
                                />
                            ) : (
                                <p className="text-gray-500 font-medium border border-gray-300 rounded-lg p-2 mt-2">
                                    {userData.phone}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="font-medium text-lg">Address :</p>
                        {isEdit ? (
                            <>
                                <input
                                    className="w-full p-2 bg-gray-100 rounded-lg mt-2"
                                    type="text"
                                    onChange={(e) =>
                                        setUserData((prev) => ({
                                            ...prev,
                                            address: { ...prev.address, line1: e.target.value },
                                        }))
                                    }
                                    value={userData.address?.line1 || ''}
                                />
                                <input
                                    className="w-full p-2 bg-gray-100 rounded-lg mt-2"
                                    type="text"
                                    onChange={(e) =>
                                        setUserData((prev) => ({
                                            ...prev,
                                            address: { ...prev.address, line2: e.target.value },
                                        }))
                                    }
                                    value={userData.address?.line2 || ''}
                                />
                            </>
                        ) : (
                            <div className="text-gray-500 font-medium border border-gray-300 rounded-lg p-2 mt-2">
                                <p>{userData.address?.line1}</p>
                                <p>{userData.address?.line2}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
