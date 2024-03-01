"use client";

import useAxiosPublic from "@/hooks/useAxiosPublic";
import { createContext, useEffect, useState } from "react"

export const UserContext = createContext(null);

const AuthContext = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const axiosPublic = useAxiosPublic();



    //Create a new user
    const createUser = async (userData) => {
        setLoading(true);
        try {
            const result = await axiosPublic.post(`/api/register`, userData);
            if (result.data?.user) {
                setUser(result.data.user);
                //Save token to the local storage
                localStorage.setItem("access-token", result.data?.token);
                setLoading(false);
            }

            return result.data;
        }

        catch (error) {
            console.log(error.message);
        }
    }




    //Login a user
    const loginUser = async (userData) => {
        setLoading(true);
        try {
            const result = await axiosPublic.post(`/api/login`, userData);
            if (result.data?.userInfo) {
                setUser(result.data.userInfo);
                //Save token to the local storage
                localStorage.setItem("access-token", result.data?.token);
                setLoading(false);
            }

            return result.data;
        }
        catch (error) {
            console.log(error.message);
        }

    }


    //Log out user
    const logOutUser = () => {
        setLoading(true);
        setUser(null);
        localStorage.removeItem("access-token");
    }



    //Search for user after initial render
    useEffect(() => {
        const token = localStorage.getItem("access-token");
        if (token) {
            axiosPublic.post(`/api/user`, { token })
                .then(res => {
                    setUser(res.data)
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }

        setUser(null);


    }, []);


    const authValue = {
        user,
        loading,
        createUser,
        loginUser,
        logOutUser
    }

    return <UserContext.Provider value={authValue}>
        {children}
    </UserContext.Provider>



}

export default AuthContext