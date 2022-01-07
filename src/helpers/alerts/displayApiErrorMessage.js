import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {getExternalAPIErrorMessage, getServerAPIErrorMessage} from "../api/readAPIMessage";
import {AlertTitle} from "./components/AlertTitle";
import {AlertContent} from "./components/AlertContent";
import {ERROR_MODE_SERVER} from "../../config/store/constants";

export const displayApiErrorMessage = (error, mode = ERROR_MODE_SERVER) => {
    const MySwal = withReactContent(Swal)
    let message;
    if (mode === ERROR_MODE_SERVER) {
        message = getServerAPIErrorMessage(error)
    } else {
        message = getExternalAPIErrorMessage(error)
    }
    let alertContent = (
        <AlertContent>
            <div dangerouslySetInnerHTML={{ __html: message }} />
        </AlertContent>
    )
    MySwal.fire({
        title: <AlertTitle>Error Notification</AlertTitle>,
        html: alertContent,
        showConfirmButton: false
    })
}