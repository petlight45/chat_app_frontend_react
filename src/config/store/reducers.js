import {
    FETCH_ALL_USERS_FAILED,
    FETCH_ALL_USERS_START,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_USER_PROFILE__SUCCESS,
    FETCH_USER_PROFILE_FAILED,
    FETCH_USER_PROFILE_START,
    SET_CURRENT_ROOM,
    SET_CURRENT_ROOM_MESSAGES,
    SET_CURRENT_ROOM_MESSAGES_EMPTY,
    SET_CURRENT_ROOM_MESSAGES_FETCH_ERROR
} from "./constants";

export const userProfileReducer = (state = {isFetchingProfile: null, profile: null}, {type, payload}) => {
    switch (type) {
        case FETCH_USER_PROFILE_START:
            return {
                ...state,
                isFetchingProfile: true
            }
        case FETCH_USER_PROFILE_FAILED:
            return {
                ...state,
                isFetchingProfile: false
            }
        case FETCH_USER_PROFILE__SUCCESS:
            return {
                profile: payload,
                isFetchingProfile: false
            }
        default:
            return state
    }
}


export const allUsersReducer = (state = {isFetchingAllUsers: null, allUsers: null}, {type, payload}) => {
    switch (type) {
        case FETCH_ALL_USERS_START:
            return {
                ...state,
                isFetchingAllUsers: true
            }
        case FETCH_ALL_USERS_FAILED:
            return {
                ...state,
                isFetchingAllUsers: false
            }
        case FETCH_ALL_USERS_SUCCESS:
            return {
                allUsers: payload,
                isFetchingAllUsers: false
            }
        default:
            return state
    }
}


export const chatReducer = (state = {
    currentRoom: null,
    currentRoomMessages: [],
    currentRoomMessagesFetchError: false
}, {type, payload}) => {
    switch (type) {
        case SET_CURRENT_ROOM:
            return {
                ...state,
                currentRoom: payload,
            }
        case SET_CURRENT_ROOM_MESSAGES:
            return {
                ...state,
                currentRoomMessages: payload,
                currentRoomMessagesFetchError: false,
            }

        case SET_CURRENT_ROOM_MESSAGES_FETCH_ERROR:
            return {
                ...state,
                currentRoomMessagesFetchError: true,
            }
        case SET_CURRENT_ROOM_MESSAGES_EMPTY:
            return {
                ...state,
                currentRoomMessages: [],
                currentRoomMessagesFetchError: false,
            }
        default:
            return state

    }
}