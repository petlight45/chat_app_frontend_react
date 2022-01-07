import axiosInstance from "../config/api/axios";

export const isGuest = async function () {
    const refresh_token = window.localStorage.getItem('refresh_token');
    const access_token = window.localStorage.getItem('access_token');
    if (refresh_token === null && access_token === null) {
        return true;
    } else {
        return await axiosInstance().post('/auth/refresh_token', {
            refresh: refresh_token
        }).then((response) => {
                const {refresh, access} = response.data;
                if (refresh && access) {
                    window.localStorage.setItem('access_token', access);
                    window.localStorage.setItem('refresh_token', refresh);
                    return false;
                } else {
                    return true;
                }
            }
        ).catch((err) => {
            return true
        })
    }
}


export const isAuthenticated = async function () {
    const refresh_token = window.localStorage.getItem('refresh_token');
    const access_token = window.localStorage.getItem('access_token');
    if (refresh_token === null || access_token === null) {
        return false;
    } else {
        return await axiosInstance().post('/auth/refresh_token', {
            refresh: refresh_token
        }).then((response) => {
                const {refresh, access} = response.data;
                if (refresh && access) {
                    window.localStorage.setItem('access_token', access);
                    window.localStorage.setItem('refresh_token', refresh);
                    return true;
                } else {
                    return false;
                }
            }
        ).catch((err) => {
            return false
        })
    }
}