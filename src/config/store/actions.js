import axiosInstance from "../api/axios";
import {
    FETCH_ALL_USERS_FAILED,
    FETCH_ALL_USERS_START, FETCH_ALL_USERS_SUCCESS,
    FETCH_USER_PROFILE__SUCCESS,
    FETCH_USER_PROFILE_FAILED,
    FETCH_USER_PROFILE_START, SET_CURRENT_ROOM_MESSAGES, SET_CURRENT_ROOM_MESSAGES_FETCH_ERROR
} from "./constants";
import _ from "lodash"

export const fetchUserProfile = (dispatch, getState) => {
    dispatch({type: FETCH_USER_PROFILE_START, payload: null})
    axiosInstance().get('chat/user/profile').then((response) => {
            dispatch({type: FETCH_USER_PROFILE__SUCCESS, payload: response.data})
        }
    ).catch((err) => {
        if (err.response && err.response.status === 401) {
            window.localStorage.removeItem('access_token');
            window.localStorage.removeItem('refresh_token');
        }
        dispatch({type: FETCH_USER_PROFILE_FAILED, payload: null})
    });
}


export const fetchAllUsers = (dispatch, userProfile) => {
    dispatch({type: FETCH_ALL_USERS_START, payload: null})
    axiosInstance().get('chat/user/all').then((response) => {
            let allUsers = response.data;
            allUsers = _.sortBy(allUsers, (x) => userProfile.room_config_timestamps[x.id] ? -1 * Number.parseFloat(userProfile.room_config_timestamps[x.id]) : -1)
            allUsers = allUsers.map((item) => ({roomID: userProfile.room_config[item.id], ...item}))
            console.log(allUsers)
            dispatch({type: FETCH_ALL_USERS_SUCCESS, payload: allUsers})
        }
    ).catch((err) => {
        dispatch({type: FETCH_ALL_USERS_FAILED, payload: null})
    });
}


export const fetchCurrentRoomMessages = (dispatch, currentRoom) => {
    axiosInstance().get(`chat/room/messages/${currentRoom}/`).then((response) => {
            dispatch({type: SET_CURRENT_ROOM_MESSAGES, payload: response.data.room_messages})
        }
    ).catch((err) => {
        dispatch({type: SET_CURRENT_ROOM_MESSAGES_FETCH_ERROR, payload: null})
    });
}