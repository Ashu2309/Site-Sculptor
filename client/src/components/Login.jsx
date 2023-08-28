import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import UserContext from './context/UserContext'
import toast, { Toaster } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';


const Login = () => {
    const navigate = useNavigate();

    const { verifyPassword, setUsername, saveUserDetails } = useContext(UserContext);
    const [userDetails, setUserDetails] = useState({ name: "", password: "" })
    const inputEvent = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: [e.target.value] })
    }
    const login = async () => {

        let loginPromise = await verifyPassword(userDetails.name, userDetails.password);
        if (loginPromise.success == true) {
            toast.success("Login Successful !")
            const token = loginPromise.data.token;
            localStorage.setItem('token', token)
            localStorage.setItem('username', userDetails.name)
            const response = await saveUserDetails(userDetails.name);
            console.log(response)
            setTimeout(() => {
                navigate("/profile");
            }, 3000)

        }
        else toast.error(<b>Login Failed !</b>)

    }
    return (
        <>
            <Navbar />

            <div className='main d-flex justify-content-center align-items-center'>
                <div className='col-lg-5'>
                    <Toaster />
                    <h1>Login</h1>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" name="name" value={userDetails.name} onChange={inputEvent} />
                            <div className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={userDetails.password} onChange={inputEvent} />
                        </div>
                        <NavLink to="/recovery">Forgot Password?</NavLink>
                        <button type="button" className="btn btn-primary" onClick={login}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login