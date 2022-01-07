import axios from 'axios';


const axiosInstance = (contentDisposition = null) => {
    // console.log(window.localStorage.getItem('access_token') ? `Bearer ${window.localStorage.getItem('access_token')}` : null)
    const axiosInst = axios.create({
        baseURL: process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_MAIN_SERVER_URL_PRODUCTION}/api` : `${process.env.REACT_APP_MAIN_SERVER_URL_DEVELOPMENT}/api`,
        timeout: 10000,
        headers: {
            Authorization: window.localStorage.getItem('access_token') ? `Bearer ${window.localStorage.getItem('access_token')}` : null,
            'Content-Type': 'application/json',
            accept: 'application/json'
        }
    });

    axiosInst.interceptors.response.use(
        (response) => { // Any status code from range of 2xx
            // Do something with response data
            return response;
        },
        (error) => { // Any status codes outside range of 2xx
            // Do something with response error
            return Promise.reject(error);
        });

    return axiosInst;
}

export default axiosInstance;