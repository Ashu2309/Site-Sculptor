import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from './context/UserContext'
import toast, { Toaster } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';



const Reset = () => {
    const navigate = useNavigate();

    const { resetPassword } = useContext(UserContext);
    const username = localStorage.getItem("username")
    const [userDetails, setUserDetails] = useState({ password: "111", confirmpassword: "111" })
    const inputEvent = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: [e.target.value] })
    }
    const update = async () => {
        let updatePromise = await resetPassword({ username: username.toString(), password: userDetails.password.toString() });
        if (updatePromise.status == 200) {
            toast.success("Password Changed Successful !")
            setTimeout(() => {
                navigate("/login");
            }, 5000)
        }
        else toast.error(<b>Couldn't Change Password !</b>)

    }
    return (
        <>
            <Navbar />

            <div className='main d-flex justify-content-center align-items-center'>
                <div className='col-lg-5'>
                    <Toaster />
                    <h1>Reset</h1>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" name="password" value={userDetails.password} onChange={inputEvent} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" name="confirmpassword" value={userDetails.confirmpassword} onChange={inputEvent} />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={update}>Change</button>
                    </form>
                </div>
            </div>
        </>

    )
}

export default Reset