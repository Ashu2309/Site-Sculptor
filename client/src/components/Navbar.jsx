import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import UserContext from './context/UserContext'

const Navbar = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem("username")
    const param = localStorage.getItem("param")

    // logout handler function
    function userLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');

        navigate('/')
    }
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
                                <li className="nav-item">
                                    <NavLink to="/create" className="nav-link">Create</NavLink>
                                </li>
                                {username ?
                                    <li className="nav-item">
                                        <NavLink to={`/portfolio/${username}`} className="nav-link">Portfolio</NavLink>
                                    </li> :
                                    <li className="nav-item">
                                        <NavLink to={`/portfolio/${param}`} className="nav-link">Portfolio</NavLink>
                                    </li>
                                }

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
        </div>
    )
}

export default Navbar