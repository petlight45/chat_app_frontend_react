import {isAuthenticated} from "../../../conditions";
import {Route} from "react-router-dom";
import {ProtectedRouteComponent} from "../protected_routes";
import {ChatContainer} from "../../chat";

export const chatRoutes = () => (
    [
        <Route path="/" exact={true} element={<ProtectedRouteComponent conditions={[isAuthenticated]}
                                                                       elementToRenderOnPass={
                                                                           <ChatContainer/>}
                                                                       redirectToOnFail={'/login'}/>}/>
    ]
)