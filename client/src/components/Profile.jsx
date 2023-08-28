import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import UserContext from './context/UserContext';
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Navbar from './Navbar';

axios.defaults.baseURL = 'http://localhost:8000';

const Profile = () => {
    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);
    const username = localStorage.getItem("username")
    const [ApiData, setApiData] = useState([]);
    const fetchData = async () => {
        const response = await axios.get(`/api/user/${username}`, {
            headers: {
                Accept: '*/*',
                'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
            },
        });
        console.log(response.data);
        setApiData(response.data);
    };
    useEffect(() => {
        fetchData();
    }, []);

    const [userDetails, setUserDetails] = useState({
        firstname: '',
        lastname: '',
        email: '',
        mobile: '',
        address: '',
    });

    useEffect(() => {
        setUserDetails({
            firstname: ApiData.firstName,
            lastname: ApiData.lastName,
            email: ApiData.email,
            mobile: ApiData.mobile,
            address: ApiData.address,
        });
    }, [ApiData]);

    const inputEvent = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    };

    const update = async () => {
        const response = await updateUser(userDetails);
        if (response.success == true) {
            toast.success("Updated Successful !")
        }
        else {
            toast.error(<b>Couldn't Update!</b>)
            console.log(response)
        }

    }

    return (
        <>
            <Navbar />

            <div className='main d-flex justify-content-center align-items-center'>
                <div className='col-lg-5'>
                    <Toaster />
                    <h1>Profile</h1>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input type="text" className="form-control" name="firstname" value={userDetails.firstname} onChange={inputEvent} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input type="text" className="form-control" name="lastname" value={userDetails.lastname} onChange={inputEvent} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mobile Number</label>
                            <input type="text" className="form-control" name="mobile" value={userDetails.mobile} onChange={inputEvent} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email Address</label>
                            <input type="text" className="form-control" name="email" value={userDetails.email} disabled="true" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <input type="text" className="form-control" name="address" value={userDetails.address} onChange={inputEvent} />
                        </div>
                        <button className="btn btn-warning me-2"><NavLink to="/recovery" className="nav-link">Change Password</NavLink></button>

                        <button type="button" className="btn btn-primary" onClick={update}>Update</button>
                    </form>
                </div>
            </div>
        </>

    )
}

export default Profile