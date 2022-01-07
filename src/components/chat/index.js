import '../../styles/message.css'
import {ChatMembers} from "./members";
import {ChatTitle} from "./title";
import {ChatAdmin} from "./admin";
import {ChatMessages} from "./messages";
import {ChatMessageBox} from "./message_box";
import {useDispatch, useSelector} from "react-redux";
import {createContext, useEffect, useRef, useState} from "react";
import {fetchAllUsers, fetchCurrentRoomMessages, fetchUserProfile} from "../../config/store/actions";
import {chatReducer} from "../../config/store/reducers";
import {SET_CURRENT_ROOM_MESSAGES, SET_CURRENT_ROOM_MESSAGES_EMPTY} from "../../config/store/constants";
import {Link} from "react-router-dom";

export const chatContext = createContext({
    isFetchingProfile: null,
    profile: null,
    isFetchingAllUsers: null,
    allUsers: null,
    currentRoom: null,
    socket: null,
    onlineUsers: [],
    pendingMessages: {}
})

export const ChatContainer = () => {
    const {isFetchingProfile, profile} = useSelector((reducer) => reducer.userProfileReducer)
    const {isFetchingAllUsers, allUsers} = useSelector((reducer) => reducer.allUsersReducer)
    const {currentRoom, currentRoomMessages, currentRoomMessagesFetchError} = useSelector((reducer) => reducer.chatReducer)
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [pendingMessages, setPendingMessages] = useState({})
    const chatSocket = useRef(null)
    const [sentFirstRoomMessage, setSentFirstRoomMessage] = useState(false)
    const rendered = useRef(false)
    const dispatch = useDispatch()

    const getMessageBody = () => {
        if (!socket) {
            if (rendered.current) {
                return (
                    <h6 className="text-center mt-5 text-white">Unable to connect to chat server</h6>
                )
            } else {
                rendered.current = true;
                return (
                    <h6 className="text-center mt-5 text-white">Connecting to chat server</h6>
                )
            }
        } else if (!currentRoom) {
            return (
                <h5 className="text-center mt-5 text-white">Welcome, Click on a member to chat with</h5>
            )
        } else if (!profile && isFetchingProfile) {
            return (
                <h6 className="text-center mt-5 text-white">Loading .....</h6>
            )
        } else if (!profile && !isFetchingProfile) {
            return (
                null
            )
        } else {
            return (
                <ChatMessages/>
            )
        }
    }
    const initSocket = (socket_) => {
        socket_.onopen = function (e) {
            console.log("Socket Connected")
            setSocket(chatSocket.current)
        }

        socket_.onclose = function (e) {
            setSocket(null)
        }

        socket_.onmessage = function (e) {
            /// possible types (room_message, user_online_notification, user_offline_notification)
            /// room_message {room_id, message, messageID, sender}
            const {type, data} = JSON.parse(e.data)
            switch (type) {
                case "room_message_success":
                    const {room_id, sender, receiver, pending_list_id} = data;
                    if (room_id === currentRoom) {
                        const tempPendingMessages = {...pendingMessages}
                        delete tempPendingMessages[pending_list_id]
                        setPendingMessages(tempPendingMessages)
                        dispatch((dispatch_, getState) => fetchCurrentRoomMessages(dispatch_, currentRoom))
                    }
                    break
                case "sent_first_room_message":
                    if (data.room_id === currentRoom) {
                        setSentFirstRoomMessage(true)
                    }
                    break
                case "room_message_failed":
                    console.log(data)
                    break
                case "new_message_broadcast":
                    if (currentRoom === data.room_id) {
                        socket.send(JSON.stringify({
                            type: "room_messages_read",
                            data: {
                                room_id: currentRoom
                            }
                        }))
                    }
                    dispatch((dispatch_, getState) => fetchAllUsers(dispatch_, profile))
                    break
                case "join_group_success":
                    dispatch((dispatch_, getState) => fetchCurrentRoomMessages(dispatch_, data.room_id))
                    break
                case "room_messages_read_success":
                    if (data.sender.toString() !== profile.owner.id.toString()) {
                        dispatch((dispatch_, getState) => fetchCurrentRoomMessages(dispatch_, data.room_id))
                    }
                    break
                case "online_users_notification":
                    setOnlineUsers(data)
                    break
                default:
                    break
            }
            console.log(type, data)
        }
    }

    useEffect(() => {
        chatSocket.current = new WebSocket(
            'ws://127.0.0.1:8000/ws/chat/' + "?token=" + window.localStorage.getItem('access_token')
        );
        initSocket(chatSocket.current)

        return () => {
            chatSocket.current.close()
        }
    }, [])

    useEffect(() => {
        if (chatSocket.current) {
            initSocket(chatSocket.current)
        }

    }, [currentRoom, pendingMessages])

    useEffect(() => {
        if (sentFirstRoomMessage) {
            setTimeout(() => {
                dispatch((dispatch_, getState) => fetchAllUsers(dispatch_, profile))
            }, 5000)
        }
    }, [sentFirstRoomMessage])

    useEffect(() => {
        dispatch({type: SET_CURRENT_ROOM_MESSAGES_EMPTY, payload: null})
        dispatch(fetchUserProfile)
        setPendingMessages({})
        setSentFirstRoomMessage(false)
    }, [currentRoom])

    useEffect(() => {
        if (currentRoom) {
            let elem = document.getElementById("chatMessagesWrapper")
            elem.scrollTo(0, elem.scrollHeight)
        }
    }, [pendingMessages, currentRoomMessages])

    useEffect(() => {
        if (typeof isFetchingProfile === "boolean" && !isFetchingProfile) {
            dispatch((dispatch_, getState) => fetchAllUsers(dispatch_, profile))
        }
    }, [isFetchingProfile])


    return (
        <chatContext.Provider value={{
            isFetchingProfile,
            profile,
            isFetchingAllUsers,
            allUsers,
            currentRoom,
            socket,
            onlineUsers,
            pendingMessages,
            setPendingMessages,
            currentRoomMessages,
            currentRoomMessagesFetchError
        }}>
            <div className="">
                <div className="d-flex full-height">
                    <div className="chat-members h-100 flex-column pb-3 header-bg d-none d-sm-flex">
                        <div className=" members-header header-bg ">
                            <div className="px-3 py-3 text-white ">
                                <span className="font-1 ">Chat Members</span>
                            </div>
                        </div>
                        <div className="members-body body-bg flex-grow-1 ">
                            <ChatMembers/>
                        </div>
                    </div>
                    <div className="flex-grow-1 chat-body-wrapper h-100 d-flex flex-column ">
                        <div className="chat-body-header header-bg ">
                            <div className=" members-header header-bg-2 d-flex justify-content-between">
                                <ChatTitle/>
                                <div className="px-3 py-3 text-white d-flex flex-column align-items-center">
                                    <ChatAdmin/>
                                    <Link to={"/logout"} className="text-decoration-none"><small>Logout</small></Link>
                                </div>
                            </div>
                        </div>
                        <div className="chat-body flex-grow-1 body-bg position-relative d-flex flex-column ">
                            <div className="chat-messages flex-grow-1 h-100 p-3" id={"chatMessagesWrapper"}>
                                {getMessageBody()}
                            </div>
                        </div>
                        <ChatMessageBox/>
                    </div>
                </div>
            </div>
        </chatContext.Provider>
    )
}