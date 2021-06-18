import React, {useState} from 'react';
import { editUserInfo } from '../app/api';
import { saveUser, selectUserData, apiConfigurations } from '../slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import InputControl from "../controls/InputControl";

const EditUserForm = () => {
    
    const initialProfileInfo = {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
    }
    
    const user = useSelector(selectUserData)
    const dispatch = useDispatch()
    const config = useSelector(apiConfigurations)
    const [userInfo, setUserInfo] = useState({ 
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
    })
    
    const [userFormErrorMessage, setUserFormErrorMessage] = useState('')
    const [isSendingUserChanges, setisSendingUserChanges] = useState(false)
    const [hasDataSaved, setHasDataSaved] = useState(false)
    
    const handleUserInfoChanges = (e) => {
        setUserFormErrorMessage('')
        setUserInfo({
            ...userInfo,
            [e.target.name] : e.target.value
        })
    }

    const userFormValidator = () => {
        if (!userInfo.first_name) {
            setUserFormErrorMessage('First Name Cannot Be Blank!')
            return false
        }
        else if (!userInfo.last_name) {
            setUserFormErrorMessage('Last Name Cannot Be Blank!')
            return false
        }
        else if (!userInfo.email) {
            setUserFormErrorMessage('Email Address Cannot Be Blank!')
            return false
        }
        // else if (!userInfo.phone) {
        //     setUserFormErrorMessage('Phone Number Cannot Be Blank!')
        //     return false
        // }
        else {
            setUserFormErrorMessage('')
            return true
        }
    }

    const saveUserInfoChanges = async (e) => {
        const isUserFormValid = userFormValidator()

        if (isUserFormValid) {
            setisSendingUserChanges(true)
            const payload = {
                ...userInfo,
                id: user.userId,
                username: user.username
            }
            try {
                const response = await editUserInfo(payload, config)
                dispatch(saveUser({
                    ...user, 
                    first_name: response.first_name,
                    last_name: response.last_name,
                    username: response.username,
                    email: response.email
                }))
                setUserInfo(initialProfileInfo)
                setisSendingUserChanges(false)
                setHasDataSaved(true)
            } catch (error) {
                console.log('Editing User Info ', error.response.data)
                setisSendingUserChanges(false)
                setUserFormErrorMessage('Oops...!, Some Error Occured. Please Try Again.')
            }
        }
        else {
            console.log('User Form Is Not Valid')
        }

    }
    return (
        <div className="row p-lg-3 justify-content-center" style={{width: "500px"}}>
            <div className="container-fluid">
                <div className="col-sm-12 col-md-12 col-lg-12 ">
                    <InputControl
                        label="First Name"
                        placeholder="Enter your first name"
                        name="first_name"
                        onChange={handleUserInfoChanges}
                        value={userInfo.first_name}
                        // required={true}
                    />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12 ">
                    <InputControl
                        label="Last Name"
                        placeholder="Enter your last name"
                        name="last_name"
                        onChange={handleUserInfoChanges}
                        value={userInfo.last_name}
                        // required={true}
                    />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12 ">
                    <InputControl
                        label="Email"
                        placeholder="Enter your email address"
                        name="email"
                        onChange={handleUserInfoChanges}
                        value={userInfo.email}
                        // required={true}
                    />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12 ">
                    <InputControl
                        label="Phone Number"
                        placeholder="Enter your phone number"
                        name="phone"
                        onChange={handleUserInfoChanges}
                        value={userInfo.phone}
                        // required={true}
                    />
                </div>
                {/* <div className="col-sm-12 col-md-12 col-lg-12 ">
                    <InputControl
                        label="Profile Image"
                        name="image"
                        type="file"
                        required={true}
                    />
                </div> */}
                <div className="col-sm-12 col-md-12 col-lg-12 ">
                    <button data-bs-dismiss='modal' className="btn btn-primary btn-sm mt-2 float-end" onClick={saveUserInfoChanges}>{isSendingUserChanges ? 'Updating Your Info...' : 'Update'}</button>
                    <button hidden={!userFormErrorMessage} className="btn btn-danger">{userFormErrorMessage}</button>
                </div>
            </div>
        </div>
    );
};

export default EditUserForm;