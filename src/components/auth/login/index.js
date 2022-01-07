import '../../../styles/auth.css'
import {SizedBox} from "../../global/SizedBox";
import {FormFooterPrompt} from "../FormFooterPromt";
import axiosInstance from "../../../config/api/axios";
import {displayApiErrorMessage} from "../../../helpers/alerts/displayApiErrorMessage";
import {Spinner} from "../../global/Spinner";
import {useState} from "react";
import {useNavigate} from "react-router";
import fireMessageAlert from "../../../helpers/alerts/alertMessage";

export const LoginContainer = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showSpinner, setShowSpinner] = useState(false)
    const navigate = useNavigate()

    const handleOnClickButton = (e) => {
        e.preventDefault()
        validateLogin()
    }


    const validateLogin = async () => {
        if (!username) {
            fireMessageAlert('Error', 'Username is required!')
        } else if (!password) {
            fireMessageAlert('Error', 'Password is required!')
        } else {
            const requestBody = {
                username,
                password
            }
            handleLogin(requestBody)
        }
    }

    const handleLogin = async (validatedData) => {
        setShowSpinner(true)
        axiosInstance().post('/auth/login', validatedData).then((response) => {
            const {refresh, access} = response.data;
            window.localStorage.setItem('access_token', access);
            window.localStorage.setItem('refresh_token', refresh);
            navigate('/', {replace: true})
        }).catch((err) => {
            displayApiErrorMessage(err);
            setShowSpinner(false)
        });
    }

    return (
        <div className="login-wrapper">
            <div className="d-flex full-height justify-content-center align-items-start">
                <div className='form-wrapper py-3 px-5 bg-white'>
                    <div className='form-header text-center'>
                        Continue to Chat App
                    </div>
                    <form className="mt-4">
                        <div className="form-group">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" value={username}
                                   onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="d-flex justify-content-center mt-3 flex-column  align-items-center">
                            {!showSpinner ?
                                <>
                                    <button type="submit" className="btn btn-primary form-submit px-5"
                                            onClick={handleOnClickButton}>Sign In
                                    </button>
                                    <SizedBox height={1.0}/>
                                    <FormFooterPrompt question={"Don't have an account?"} proceed_to={"Sign Up"}
                                                      url={"/register"}/>
                                </> : <Spinner size={1.5}/>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}