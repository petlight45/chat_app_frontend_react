import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {AlertTitle} from "./components/AlertTitle";
import {AlertContent} from "./components/AlertContent";


export const fireDeleteConfirmAlert = (title = "Confirm Delete") => {
    const MySwal = withReactContent(Swal)
    const alertContent = (
        <AlertContent>
            This process is irreversible, proceed anyway?
        </AlertContent>
    )
    return MySwal.fire({
        title: <AlertTitle>{title}</AlertTitle>,
        html: alertContent,
        showConfirmButton: true
    })
}