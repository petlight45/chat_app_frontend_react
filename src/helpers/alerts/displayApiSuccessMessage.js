import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {getAPISuccessMessage} from "../api/readAPIMessage";
import {AlertTitle} from "./components/AlertTitle";
import {AlertContent} from "./components/AlertContent";

const displayApiSuccessMessage = (responseData, renderDirectly) => {
    const MySwal = withReactContent(Swal)
    let message = getAPISuccessMessage(responseData)
    let alertContent;
    if (typeof renderDirectly === "boolean" && renderDirectly) {
        alertContent = (
            <AlertContent>
                {responseData}
            </AlertContent>
        )
    } else {
        alertContent = (
            <AlertContent>
                {<div dangerouslySetInnerHTML={{__html: message}}/>}
            </AlertContent>
        )
    }
    MySwal.fire({
        title: <AlertTitle>Success Notification</AlertTitle>,
        html: alertContent,
        showConfirmButton: false
    })
}

export default displayApiSuccessMessage;