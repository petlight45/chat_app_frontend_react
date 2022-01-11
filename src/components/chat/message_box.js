import {useContext, useState} from "react";
import {chatContext} from "./index";

import styled from 'styled-components';


const StyledButton = styled.button`
    outline: none;
    background-color:var(--custom-blue-2);
    color:#ffff;
    border-radius: 50px;
    padding: 0 2rem;
    
    
`

export const ChatMessageBox = () => {
    const {currentRoom, profile, socket, allUsers, pendingMessages, setPendingMessages} = useContext(chatContext)
    const [message, setMessage] = useState("")


    const handleSubmitMessage = () => {
        let newPendingMSGKey = Object.keys(pendingMessages).length;
        const data = {
            room_id: currentRoom,
            message: message,
            receiver: allUsers.find((x) => x?.roomID === currentRoom).id,
            pending_list_id: newPendingMSGKey
        }
        let tempPendingMessages = {...pendingMessages}
        tempPendingMessages[newPendingMSGKey] = message
        setPendingMessages(tempPendingMessages)
        socket.send(JSON.stringify({type: "room_message", data}))
    }

    return (
        <div>
            <form className="message-box px-md-3 px-1 py-3 d-flex w-100 header-bg">
                <div className="w-100 ">
                    <textarea className="message w-100 px-3 py-2 font-6" name="message"
                              placeholder="Type something and press Shift+Enter to send!" onChange={(e) => {
                        if (profile && socket && currentRoom) {
                            setMessage(e.target.value)
                        } else {
                            e.preventDefault()
                        }
                    }} onKeyPress={(e) => {
                        if (typeof e.shiftKey === "boolean" && e.shiftKey && e.charCode === 13 && message && profile && socket && currentRoom) {
                            e.preventDefault()
                            handleSubmitMessage()
                        }
                    }}></textarea>
                </div>
                <StyledButton onClick={(e)=>{
                    if (profile && socket && currentRoom && message) {
                        handleSubmitMessage()
                    } else {
                        e.preventDefault()
                    }
                }}>
                    Send
                </StyledButton>
            </form>
        </div>
    )
}