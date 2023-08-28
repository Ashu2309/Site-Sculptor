import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from './context/UserContext'
import toast, { Toaster } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';


const Recover = () => {
    const navigate = useNavigate();
    const [disable, setDisable] = useState(false);
    const [timer, setTimer] = useState(null);


    const { generateOTP, verifyOTP } = useContext(UserContext);
    const [userDetails, setUserDetails] = useState({ name: "" })
    const [OTP, SetOTP] = useState("");
    const inputEvent = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: [e.target.value] })
    }
    const generate = async () => {
        if (userDetails.name[0] === '') {
            toast.error("Please fill username !")
        } else {
            localStorage.setItem('username', userDetails.name)


            generateOTP(userDetails.name).then((OTP) => {
                if (OTP) return toast.success("OTP sent to your email");
                else return toast.error("Problem while generating OTP")
            })
            setDisable(true);
            setTimer(10)
        }

        console.log(userDetails.name)

    }
    useEffect(() => {
        if (timer === 0) {
            // timer has ended
            clearInterval(timer);
            setTimer(null)
            setDisable(false);

        } else if (timer) {
            // timer is still running
            setTimeout(() => setTimer(timer - 1), 1000);
        }
    }, [timer]);



    const verify = async () => {

        const response = await verifyOTP({ username: userDetails.name, code: OTP });
        console.log(response)
        if (response.success === true) {
            toast.success("OTP verified");
            navigate("/reset")
        } else {
            toast.error("Invalid OTP");
        }
    }
    return (
        <>
            <Navbar />

            <div className='main d-flex justify-content-center align-items-center'>
                <div className='col-lg-5'>
                    <Toaster />
                    <h1>Change Password</h1>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" name="name" value={userDetails.name} onChange={inputEvent} />
                            <div className="form-text">We'll never share your email with anyone else.</div>
                        </div>

                    </form>
                    {userDetails.name &&
                        <button disabled={disable} type="button" className="btn btn-primary" onClick={generate}>Generate OTP</button>
                    }
                    <span>{timer}</span>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">OTP</label>
                            <input type="text" className="form-control" name="name" pattern="\d*" value={OTP} maxLength="6" onChange={(e) => SetOTP(e.target.value)} />

                        </div>
                        <button type="button" className="btn btn-primary" onClick={verify}>Verify</button>
                    </form>

                </div>
            </div>
        </>

    )
}

export default Recover