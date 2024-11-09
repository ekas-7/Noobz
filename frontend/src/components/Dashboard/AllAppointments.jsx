import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../pages/Layout.jsx";

function AllAppointments() {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    const day = dateArray[0];
    const monthIndex = Number(dateArray[1]);
    const year = dateArray[2];
    return `${day} ${months[monthIndex]} ${year}`;
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancelAppointment",
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (data.success) {
        toast.success(data.message);
        listAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const listAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/listAppointments",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        console.log("Couldn't find appointments");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const isTimeForVideoCall = (appointmentTime) => {
    const currentTime = new Date();
    const appointmentDate = new Date(appointmentTime);
    return currentTime >= appointmentDate;
  };

  useEffect(() => {
    if (token) listAppointments();
  }, [token]);

  return (
    <Layout>
      <div className="p-10 pt-4">
        <p className="mb-4 text-xl font-semibold text-gray-600">
          My Appointments
        </p>
        <hr className="mb-6 h-[2px] bg-gray-300" />

        <div className="max-h-[85vh] min-h-[60vh] space-y-6 overflow-y-scroll">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="gap-6 rounded-lg border border-gray-300 bg-white p-4 shadow-md transition-shadow hover:shadow-lg sm:flex"
            >
              <img
                className="h-40 w-full rounded-lg bg-[#C9D8FF] object-cover sm:w-40"
                src={item.docData.image}
                alt="Doctor"
              />

              <div className="flex w-full flex-col justify-between">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {item.docData.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.docData.speciality}
                  </p>

                  <p className="mt-4 font-semibold text-gray-700">Address:</p>
                  <p className="text-sm text-gray-500">
                    {item.docData.address.line1}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.docData.address.line2}
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <p className="font-semibold text-gray-700">Date & Time:</p>
                    <p className="text-sm text-gray-500">
                      {slotFormat(item.slotDate)} | {item.slotTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right side for buttons */}
              <div className="ml-6 flex flex-col items-center justify-center space-y-4">
                {!item.cancelled &&
                  isTimeForVideoCall(item.slotDate + " " + item.slotTime) && (
                    <button className="rounded border border-blue-500 bg-blue-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-peach">
                      Video Call Now
                    </button>
                  )}
                {!item.cancelled && (
                  <button className="rounded border border-green-500 bg-green-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600">
                    Pay Now
                  </button>
                )}
                {!item.cancelled && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="rounded border border-red-500 px-6 py-2 text-sm font-medium text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    Cancel Appointment
                  </button>
                )}
                {item.cancelled && (
                  <button className="cursor-not-allowed rounded border border-red-500 px-6 py-2 text-sm font-medium text-gray-500">
                    Appointment Cancelled
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default AllAppointments;
