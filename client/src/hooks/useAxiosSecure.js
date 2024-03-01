"use client";

import { UserContext } from '@/context/AuthContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';




export const axiosSecure = axios.create({
    baseURL: "https://wordify-server-v2.vercel.app",

});

const useAxiosSecure = () => {

    const { logOutUser } = useContext(UserContext);

    const router = useRouter();

    // Add a request interceptor
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem("access-token");
        if (token) {
            config.headers.authorization = `bearer ${token}`;
            return config;
        }
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.status === 401 || error.status === 403) {
            logOutUser();
            router.push("/login");
        }
        return Promise.reject(error);
    });





    return axiosSecure;
}

export default useAxiosSecure