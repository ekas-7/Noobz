import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext.jsx';
import { assets } from '../../assets/assets_frontend/assets.js';
import { toast } from 'react-toastify';
import axios from 'axios';

function Profile() {
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(null); 
    const [buffer, setBuffer] = useState(null);



  

    const { backendUrl, userData, setUserData, token, loadUserProfileData } = useContext(AppContext);

    const pinataApiKey = import.meta.env.VITE_PINATA_API_KEY;  // Pinata API Key from env
    const pinataApiSecret = import.meta.env.VITE_PINATA_API_SECRET; // Pinata API Secret from env
    
    const pinataEndpoint = "https://api.pinata.cloud/pinning/pinFileToIPFS"; // Pinata API endpoint
   

    // Function to upload image to Pinata
    const uploadToPinata = async (imageFile) => {
        const formData = new FormData();
    formData.append('file', new Blob([buffer]));
        
        reader.onloadend = async () => {
            const buffer = new Uint8Array(reader.result);  // Convert the file to buffer if needed
            
            // Append the file to formData
            formData.append('file', imageFile);
    
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    pinata_api_key: pinataApiKey,
                    pinata_secret_api_key: pinataApiSecret,
                },
            };
    
            try {
                const response = await axios.post(pinataEndpoint, formData, config);
                return response.data.IpfsHash; // Returns the IPFS hash of the uploaded file
            } catch (error) {
                console.error("Error uploading to Pinata", error);
                toast.error("Error uploading image to Pinata");
                return null;
            }
        };
    
        // If you don't need the file buffer and just want to upload the file:
        // formData.append('file', imageFile);
        // Proceed with axios.post directly
    };
    
    
    const updateUserProfileData = async () => {
        try {
            // Prepare user data as a JSON object
            const profileData = {
                name: userData.name || '',
                phone: userData.phone || '',
                address: userData.address || {},
                gender: userData.gender || '',
                dob: userData.dob || '',
                image: userData.image, 
            };
            console.log(userData);
            // If a new image is selected, upload it to Pinata
            if (image) {
                const ipfsHash = await uploadToPinata(image);
                if (ipfsHash) {
                    userData.image = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
                }
            }
    
            console.log(userData)
            const { data } = await axios.put(
                `${backendUrl}/api/user/updateProfiledata`,
                userData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json', // Set content type as JSON
                    },
                }
            );
    
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
                            className="bg-gray-200 text-xl md:text-2xl text-center font-medium mt-4 rounded-lg border border-peach shadow-sm w-full"
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
                            className="w-full py-2 px-4 md:px-6 border border-peachrounded-md bg-peach text-black hover:bg-opacity-90 transition"
                        >
                            Save Information
                        </button>
                    ) : (
                        <button
                            onClick={handleEdit}
                            className="w-full py-2 px-4 md:px-6 border border-peachrounded-md bg-peach text-black hover:bg-opacity-90 transition"
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
                </div>
            </div>
        </div>
    );
}

export default Profile;
