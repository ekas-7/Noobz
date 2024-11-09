import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Layout from "../../pages/Layout";

function AllDoctors() {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setfilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setfilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setfilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <Layout>
      <div className="p-10 pt-4">
        <p className="text-[18px] text-gray-600">
          Browse through the doctors specialist.
        </p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <div>
            <button
              className={`inline-block rounded border px-3 py-1 text-sm transition-all sm:hidden ${showFilter ? "bg-primary text-white" : ""}`}
              onClick={() => setShowFilter((prev) => !prev)}
            >
              Filters
            </button>
          </div>

          <div className={`${showFilter ? "" : "hidden"} sm:block`}>
            <p
              onClick={() =>
                speciality === "Medical Dermatology"
                  ? navigate("/all-doctors")
                  : navigate("/all-doctors/Medical Dermatology")
              }
              className={`mb-2 cursor-pointer rounded-lg border border-gray-300 p-2 lg:w-[200px] ${speciality === "Medical Dermatology" ? "bg-[#C9D8FF]" : ""}`}
            >
              Medical Dermatology
            </p>

            <p
              onClick={() =>
                speciality === "Pediatric Dermatology"
                  ? navigate("/all-doctors")
                  : navigate("/all-doctors/Pediatric Dermatology")
              }
              className={`mb-2 cursor-pointer rounded-lg border border-gray-300 p-2 lg:w-[200px] ${speciality === "Pediatric Dermatology" ? "bg-[#C9D8FF]" : ""}`}
            >
              Pediatric Dermatology
            </p>

            <p
              onClick={() =>
                speciality === "Cosmetic Dermatology"
                  ? navigate("/all-doctors")
                  : navigate("/all-doctors/Cosmetic Dermatology")
              }
              className={`mb-2 cursor-pointer rounded-lg border border-gray-300 p-2 lg:w-[200px] ${speciality === "Cosmetic Dermatology" ? "bg-[#C9D8FF]" : ""}`}
            >
              Cosmetic Dermatology
            </p>

            <p
              onClick={() =>
                speciality === "Mohs Surgery"
                  ? navigate("/all-doctors")
                  : navigate("/all-doctors/Mohs Surgery")
              }
              className={`mb-2 cursor-pointer rounded-lg border border-gray-300 p-2 lg:w-[200px] ${speciality === "Mohs Surgery" ? "bg-[#C9D8FF]" : ""}`}
            >
              Mohs Surgery
            </p>

            <p
              onClick={() =>
                speciality === "Immunodermatology"
                  ? navigate("/all-doctors")
                  : navigate("/all-doctors/Immunodermatology")
              }
              className={`mb-2 cursor-pointer rounded-lg border border-gray-300 p-2 lg:w-[200px] ${speciality === "Immunodermatology" ? "bg-[#C9D8FF]" : ""}`}
            >
              Immunodermatology
            </p>

            <p
              onClick={() =>
                speciality === "Teledermatology"
                  ? navigate("/all-doctors")
                  : navigate("/all-doctors/Teledermatology")
              }
              className={`mb-2 cursor-pointer rounded-lg border border-gray-300 p-2 lg:w-[200px] ${speciality === "Teledermatology" ? "bg-[#C9D8FF]" : ""}`}
            >
              Teledermatology
            </p>
          </div>

          <div className="grid max-h-[88vh] w-full grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4 gap-y-6 overflow-y-scroll">
            {filterDoc.map((item, index) => (
              <div
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="cursor-pointer rounded-lg border border-[#C9D8FF] transition-all duration-500 hover:translate-y-[-10px]"
              >
                <img
                  src={item.image}
                  alt=""
                  className="w-full rounded-lg bg-[#C9D8FF] object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-[5px] w-[5px] ${item.available ? "bg-green-500" : "bg-red-500"} rounded-full`}
                    ></div>
                    <p
                      className={`text-[10px] ${item.available ? "text-green-500" : "text-red-500"} `}
                    >
                      {item.available ? "Available" : "Not Available"}
                    </p>
                  </div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-[10px] text-gray-800">{item.speciality}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AllDoctors;
