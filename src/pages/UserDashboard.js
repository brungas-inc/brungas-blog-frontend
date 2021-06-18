import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { useSelector, useDispatch}  from 'react-redux'
import { saveUser, selectUserData, apiConfigurations } from '../slices/userSlice'
import { getPostsByUserId } from '../app/api';

const UserDashboard = () => {

    const user = useSelector(selectUserData)
    const config = useSelector(apiConfigurations)
    const [userPosts, setUserPosts] = useState([])

    const getUserPosts = async () => {
        try {
            const response = await getPostsByUserId(user.userId, config)
            setUserPosts(response)
        } catch (error) {
            console.log('Getting Posts By UserId ', error.response.data)
        }
    }


    useEffect(() => {
        getUserPosts();
    }, [])
    
    // const changeDateFormat = (dt) => {
    //     var d = new Date(dt);
    //     d.toLocaleDateString('en-US')
    //     return d;
    // }

    return (
        <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
                <div style={{background: "#f2f3f5"}} className="m-lg-2 clearfix">
                    <h5 className="h5">Welcome {user.username}</h5>
                </div>
            </div>
            <div className="col-sm-12 col-md-8 col-lg-8">
                <div className="card text-black bg-transparent m-2">
                    <div className="card-header text-center"><b>User Information</b></div>
                    <div className="card-body">
                        <ul>
                            <li><strong>Full Name: </strong>{user.first_name} {user.last_name}</li>
                            <li><strong>Join Date: </strong>{user.date_joined.substr(0,10)}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-4 col-lg-4">
                <div className="card text-black bg-transparent m-2">
                    <div className="card-header text-center"><b>Total Posts</b></div>
                    <div className="card-body">
                        <Link to="/profile/posts" style={{textDecoration: "none"}} >
                            <h2 className="card-title h2 text-center">{userPosts.length} Posts</h2>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;