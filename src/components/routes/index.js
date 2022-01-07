import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {isAuthenticated} from "../../conditions";
import {authRoutes} from "./auth";
import {chatRoutes} from "./chat";

export const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            {
                [...chatRoutes(), ...authRoutes()]
            }
        </Routes>
    </BrowserRouter>
)

