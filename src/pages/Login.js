import React, {useState} from 'react';
import AlertControl from "../controls/AlertControl";
import UseForm from "../controls/useForm";
import InputControl from "../controls/InputControl";
import { getUserInfo, loginUser } from '../app/api';
import { saveUser, apiConfigurations } from '../slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from "react-router-dom";

const Login = () => {

    const initialLoginInfo = {
        username: '',
        password: ''
    }

    const [loginInfo, setLoginInfo] = useState(initialLoginInfo)
    const [loginErrorMessage, setLoginErrorMessage] = useState('')
    const [isLoggingIn, setIsLoggingIn] = useState(false)
    const history = useHistory();
    const dispatch = useDispatch()

    const handleLoginInfo = (e) => {
        setLoginErrorMessage('')
        setLoginInfo({
            ...loginInfo,
            [e.target.name] : e.target.value
        })
    }

    const loginFormValidator = () => {
        if (!loginInfo.username) {
            setLoginErrorMessage('Username Cannot Be Blank!')
            return false;
        }
        else if (!loginInfo.password) {
            setLoginErrorMessage('Password Cannot Be Blank!')
            return false;
        }
        else {
            setLoginErrorMessage('')
            return true
        }
    }

    const getUserProfileInfo = async (response1) => {
        const config = {
            headers: { 'Authorization': `Bearer ${response1.access}` }
        }

        try {
            const profile = await getUserInfo(config)
            dispatch(saveUser({
              acc: response1.access,
              ref: response1.refresh,
              isAuthenticated: true,
              userId: profile.id,
              first_name: profile.first_name,
              last_name: profile.last_name,
              username: profile.username,
              email: profile.email,
              date_joined: profile.date_joined
            }))
            localStorage.setItem('acc', response1.access);
            localStorage.setItem('ref', response1.ref);
            setIsLoggingIn(false)
            history.replace("/home")
            
        } catch (error) {
            console.log('Getting User Profile ', error.response.data)
            setIsLoggingIn(false)
            setLoginErrorMessage('Ooops...!, Some Error Occured. Please Try Again.')
        }
    }

    const sendLoginCredentials = async (e) => {
        e.preventDefault();
        const isLoginFormValid = loginFormValidator();

        if (isLoginFormValid) {
            setIsLoggingIn(true)
            try {
                const response = await loginUser(loginInfo)
                setLoginInfo(initialLoginInfo)
                getUserProfileInfo(response)
            } catch (error) {
                setIsLoggingIn(false)
                if (error.response.status === 401) {
                    setLoginErrorMessage('Incorrect Username Or Password')
                    console.log('Account Not Found!', error.response.data)
                }
                else {
                    console.log('Login Error ', error.response.data)
                    setLoginErrorMessage('Ooops...!, Some Error Occured. Please Try Again.')
                }
            }
        }
        else {
            console.log('Login Form Is Not Valid')
        }
    }

    return (
        <React.Fragment>
            <AlertControl text={loginErrorMessage} />
            <UseForm>
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-7 col-lg-7 ">
                        <InputControl
                            label="Username"
                            placeholder="Enter Username"
                            name="username"
                            // required={true}
                            onChange={handleLoginInfo}
                            value={loginInfo.username}
                        />
                    </div>
                    <div className="col-sm-12 col-md-7 col-lg-7">
                        <InputControl
                            label="Password"
                            placeholder="Enter password"
                            type="password"
                            name="password"
                            // required={true}
                            onChange={handleLoginInfo}
                            value={loginInfo.password}
                        />
                    </div>
                    <div className="col-sm-12 col-md-7 col-lg-7">
                        <button className="btn btn-primary  mt-3 float-end" onClick={sendLoginCredentials}>{isLoggingIn ? 'Loading...' : 'Login'}</button>
                    </div>
                </div>
            </UseForm>
        </React.Fragment>
    );
};

export default Login;