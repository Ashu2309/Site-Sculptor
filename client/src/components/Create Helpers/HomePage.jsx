import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../context/UserContext'
import avatar from "../../assets/images/avatar.jpg"

import { useNavigate } from 'react-router-dom'

const HomePage = () => {

    const username = localStorage.getItem("username")
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState([])
    const { saveUserDetails, getUserDetails, updateUserDetails } = useContext(UserContext)
    const [active, setActive] = useState("Home")

    const [input, setinput] = useState({
        name: "",
        description: "",
        profileImage: "",
        mainColor: "#000",
        background: "",
        mainBackground: "",
        mainBackground2: "",
        headColor: "",
        textColor: "",
        textStyle: "",
    })
    const getdata = async () => {

        const response = await getUserDetails(username);
        setUserDetails(response.data);
        console.log(response.data)

    }
    useEffect(() => {
        getdata();
    }, [])

    const saveDetails = async (e) => {
        e.preventDefault();
        const response = await updateUserDetails(input);
    }

    useEffect(() => {
        setinput({
            name: userDetails.name,
            description: userDetails.description,
            profession: userDetails.profession,
            profileImage: userDetails.profileImage,
            mainColor: userDetails.mainColor,
            background: userDetails.background,
            mainBackground: userDetails.mainBackground,
            mainBackground2: userDetails.mainBackground2,

            textColor: userDetails.textColor,
            headColor: userDetails.headColor,

            textStyle: userDetails.textStyle
        })
    }, [userDetails])

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }
    const handleImage = async (e) => {
        const file = e.target.files[0];
        const base64String = await convertToBase64(file);
        setinput({ ...input, profileImage: base64String })
    }

    return (
        <div>
            <section className="section section-contact ">
                <div className="container">
                    <h2 className="common-heading">Hero Section Details</h2>
                </div>

                <div className="section-contact-main contact-container">
                    <form onSubmit={saveDetails}>
                        <div className=" grid grid-two-col">
                            <input type="text" name='name' value={input.name} onChange={(e) => setinput({ ...input, name: e.target.value })} required />
                            <div className='d-flex align-items-center'><h4>Upload Image</h4><label htmlFor="file-upload" className='custom-file-upload'>
                                <img src={input.profileImage || avatar} alt="" className='imageFill' />
                            </label>
                                <input type="file"
                                    lable="Image"
                                    name="profileImage"
                                    id='file-upload'
                                    accept='.jpeg, .png, .jpg'
                                    onChange={handleImage}
                                /></div>

                        </div>
                        <div>
                            <input type="text" name="profession" placeholder="profession" value={input.profession} onChange={(e) => setinput({ ...input, profession: e.target.value })} required />
                        </div>
                        <div>
                            <textarea name='desciption' value={input.description} onChange={(e) => setinput({ ...input, description: e.target.value })} required></textarea>
                        </div>

                        <div>
                            <input type="submit" value="send message" className="btn" />
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default HomePage