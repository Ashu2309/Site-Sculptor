import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from './context/UserContext'
import toast, { Toaster } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';


const Register = () => {
    const navigate = useNavigate();

    const { registerUser } = useContext(UserContext);
    const [userDetails, setUserDetails] = useState({ name: "", email: "", password: "" })
    const inputEvent = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: [e.target.value] })
    }
    const register = async () => {

        let registerPromise = await registerUser(userDetails);
        if (registerPromise.success == true) {
            toast.success("Restration Successful !")
            setTimeout(() => { }, 3000)
            navigate("/login")
        }
        else toast.error(<b>Registration Failed !</b>)

    }
    return (
        <>
            <Navbar />

            <div className='main d-flex justify-content-center align-items-center'>
                <div className='col-lg-5'>
                    <Toaster />
                    <h1>Register</h1>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" name="name" value={userDetails.name} onChange={inputEvent} />
                            <div className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={userDetails.email} onChange={inputEvent} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={userDetails.password} onChange={inputEvent} />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={register}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register