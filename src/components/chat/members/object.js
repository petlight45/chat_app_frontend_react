import {useContext, useEffect, useState} from "react";
import {chatContext} from "../index";
import noPiturePlaceHolder from '../../static/no_picture.jpg';
import axiosInstance from "../../../config/api/axios";
import {
    FETCH_ALL_USERS_FAILED,
    FETCH_ALL_USERS_SUCCESS,
    SET_CURRENT_ROOM,
    SET_CURRENT_ROOM_MESSAGES, SET_CURRENT_ROOM_MESSAGES_FETCH_ERROR
} from "../../../config/store/constants";
import {useDispatch} from "react-redux";
import moment from "moment";

export const ChatMember = ({user}) => {
    const dispatch = useDispatch()
    const {currentRoom, socket, onlineUsers, currentRoomMessages} = useContext(chatContext)
    const [unreadMessagesCount, setUnreadMessagesCount] = useState(null)
    const [lastSeen, setLastSeen] = useState(null)

    const handleOnClick = (e) => {
        if (user.roomID) {
            dispatch({type: SET_CURRENT_ROOM, payload: user.roomID})
        } else {
            axiosInstance().post('chat/user/room/create', {user_id: user.id}).then((response) => {
                    let roomName = response.data;
                    dispatch({type: SET_CURRENT_ROOM, payload: roomName})
                }
            ).catch((err) => {
                dispatch({type: SET_CURRENT_ROOM, payload: null})
            });

        }
    }

    useEffect(() => {
        if (!(onlineUsers.includes(user.id))) {
            axiosInstance().get(`/chat/user/get/last_seen/${user.id}/`).then((response) => {
                    const {last_seen} = response.data
                    setLastSeen(last_seen)
                }
            )
        }
    }, [user, onlineUsers])

    useEffect(() => {
        if (user?.roomID === currentRoom && socket) {
            const data = {
                room_id: currentRoom
            }
            socket.send(JSON.stringify({type: "join_group", data}))
            axiosInstance().get(`chat/room/messages/unread_count/${user.roomID}/`).then((response) => {
                    const {count} = response.data;
                    if (count > 0) {
                        axiosInstance().put(`chat/room/messages/read/all/${user.roomID}/`).then((response) => {
                                setUnreadMessagesCount(0)
                                socket.send(JSON.stringify({
                                    type: "room_messages_read",
                                    data: {
                                        room_id: currentRoom
                                    }
                                }))
                            }
                        )
                    }
                }
            ).catch((err) => {
                setUnreadMessagesCount(null)
            });
        }
    }, [user, currentRoom, socket])

    useEffect(() => {
        if (user?.roomID === currentRoom && socket) {
            axiosInstance().get(`chat/room/messages/unread_count/${user.roomID}/`).then((response) => {
                    const {count} = response.data;
                    if (count > 0) {
                        axiosInstance().put(`chat/room/messages/read/all/${user.roomID}/`).then((response) => {
                                setUnreadMessagesCount(0)
                                socket.send(JSON.stringify({
                                    type: "room_messages_read",
                                    data: {
                                        room_id: currentRoom
                                    }
                                }))
                            }
                        )
                    }
                }
            ).catch((err) => {
                setUnreadMessagesCount(null)
            });

        }
    }, [currentRoomMessages])

    useEffect(() => {
        if (user?.roomID) {
            axiosInstance().get(`chat/room/messages/unread_count/${user.roomID}/`).then((response) => {
                    const {count} = response.data;
                    setUnreadMessagesCount(count)
                }
            ).catch((err) => {
                setUnreadMessagesCount(null)
            });
        }
    }, [user])

    return (
        <div
            className={`px-3 my-3 py-2 member-bg d-flex position-relative ${currentRoom === user.roomID ? "active" : null}`}
            onClick={handleOnClick}>
            <figure className="member-img my-0 py-0 position-relative ">
                <img src={user?.profile?.picture || noPiturePlaceHolder} alt="NA"/>
                <span className={`marker ${onlineUsers.includes(user.id) ? 'online' : 'offline'}-marker`}></span>
            </figure>
            <div className="px-2 mt-2 d-flex flex-column text-white ">
                <div className="font-4 ">{user.username}</div>
                <div
                    className="font-7 mt-1 custom-mute">{onlineUsers.includes(user.id) ? 'online' : lastSeen ? "Last seen " + moment(lastSeen).calendar() : "offline"}</div>
            </div>
            <div
                className="d-flex flex-grow-1 height-100 flex-direction-column justify-content-end align-items-end text-danger font-weight-bold">
                {unreadMessagesCount ? unreadMessagesCount : null}
            </div>
        </div>

    )
}


// <div className="px-3 my-3 py-2 member-bg d-flex position-relative">
//     <figure className="member-img my-0 py-0 position-relative ">
//         <img src="" alt="NA"/>
//         <span className="marker offline-marker"></span>
//     </figure>
//     <div className="px-2 mt-2 d-flex flex-column text-white ">
//         <div className="font-4 ">John</div>
//         <div className="font-5 mt-1 custom-mute">offline</div>
//     </div>
// </div>