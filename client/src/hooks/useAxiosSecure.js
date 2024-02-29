import axios from 'axios';




export const axiosSecure = axios.create({
    baseURL: "http://localhost:9000",

});

const useAxiosSecure = () => {

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
            console.log(error)
        }
        return Promise.reject(error);
    });





    return axiosSecure;
}

export default useAxiosSecure