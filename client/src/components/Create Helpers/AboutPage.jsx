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
        aboutusDescription: "",
        AboutusImage: "",
        showEmail: "",
        address: "",
        degree: "",
        job: "",
        organization: "",
        birthdate: "",
        course: "",
        institute: ""
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
        console.log(response)
        console.log("about sent")
    }

    useEffect(() => {
        setinput({
            name: userDetails.name,
            showEmail: userDetails.showEmail,
            aboutusDescription: userDetails.aboutusDescription,
            profession: userDetails.profession,
            AboutusImage: userDetails.AboutusImage,
            address: userDetails.address,
            degree: userDetails.degree,
            degree: userDetails.degree,
            organization: userDetails.organization,

            birthdate: userDetails.birthdate,
            course: userDetails.course,
            job: userDetails.job,
            institute: userDetails.institute
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
        setinput({ ...input, AboutusImage: base64String })
    }

    return (
        <div>
            <section className="section section-contact ">
                <div className="container">
                    <h2 className="common-heading">Aboutus Details</h2>
                </div>

                <div className="section-contact-main contact-container">
                    <form onSubmit={saveDetails}>
                        <div className=" grid grid-two-col">
                            <input type="text" name='name' value={input.name} onChange={(e) => setinput({ ...input, name: e.target.value })} />
                            <div className='d-flex align-items-center'><h4>AboutUS Image</h4><label htmlFor="file-upload" className='custom-file-upload'>
                                <img src={input.AboutusImage || avatar} alt="" className='imageFill' />
                            </label>
                                <input type="file"
                                    lable="Image"
                                    name="AboutusImage"
                                    id='file-upload'
                                    accept='.jpeg, .png, .jpg'
                                    onChange={handleImage}
                                /></div>

                        </div>
                        <div>
                            <input type="text" name="showEmail" placeholder="showEmail" value={input.showEmail} onChange={(e) => setinput({ ...input, showEmail: e.target.value })} />
                        </div>
                        <div className=' grid grid-two-col'>
                            <input type="text" name="address" placeholder="address" value={input.address} onChange={(e) => setinput({ ...input, address: e.target.value })} />
                            <input type="text" name="degree" placeholder="degree" value={input.degree} onChange={(e) => setinput({ ...input, degree: e.target.value })} />

                        </div>
                        <div className=' grid grid-two-col'>
                            <input type="text" name="job" placeholder="job" value={input.job} onChange={(e) => setinput({ ...input, job: e.target.value })} />
                            <input type="text" name="birthdate" placeholder="birthdate" value={input.birthdate} onChange={(e) => setinput({ ...input, birthdate: e.target.value })} />

                        </div>

                        <div>
                            <input type="text" name="organization" placeholder="organization" value={input.organization} onChange={(e) => setinput({ ...input, organization: e.target.value })} />
                        </div>

                        <div>
                            <textarea name='aboutusDescription' value={input.aboutusDescription} onChange={(e) => setinput({ ...input, aboutusDescription: e.target.value })} ></textarea>
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