import React from 'react';
import {Link, NavLink, useHistory} from "react-router-dom";
import { useSelector, useDispatch}  from 'react-redux'
import { saveUser, selectUserData, apiConfigurations } from '../slices/userSlice'

function Header() {
    const user = useSelector(selectUserData)
    const config = useSelector(apiConfigurations)
    const isLogged = user.isAuthenticated
    const history = useHistory();
    const dispatch = useDispatch()

    const exitUser = async () => {
        try {
            // const response = await logoutUser(config)
            localStorage.removeItem('acc');
            localStorage.removeItem('ref');
            dispatch(saveUser({
                userId: '',
                username: '',
                first_name: '',
                last_name: '',
                email: '',
                acc: '',
                ref: '',
                isAuthenticated: false,
                date_joined: ''
            }))
            history.push("/home")
        } catch (err) { console.log('Logout Error : ', err) }

    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link to="/" className="navbar-brand text-white" href="#" >AXBR Blog</Link>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link active text-white" aria-current="page" href="#">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about" className="nav-link text-white" href="#">About</NavLink>
                        </li>
                        {isLogged ? <>
                            <li className="nav-item">
                                <NavLink to="/profile" className="nav-link text-white" href="#">Profile</NavLink>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-primary bg-none" onClick={e => { e.preventDefault(); exitUser() }}>Logout</button>
                            </li> </> : <>
                            <li className="nav-item">
                                <NavLink to="/register" className="nav-link text-white" href="#">Register</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link text-white" href="#">Login</NavLink>
                            </li> </>}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;