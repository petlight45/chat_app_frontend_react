import {useContext} from "react";
import {chatContext} from "./index";

export const ChatTitle = () => {
    const {currentRoomMessages, currentRoom} = useContext(chatContext)
    return (
        currentRoom?
        <div className="px-3 py-3 text-white d-flex flex-column">
            <div className="font-3 mt-2 ">{Object.keys(currentRoomMessages).length} Messages</div>
        </div>:null
    )
}