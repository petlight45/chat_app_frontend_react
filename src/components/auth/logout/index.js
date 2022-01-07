import styled from 'styled-components';
import {useState} from "react";
import axiosInstance from "../../../config/api/axios";
import {useNavigate} from "react-router";
import '../../../styles/auth.css'
import {Spinner} from "../../global/Spinner";


const StyledContainer = styled.div`
    padding: 1rem;
    min-height: 100vh;
    display: flex;
    align-items:center;
    justify-content:center;
    background: var(--custom-main-background);
`;

const LogoutContainer = () => {
    const [showSpinner, setShowSpinner] = useState(false)
    const navigate = useNavigate()

    const handleOnClickLogoutButton = (e) => {
        e.preventDefault()
        setShowSpinner(true)
        axiosInstance().post('/auth/logout', {
            refresh_token: window.localStorage.getItem('refresh_token')
        }).then((response) => {
                window.localStorage.setItem('access_token', null);
                window.localStorage.setItem('refresh_token', null);
                navigate('/login', {replace: true})
            }
        ).catch((err) => {
            console.log(err);
            window.localStorage.setItem('access_token', null);
            window.localStorage.setItem('refresh_token', null);
            navigate('/login', {replace: true})
        });

    }

    return (
        <StyledContainer>
            {showSpinner ? <Spinner size={2.0}/> :
                <button onClick={handleOnClickLogoutButton} type="submit"
                        className="btn btn-primary form-submit px-5 py-3">Proceed to Logout</button>
            }
        </StyledContainer>
    )
}

export default LogoutContainer;