import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {AlertTitle} from "./components/AlertTitle";



const fireSuccessAlert = (title = "Notification") => {
    const MySwal = withReactContent(Swal)
    const alertContent = (
        <div id="text-center d-flex align-items-center justify-content-center">
            <p>Success</p>
        </div>
    )
    MySwal.fire({
        title: <AlertTitle>{title}</AlertTitle>,
        html: alertContent,
        showConfirmButton: false
    })
}

export default fireSuccessAlert;