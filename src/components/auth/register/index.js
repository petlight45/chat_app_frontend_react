import '../../../styles/auth.css'
import {SizedBox} from "../../global/SizedBox";
import {FormFooterPrompt} from "../FormFooterPromt";
import axiosInstance from "../../../config/api/axios";
import displayApiSuccessMessage from "../../../helpers/alerts/displayApiSuccessMessage";
import {displayApiErrorMessage} from "../../../helpers/alerts/displayApiErrorMessage";
import fireMessageAlert from "../../../helpers/alerts/alertMessage";
import {useNavigate} from "react-router";
import {useState} from "react";
import {Spinner} from "../../global/Spinner";

export const RegisterContainer = () => {
    const [profilePicture, setProfilePicture] = useState(null)
    const [username, setUsername] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [showSpinner, setShowSpinner] = useState(false)
    const navigate = useNavigate()

    const handleOnClickButton = (e) => {
        e.preventDefault()
        validateRegister()
    }


    const validateRegister = async () => {
        if (!profilePicture) {
            fireMessageAlert('Error', 'Upload a profile picture!')
        } else if (!username) {
            fireMessageAlert('Error', 'Enter a username!')
        } else if (!password1) {
            fireMessageAlert('Error', 'Enter your password!')
        } else if (!password2) {
            fireMessageAlert('Error', 'Password confirmation is required!')
        } else if (password1 !== password2) {
            fireMessageAlert('Error', "Your passwords don't match!")
        } else {
            const formData = new FormData()
            formData.append("picture", profilePicture)
            formData.append("username", username)
            formData.append("password", password1)
            handleRegister(formData)
        }
    }


    const handleRegister = async (validatedData) => {
        setShowSpinner(true)
        axiosInstance().post('/auth/register', validatedData).then((response) => {
            console.log(response)
            displayApiSuccessMessage(response.data)
            navigate('/login', {replace: true})
        }).catch((err) => {
            displayApiErrorMessage(err);
            setShowSpinner(false)
        });
    }
    return (
        <div className="login-wrapper">
            <div className="d-flex full-height justify-content-center align-items-start">
                <div className='form-wrapper py-2 px-3 px-md-4 px-lg-5 bg-white'>
                    <div className='form-header text-center'>
                        Join Chat App
                    </div>
                    <form className="mt-4">
                        <div className="form-group">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" value={username}
                                   onChange={(e) => setUsername(e.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="picture" className="form-label">Profile Picture</label>
                            <input type="file" className="form-control"
                                   onChange={(e) => setProfilePicture(e.target.files[0])}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input className="form-control" type="password" value={password1}
                                   onChange={(e) => setPassword1(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Confirm Password</label>
                            <input className="form-control" type="password" value={password2}
                                   onChange={(e) => setPassword2(e.target.value)}/>
                        </div>
                        <div className="d-flex justify-content-center mt-3 flex-column align-items-center">
                            {!showSpinner ?
                                <>
                                    <button type="submit" className="btn btn-primary form-submit px-5"
                                            onClick={handleOnClickButton}>Sign Up
                                    </button>
                                    <SizedBox height={1.0}/>
                                    <FormFooterPrompt question={"Already own an account?"} proceed_to={"Sign In"}
                                                      url={"/login"}/>
                                </> : <Spinner size={1.5}/>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}