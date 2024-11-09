import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets_frontend/assets.js";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext.jsx";
import RelatedDoctors from "./RelatedDoctors.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import Layout from "../../pages/Layout.jsx";

function Appointments() {
  const { docId } = useParams();
  const [doc, setDoc] = useState({});
  const [docSlot, setDocSlot] = useState([]);
  const [slotIdx, setSlotIdx] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();

  // Find the doctor data by ID
  const findDoc = () => {
    const doctor = doctors.find((doc) => doc._id === docId);
    if (doctor) setDoc(doctor);
  };

  // Get available slots for the next 7 days
  const getAvailableSlots = async () => {
    setDocSlot([]);
    let today = new Date();
    let startHour = 10; // Starting hour for slots
    let endHour = 21; // Ending hour for slots

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      currentDate.setHours(startHour, 0, 0, 0);
      let timeSlots = [];

      while (currentDate.getHours() < endHour) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;
        const isSlotAvailable =
          !doc.slots_booked?.[slotDate]?.includes(formattedTime);

        if (isSlotAvailable) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlot((prev) => [...prev, timeSlots]);
    }
  };

  // Book appointment handler
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book an appointment");
      return navigate("/login");
    }
    try {
      const date = docSlot[slotIdx][0].dateTime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;
      const { data } = await axios.post(
        `${backendUrl}/api/user/bookAppointment`,
        { docId, slotDate, slotTime },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
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
    <Layout>
      <div className="flex flex-col justify-center gap-2 align-middle">
        <div className="flex w-full flex-col gap-2 px-4 sm:flex-row">
          {/* Doctor Image Section */}
          <div className="h-auto w-full flex-1 sm:w-[30vw] sm:max-w-[300px]">
            <img
              className="w-full rounded-lg bg-[#C9D8FF] object-cover sm:max-w-[1000px]"
              src={doc.image}
              alt=""
            />
          </div>

          {/* Doctor Information Section */}
          <div className="flex flex-1 flex-col rounded-lg border border-gray-400 p-8 py-7 sm:mx-0">
            <div className="flex items-center gap-3">
              <p className="text-3xl font-semibold text-gray-700">{doc.name}</p>
              <img src={assets.verified_icon} alt="Verified Icon" />
            </div>

            <div className="text-md mt-2 flex items-center gap-3 text-gray-500">
              <p>
                {doc.degree} - {doc.speciality}
              </p>
              <p className="rounded-full border border-gray-600 px-3 py-[1px]">
                {doc.experience} years
              </p>
            </div>

            <div className="mt-2 flex gap-2">
              <p>About</p>
              <img src={assets.info_icon} alt="Info Icon" />
            </div>

            <p className="text-md mt-1 text-gray-500">{doc.about}</p>

            <div className="mt-3 flex items-center">
              <p className="text-lg text-gray-600">Appointment fees:</p>
              <p className="ml-2">
                {currencySymbol}
                {doc.fees}
              </p>
            </div>
          </div>
        </div>

        {/* Slot Selection Section */}
        <div className="flex w-full flex-col gap-2 px-4 sm:flex-row">
          <div className="h-auto w-[30vw] max-w-[300px] flex-1"></div>

          <div className="mt-4 flex-1 flex-col sm:mx-0">
            <p className="text-md text-gray-500">Booking Slots</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {docSlot.length ? (
                docSlot.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center justify-center border border-gray-400 ${slotIdx === index ? "bg-peach text-white" : ""} w-[60px] cursor-pointer rounded-full px-3 py-6 text-[13px]`}
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

            <div className="mt-4 flex flex-wrap gap-2 overflow-x-auto">
              {docSlot[slotIdx]?.map((item, index) => (
                <p
                  key={index}
                  className={`flex items-center justify-center border border-gray-400 ${slotTime === item.time ? "bg-peach text-white" : ""} cursor-pointer rounded-full px-6 py-2 text-[13px]`}
                  onClick={() => setSlotTime(item.time)}
                >
                  {item.time}
                </p>
              ))}
            </div>

            {/* Book Appointment Button */}
            <div className="mt-4 flex justify-center sm:justify-normal">
              <button
                onClick={bookAppointment}
                className="w-[170px] cursor-pointer rounded-full bg-black p-2 text-white sm:w-[150px] md:w-[200px] lg:w-[250px]"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>

        <RelatedDoctors docId={docId} speciality={doc.speciality} />
      </div>
    </Layout>
  );
}

export default Appointments;
