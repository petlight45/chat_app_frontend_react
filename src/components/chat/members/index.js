import {useContext} from "react";
import {chatContext} from "../index";
import {Spinner} from "../../global/Spinner";
import {ChatMember} from "./object";

export const ChatMembers = () => {
    const {allUsers, isFetchingAllUsers} = useContext(chatContext)
    return (
        allUsers ? allUsers.map(user => <ChatMember user={user}/>) :
            (
                isFetchingAllUsers ? <Spinner size={1.0}/> : <span class="text-danger">Error</span>
            )

    )
}