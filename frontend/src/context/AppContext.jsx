import { createContext, useDebugValue, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useFetcher } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [userData,setUserData] = useState(false);
    // const [token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWZjODQ0ZmQ1NmFlNWUwYzhiZDFmZSIsImlhdCI6MTczMTE0NDEyNn0.oCFHsyUfoGfjliw7Bn1764_Qfwkf1KC2sRtTIyyxbow'

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/getProfile', { headers: { token } });
            if (data.success) {
                setUserData(data.userData)
                console.log(data);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.message);
            console.log(err);
        }
    };

    const value = {
        backendUrl,
        userData,setUserData,loadUserProfileData,
    }

    useEffect(() => {
        loadUserProfileData();
    },[])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;