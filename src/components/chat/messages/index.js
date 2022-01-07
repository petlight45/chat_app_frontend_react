import {useContext} from "react";
import {chatContext} from "../index";
import {Message} from "./message";
import {
    MESSAGE_STATUS_NONE,
    MESSAGE_STATUS_PENDING,
    MESSAGE_STATUS_SENT, MESSAGE_STATUS_SENT_READ,
    MESSAGE_TYPE_RECEIVED,
    MESSAGE_TYPE_SENT
} from "../../../config/store/constants";

export const ChatMessages = () => {
    const {pendingMessages, currentRoomMessages, currentRoomMessagesFetchError, profile} = useContext(chatContext)
    return (
        profile ?
            <>
                {currentRoomMessages ? Object.keys(currentRoomMessages).map((key) => {
                    const item = currentRoomMessages[key]
                    return (
                        <Message
                            type={(profile?.owner?.id).toString() === item.sender ? MESSAGE_TYPE_SENT : MESSAGE_TYPE_RECEIVED}
                            status={item.receiver !== profile.owner.id.toString()?(item.isRead === "1" ? MESSAGE_STATUS_SENT_READ : MESSAGE_STATUS_SENT):MESSAGE_STATUS_NONE}
                            message={item.message} key={key} timestamp={item.timestamp} timeRead={item.timeRead}/>
                    )
                }) : null}
                {Object.keys(pendingMessages).map((key) => <Message type={MESSAGE_TYPE_SENT}
                                                                    status={MESSAGE_STATUS_PENDING}
                                                                    message={pendingMessages[key]} key={key}/>)}
                {currentRoomMessagesFetchError ?
                    <div className="mt-5 text-center text-white">Error in fetching new messages</div> : null}
            </>
            : null
    )
}