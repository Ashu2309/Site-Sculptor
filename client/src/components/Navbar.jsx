import React, { useContext, useState } from 'react'
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
    const [nav, setNav] = useState(true);
    return (
        <div>

            <div className='navigator'>
                {nav ?
                    <div className="optionsNav">

                        <button className="openNav">
                            <NavLink to="/" className="nav-link">

                                <i class="fa-solid fa-house"></i>
                            </NavLink>
                        </button>
                        <button className="openNav">
                            <NavLink to="/profile" className="nav-link">
                                <i class="fa-solid fa-user-pen"></i>
                            </NavLink>
                        </button>
                        <button className="openNav">
                            <NavLink to="/create" className="nav-link">
                                <i class="fa-solid fa-pencil"></i>
                            </NavLink>
                        </button>
                        <button className="openNav">
                            <NavLink to={`/portfolio/${param}`} className="nav-link">
                                <i class="fa-solid fa-up-right-from-square"></i>
                            </NavLink>
                        </button>
                    </div>
                    : null}

                {nav ?
                    <button className="openNav">
                        <i class="fa-solid fa-grip-lines" onClick={() => setNav(false)}></i>
                    </button>
                    :
                    <button className="closeNav">
                        <i class="fa-solid fa-xmark" onClick={() => setNav(true)}></i>
                    </button>
                }

            </div>
        </div>
    )
}

export default Navbar