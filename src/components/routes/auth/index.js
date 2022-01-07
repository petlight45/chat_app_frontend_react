import {isAuthenticated, isGuest} from "../../../conditions";
import {Route} from "react-router-dom";
import {ProtectedRouteComponent} from "../protected_routes";
import {LoginContainer} from "../../auth/login";
import LogoutContainer from "../../auth/logout";
import {RegisterContainer} from "../../auth/register";

export const authRoutes = () => (
    [
        <Route path="/login" exact={true} element={<ProtectedRouteComponent conditions={[isGuest]}
                                                                            elementToRenderOnPass={
                                                                                <LoginContainer/>}
                                                                            redirectToOnFail={'/'}/>}/>,
        <Route path="/register" exact={true} element={<ProtectedRouteComponent conditions={[isGuest]}
                                                                               elementToRenderOnPass={
                                                                                   <RegisterContainer/>}
                                                                               redirectToOnFail={'/'}/>}/>,
        <Route path="/logout" exact={true} element={<ProtectedRouteComponent conditions={[isAuthenticated]}
                                                                             elementToRenderOnPass={
                                                                                 <LogoutContainer/>}
                                                                             redirectToOnFail={'/login'}/>}/>

    ]
)