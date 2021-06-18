import React from 'react';
import { NavLink} from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="list-group" >
            <NavLink to="/profile/dashboard" className="list-group-item list-group-item-action" >
              <i className="fa fa-dashboard" />  Dashboard
            </NavLink>
            <NavLink to="/profile/posts" className="list-group-item list-group-item-action">
                <i className="fa fa-list-alt" />   Posts
            </NavLink>
            <NavLink to="/profile/profile" className="list-group-item list-group-item-action">
                <i className="fa fa-user-circle" />  Profile
            </NavLink>
            <NavLink to="/profile/settings" className="list-group-item list-group-item-action">
                <i className="fa fa-cogs" />  Settings
            </NavLink>
        </div>
    );
};

export default Sidebar;