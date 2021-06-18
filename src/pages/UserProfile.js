import React, {useState} from 'react';
import EditUserForm from "./EditUserForm";
import { useSelector, useDispatch}  from 'react-redux'
import { saveUser, selectUserData, apiConfigurations } from '../slices/userSlice'

const UserProfile = () => {
    const user = useSelector(selectUserData)
    const config = useSelector(apiConfigurations)
    const dispatch = useDispatch()

    return (
        <React.Fragment>
            <div className="row p-lg-3 justify-content-center" style={{width: "500px"}}>
                <div className="col-sm-12 col-md-12 col-lg-12 ">
                    <table className="table caption-top">
                        <caption>{user.username} Profile</caption>
                        <tbody>
                            <tr>
                                <th scope="row">Picture</th>
                                <td>
                                    <img width="80" height="80" className="rounded-circle" src="https://pbs.twimg.com/media/EXfjc-JXsAAEa3s.jpg" alt="avatar"/>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Full Name</th>
                                <td>{user.first_name} {user.last_name}</td>
                            </tr>
                            <tr>
                                <th scope="row">Email</th>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <th scope="row">Phone No</th>
                                <td>078754325</td>
                            </tr>
                            <tr className="border-0">
                                <td colSpan="2">
                                    <button
                                        data-bs-toggle="modal" data-bs-target="#edit-modal"
                                        className="btn btn-primary btn-sm m-1 float-end"
                                    >Update Profile</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="modal fade" id="edit-modal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Your Profile</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <EditUserForm />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default UserProfile;