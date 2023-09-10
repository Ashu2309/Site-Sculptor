import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import UserContext from './context/UserContext'
import Navbar from './Navbar';

const Username = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem("username")
    const param = localStorage.getItem("param")

    // logout handler function
    function userLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');

        navigate('/')
    }
    const [nav, setNav] = useState(true);
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink to="/profile" className="navbar-brand">Profile</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav w-100 d-flex justify-content-between">
                            <div className='d-flex'>
                            </div>
                            <div className='d-flex'>

                                {!username ? <>
                                    <li className="nav-item">
                                        <NavLink to="/register" className="nav-link">Register</NavLink>

                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/login" className="nav-link">Login</NavLink>
                                    </li>
                                </> :
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={userLogout} style={{ cursor: "pointer" }}>Logout</a>
                                    </li>
                                }
                            </div>

                        </ul>

                    </div>
                </div>
            </nav>
            <Navbar></Navbar>
            <div className='d-flex align-items-center justify-content-center' style={{ height: "100vh" }}>
                <h1>Welcome to our website</h1>
            </div></div>
    )
}

export default Username