import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";

function Data() {
  const { userData } = useContext(AppContext);

  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      <div className="flex items-center mb-8">
        <span className="text-2xl font-bold text-charcoal">Aurea</span>
      </div>

      <img
        className="h-[120px] rounded-full sm:w-[120px]"
        src={userData.image}
        alt=""
      />

      <p className="text-xl font-semibold">{userData.name}</p>
    </div>
  );
}

export default Data;
