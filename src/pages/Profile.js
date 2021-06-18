import React from 'react';
import {Route,Redirect, Switch} from 'react-router-dom'
import Sidebar from "./Sidebar";
import UserDashboard from "./UserDashboard";
import UserPosts from "./UserPosts";
import ChangePassword from "./ChangePassword";
import UserProfile from "./UserProfile";
import NotFound from "./NotFound";

const Profile = () => {
    return (
        <div className="row">
            <div className="col-sm-12 col-md-2 col-lg-2">
                <Sidebar />
            </div>
            <div className="col-sm-12 col-md-10 col-lg-10">
                <Switch>
                    <Route path="/profile/dashboard" component={() => <UserDashboard />} />
                    <Route path="/profile/posts" component={() => <UserPosts />}  />
                    <Route path="/profile/profile" component={() => <UserProfile />} />
                    <Route path="/profile/settings" component={() => <ChangePassword />} />
                    <Route path="/profile/not-found" component={() => <NotFound />} />
                    <Redirect exact from="/profile" to="/profile/dashboard" />
                </Switch>
            </div>
        </div>
    );
};

export default Profile;