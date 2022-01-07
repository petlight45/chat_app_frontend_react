import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {AlertTitle} from "./components/AlertTitle";
import styled from 'styled-components'

const MessageBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items:center
`

const fireMessageAlert = (title, message) => {
    const MySwal = withReactContent(Swal)
    const alertContent = (
        <div style={{fontSize: "0.9rem", textAlign:"left"}}>
            <MessageBody dangerouslySetInnerHTML={{ __html: message }} />
        </div>
    )
    MySwal.fire({
        title: <AlertTitle>{title}</AlertTitle>,
        html: alertContent,
        showConfirmButton: false
    })
}

export default fireMessageAlert;