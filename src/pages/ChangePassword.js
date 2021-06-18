import React, {useState} from 'react';
import InputControl from "../controls/InputControl";
import { useSelector, useDispatch}  from 'react-redux'
import { saveUser, selectUserData, apiConfigurations } from '../slices/userSlice'
import { changeUserPassword } from '../app/api';

const ChangePassword = () => {
    const user = useSelector(selectUserData)
    const config = useSelector(apiConfigurations)

    const initialPasswordInfo = {
        old_password: '',
        new_password: '',
        repeat_password:''
    }

    const [passwordInfo, setPasswordInfo] = useState(initialPasswordInfo)
    const [passwordFormErrorMessage, setPasswordFormErrorMessage] = useState('')
    const [isSendingPasswordChanges, setIsSendingPasswordChanges] = useState(false)
    const [hasPasswordChanged, setHasPasswordChanged] = useState(false)

    const handlePasswordForm = (e) => {
        setPasswordFormErrorMessage('')
        setHasPasswordChanged(false)
        setPasswordInfo({
            ...passwordInfo,
            [e.target.name]: e.target.value
        })
    }

    const passwordFormValidator = () => {
        if (!passwordInfo.old_password) {
            setPasswordFormErrorMessage('Enter Current Password')
            return false
        }
        else if (!passwordInfo.new_password) {
            setPasswordFormErrorMessage('Enter New Password')
            return false
        }
        else if (passwordInfo.new_password.length < 6) {
            setPasswordFormErrorMessage('Enter Atleast 6 Characters')
            return false
        }
        else if (!passwordInfo.repeat_password) {
            setPasswordFormErrorMessage('Re-enter New Password')
            return false
        }
        else if (passwordInfo.new_password !== passwordInfo.repeat_password) {
            setPasswordFormErrorMessage('Passwords Did Not Match!')
            return false
        }
        else {
            setPasswordFormErrorMessage('')
            return true
        }
    }

    const savePasswordChanges = async () => {
        const isPasswordFormValid = passwordFormValidator();
        setHasPasswordChanged(false)

        if (isPasswordFormValid) {
            setIsSendingPasswordChanges(true)
            const payload = {
                ...passwordInfo, id: user.userId
            }

            try {
                // console.log(config, user)
                const response = await changeUserPassword(payload, config)
                setIsSendingPasswordChanges(false)
                setPasswordInfo(initialPasswordInfo)
                setHasPasswordChanged(true)
            } catch (error) {
                setIsSendingPasswordChanges(false)
                if (error.response.data.old_password) {
                    console.log('Changing User Password ', error.response.data)
                    setPasswordFormErrorMessage('Current Password Is Wrong')
                }
                else {
                    console.log('Changing User Password ', error.response.data)
                    setPasswordFormErrorMessage('Ooops...!, Some Error Occured. Please Try Again.')
                }
            }
            
        }
        else {
            console.log('Password Form Is Not Valid')
        }

    }
    return (
        <div className="row p-lg-3 justify-content-center" style={{ width: "500px" }}>
            <button hidden={!hasPasswordChanged} className="btn btn-success">Your Password Changes Successfull.</button>
            <div className="col-sm-12 col-md-12 col-lg-12 ">
                <InputControl
                    label="Current Password"
                    placeholder="Enter Current Password"
                    type="password"
                    name="old_password"
                    value={passwordInfo.old_password}
                    onChange={handlePasswordForm}
                />
            </div>
            <hr className="mt-3" />
            <div className="col-sm-12 col-md-12 col-lg-12">
                <InputControl
                    label="New Password"
                    placeholder="Enter New Password"
                    type="password"
                    name="new_password"
                    value={passwordInfo.new_password}
                    onChange={handlePasswordForm}
                />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12">
                <InputControl
                    label="Confirm New Password"
                    placeholder="Confirm Your Password"
                    type="password"
                    name="repeat_password"
                    value={passwordInfo.repeat_password}
                    onChange={handlePasswordForm}
                />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12">
                <button className="btn btn-primary btn-sm mt-3 float-end" onClick={savePasswordChanges}>{isSendingPasswordChanges ? 'Saving Password...' : 'Save Password'}</button>
                <button hidden={!passwordFormErrorMessage} className="btn btn-danger">{passwordFormErrorMessage}</button>
            </div>
        </div>
    );
};

export default ChangePassword;