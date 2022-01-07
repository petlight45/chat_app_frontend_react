import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import styled from 'styled-components';
import {AlertTitle} from "./components/AlertTitle";


const Spinner = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .loader{
        border: 5px solid #f3f3f3; /* Light grey */
        border-top: 5px solid #3498db; /* Blue */
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 0.5s linear infinite;
        margin: 50px 0;
    }
    
    @keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`


const fireSpinnerAlert = (title) => {
    const MySwal = withReactContent(Swal)
    const alertContent = (
        <Spinner>
            <div className="loader"></div>
        </Spinner>
    )
    MySwal.fire({
        title: <AlertTitle>{title}</AlertTitle>,
        html: alertContent,
        showConfirmButton: false
    })
    return MySwal;
}

export default fireSpinnerAlert;