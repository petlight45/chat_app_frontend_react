import {useContext} from "react";
import {chatContext} from "./index";
import {Spinner} from "../global/Spinner";
import noPiturePlaceHolder from '../static/no_picture.jpg';

export const ChatAdmin = () => {
    const {profile, isFetchingProfile} = useContext(chatContext)
    return (
        profile ?
            <div className="d-flex flex-column align-items-center">
                <figure className="member-img my-0 py-0 position-relative ">
                    <img src={profile.owner?.profile?.picture || noPiturePlaceHolder} alt="na"/>
                </figure>
                <div className="px-2 mt-2 d-flex flex-column text-white ">
                    <div className="font-4 ">{profile.owner.username}</div>
                </div>
            </div>
            : (isFetchingProfile) ? <Spinner size={1}/> : <div className="text-center text-danger">Error</div>
    )
}