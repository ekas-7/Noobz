import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { assets } from "../../assets/assets_frontend/assets.js";
import { toast } from "react-toastify";
import axios from "axios";
import Layout from "../../pages/Layout.jsx";

function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null); // Set default to null instead of false

  const { backendUrl, userData, setUserData, token, loadUserProfileData } =
    useContext(AppContext);

  const pinataApiKey = import.meta.env.VITE_PINATA_API_KEY; // Pinata API Key from env
  const pinataApiSecret = import.meta.env.VITE_PINATA_API_SECRET; // Pinata API Secret from env

  const pinataEndpoint = "https://api.pinata.cloud/pinning/pinFileToIPFS"; // Pinata API endpoint

  // Function to upload image to Pinata
  const uploadToPinata = async (imageFile) => {
    const formData = new FormData();

    // Append the file to formData
    formData.append("file", imageFile);

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

  const updateUserProfileData = async () => {
    try {
      // Prepare user data as a JSON object
      const profileData = {
        name: userData.name || "",
        phone: userData.phone || "",
        address: userData.address || {},
        gender: userData.gender || "",
        dob: userData.dob || "",
        image: userData.image, // Keep the existing image URL if no new image is provided
      };

      // If a new image is selected, upload it to Pinata
      if (image) {
        const ipfsHash = await uploadToPinata(image);
        if (ipfsHash) {
          profileData.image = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
        }
      }

      // Send the JSON payload instead of form data
      const { data } = await axios.post(
        `${backendUrl}/api/user/updateProfile`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Set content type as JSON
          },
        },
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
    <Layout>
      <div className="grid min-h-[80vh] grid-cols-12 gap-6 p-4 md:p-6">
        {/* Left Section */}
        <div className="col-span-12 flex flex-col items-center rounded-lg bg-gray-50 p-5 shadow-lg md:col-span-4 lg:col-span-3">
          <div className="flex flex-col items-center">
            <div className="relative cursor-pointer">
              {isEdit ? (
                <label htmlFor="image">
                  <div className="relative cursor-pointer">
                    <img
                      className="h-36 w-36 rounded-full object-cover md:h-32 md:w-32"
                      src={image ? URL.createObjectURL(image) : userData.image}
                      alt=""
                    />
                    {!image && (
                      <img
                        className="absolute bottom-2 right-2 h-8 w-8"
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
                  className="h-36 w-36 rounded-full object-cover md:h-32 md:w-32"
                  src={userData.image}
                  alt=""
                />
              )}
            </div>

            {/* Name */}
            {isEdit ? (
              <input
                className="mt-4 w-full rounded-lg border border-peach bg-gray-200 text-center text-xl font-medium shadow-sm md:text-2xl"
                type="text"
                name="name"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
                value={userData.name || ""}
              />
            ) : (
              <p className="mt-4 text-center text-xl font-medium md:text-2xl">
                {userData.name}
              </p>
            )}
          </div>

          {/* Save and Edit Button */}
          <div className="mt-4 flex w-full gap-4">
            {isEdit ? (
              <button
                onClick={updateUserProfileData}
                className="border-peachrounded-md w-full border bg-peach px-4 py-2 text-black transition hover:bg-opacity-90 md:px-6"
              >
                Save Information
              </button>
            ) : (
              <button
                onClick={handleEdit}
                className="border-peachrounded-md w-full border bg-peach px-4 py-2 text-black transition hover:bg-opacity-90 md:px-6"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-12 rounded-lg bg-gray-50 p-5 shadow-lg md:col-span-8 lg:col-span-9">
          {/* Basic Information */}
          <div className="mb-8">
            <p className="text-lg font-medium md:text-xl">Basic Information</p>

            <div className="mt-4 flex flex-col gap-4 md:flex-row md:gap-8">
              <div className="w-full md:w-1/2">
                <p className="text-lg font-medium">Birthdate :</p>
                {isEdit ? (
                  <input
                    type="date"
                    className="mt-2 w-full rounded-lg bg-gray-100 p-2"
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, dob: e.target.value }))
                    }
                    value={userData.dob || ""}
                  />
                ) : (
                  <p className="mt-2 rounded-lg border border-gray-300 p-2 font-medium text-gray-500">
                    {userData.dob}
                  </p>
                )}
              </div>

              <div className="w-full md:w-1/2">
                <p className="text-lg font-medium">Gender :</p>
                {isEdit ? (
                  <select
                    className="mt-2 w-full rounded-lg bg-gray-100 p-2"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    value={userData.gender || ""}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <p className="mt-2 rounded-lg border border-gray-300 p-2 font-medium text-gray-500">
                    {userData.gender}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <p className="text-lg font-medium md:text-xl">
              Contact Information
            </p>

            <div className="mt-4 flex flex-col gap-4 md:flex-row md:gap-8">
              <div className="w-full md:w-1/2">
                <p className="text-lg font-medium">Email :</p>
                <p className="mt-2 rounded-lg border border-gray-300 p-2 font-medium text-gray-500">
                  {userData.email}
                </p>
              </div>

              <div className="w-full md:w-1/2">
                <p className="text-lg font-medium">Phone :</p>
                {isEdit ? (
                  <input
                    type="text"
                    className="mt-2 w-full rounded-lg bg-gray-100 p-2"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    value={userData.phone || ""}
                  />
                ) : (
                  <p className="mt-2 rounded-lg border border-gray-300 p-2 font-medium text-gray-500">
                    {userData.phone}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
