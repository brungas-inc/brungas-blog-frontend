import React, {useState} from 'react';
import UseForm from "../controls/useForm";
import InputControl from "../controls/InputControl";
import AlertControl from "../controls/AlertControl";
import { createUserAccount, getUserInfo, loginUser } from '../app/api';
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { saveUser, apiConfigurations } from '../slices/userSlice'

const Register = () => {

    const initialUserInfo = {
        username: '',
        first_name: '',
        last_name: '',
        password: '',
        email: '',
        phone: '',
        is_staff: false
    }

    const [userInfo, setUserInfo] = useState(initialUserInfo)
    const [registrationErrorMessage, setRegistrationErrorMessage] = useState('')
    const [isSendingData, setIsSendingData] = useState(false)
    const history = useHistory();
    const dispatch = useDispatch()


    const handleRegistrationForm = (e) => {
        setRegistrationErrorMessage('')
        setUserInfo({
            ...userInfo,
            [e.target.name] : e.target.value
        })
    }

    const registrationFormValidator = () => {
        if (!userInfo.username) {
            setRegistrationErrorMessage('Username Cannot Be Blank!')
            return false
        }
        else if (!userInfo.first_name) {
            setRegistrationErrorMessage('Fisrt Name Cannot Be Blank!')
            return false
        }
        else if (!userInfo.last_name) {
            setRegistrationErrorMessage('Last Name Cannot Be Blank!')
            return false
        }
        else if (!userInfo.password) {
            setRegistrationErrorMessage('Password Cannot Be Blank!')
            return false
        }
        else if (!userInfo.email) {
            setRegistrationErrorMessage('Email Cannot Be Blank!')
            return false
        }
        else if (!userInfo.phone) {
            setRegistrationErrorMessage('Phone Number Cannot Be Blank!')
            return false
        }
        else {
            setRegistrationErrorMessage('')
            return true
        }
    }

    // const getUserProfileInfo = async (response1) => {
    //     const config = {
    //         headers: { 'Authorization': `Token ${response1.access}` }
    //     }
    //     try {
    //         const profile = await getUserInfo(config)
    //         dispatch(saveUser({
    //           acc: response1.access,
    //           ref: response1.refresh,
    //           isAuthenticated: true,
    //           userId: profile.id,
    //           first_name: profile.first_name,
    //           last_name: profile.last_name,
    //           username: profile.username,
    //           email: profile.email,
    //           date_joined: profile.date_joined
    //         }))
    //         localStorage.setItem('acc', response1.access);
    //         localStorage.setItem('ref', response1.ref);
    //         setIsSendingData(false)
    //         history.replace("/home")
            
    //     } catch (error) {
    //         console.log('Getting User Profile ', error.response.data)
    //         history.push("/login")
    //     }
    // }
    
    // const sendLoginInfo = async (info) => {
    //     const payload = {
    //         username: info.username,
    //         password: info.password
    //     }
        
    //     try {
    //         const response = await loginUser(payload)
    //         getUserProfileInfo(response)
    //     } catch (error) {
    //         console.log('Login Error ', error.response.data)
    //         history.push("/login")
    //         }
    // }
    
    const sendRegistrationForm = async (e) => {
        e.preventDefault();
        const isRegistrationFormValid = registrationFormValidator()
        
        if (isRegistrationFormValid) {
            setIsSendingData(true)
            try {
                const response = await createUserAccount(userInfo)
                console.log(response)
                setUserInfo(initialUserInfo)
                // sendLoginInfo(response)
                setIsSendingData(false)
                history.push("/login")
            } catch (error) {
                setIsSendingData(false)
                console.log('Creating Useer Account ', error.response.data)
                if (error.response.data.username) {
                    setRegistrationErrorMessage('Username Already Taken. Try Another One')
                }
                else {
                    setRegistrationErrorMessage('Ooops...!, Some Error Occured. Please Try Again.')
                }
            }
        }
        else {
            console.log('Registration Form Is Not Valid')
        }
    }

    return (
        <React.Fragment>
            <AlertControl text={registrationErrorMessage}/>
            <UseForm>
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <InputControl label="Username" placeholder="Enter Username" value={userInfo.username} name="username" onChange={handleRegistrationForm}/>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <InputControl label="Password" placeholder="Enter password" value={userInfo.password} type="password" name="password" onChange={handleRegistrationForm}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <InputControl label="First Name" placeholder="Enter firstname" value={userInfo.first_name} name="first_name" onChange={handleRegistrationForm}/>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <InputControl label="Last Name" placeholder="Enter Lastname" value={userInfo.last_name} name="last_name" onChange={handleRegistrationForm}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <InputControl label="Email" type="email" placeholder="Enter email address" value={userInfo.email} name="email" onChange={handleRegistrationForm}/>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <InputControl label="Phone No" placeholder="Enter phone No" value={userInfo.phone} name="phone" onChange={handleRegistrationForm}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12 mt-3 mb-3">
                        <button className="btn btn-primary float-end" onClick={sendRegistrationForm}>{isSendingData ? 'loading...!' : 'Register'}</button>
                    </div>
                </div>
            </UseForm>
        </React.Fragment>
    );
};

export default Register;