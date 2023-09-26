import React, { useContext, useState, useEffect } from 'react'
import Navbar from '../Navbar'
import UserContext from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import SideNav from '../helper/SideNav';
import HomePage from '../Create Helpers/HomePage';
import AboutPage from '../Create Helpers/AboutPage';
import SkillsPage from '../Create Helpers/SkillsPage';
import ExperiencePage from '../Create Helpers/ExperiencePage';
import ProjectPage from '../Create Helpers/ProjectPage';
import EducationPage from '../Create Helpers/EducationPage'

const Create = () => {
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
    console.log(active)


    return (
        <>
            <Navbar />
            <Toaster />
            <div className="container_fluid">
                <div className="row">
                    <div className='leftBlockCreate col-lg-3 col-3'>
                        <SideNav active={active} setActive={setActive} />

                    </div>

                    {username ? (
                        <div className='fillDetails col-lg-9 col-9'>
                            {active == "Home" &&
                                <>
                                    <div>
                                        <HomePage />
                                        <button className="bg-info text-light btn" onClick={() => setActive("About")}>Next</button>
                                    </div>
                                </>
                            }
                            {active == "About" &&
                                <>
                                    <div>
                                        <AboutPage />
                                        <button className="bg-info text-light btn" onClick={() => setActive("Skills")}>Next</button>
                                    </div>
                                </>
                            } {active == "Skills" &&
                                <>
                                    <div>
                                        <SkillsPage />
                                        <button className="bg-info text-light btn" onClick={() => setActive("Project")}>Next</button>
                                    </div>
                                </>
                            } {active == "Project" &&
                                <>
                                    <div>
                                        <ProjectPage />
                                        <button className="bg-info text-light btn" onClick={() => setActive("Experience")}>Next</button>
                                    </div>
                                </>
                            } {active == "Experience" &&
                                <>
                                    <div>
                                        <ExperiencePage />
                                        <button className="bg-info text-light btn" onClick={() => setActive("Contact")}> Save</button>
                                    </div>
                                </>
                            }
                            {active == "Education" &&
                                <>
                                    <div>
                                        <EducationPage />
                                        <button className="bg-info text-light btn" onClick={() => setActive("Education")}> Save</button>
                                    </div>
                                </>
                            }
                            {/* <div>
                        <h1>lets make it</h1>
                        <h1>Home page</h1>
                        <form onSubmit={saveDetails}>
                            <div><label>Name</label><input type="text" name='name' value={input.name} onChange={(e) => setinput({ ...input, name: e.target.value })} /></div>
                            <div><label>Description</label><input type="text" name='desciption' value={input.description} onChange={(e) => setinput({ ...input, description: e.target.value })} /></div>
                            <div>
                                <label htmlFor="file-upload" className='custom-file-upload'>
                                    <img src={input.profileImage || avatar} alt="" height="40px" width="40px" />
                                </label>
                                <input type="file"
                                    lable="Image"
                                    name="profileImage"
                                    id='file-upload'
                                    accept='.jpeg, .png, .jpg'
                                    onChange={handleImage} />

                                <br /><label>Main Color</label>
                                <input type="color" onChange={(e) => setinput({ ...input, mainColor: e.target.value })} value={input.mainColor} />
                                <br /><label>Main Background</label>

                                <input type="color" onChange={(e) => setinput({ ...input, mainBackground: e.target.value })} value={input.mainBackground} />
                                <br /><label>Main Background 2</label>

                                <input type="color" onChange={(e) => setinput({ ...input, mainBackground2: e.target.value })} value={input.mainBackground2} />
                                <br /><label>Backgroud</label>

                                <input type="color" onChange={(e) => setinput({ ...input, background: e.target.value })} value={input.background} />
                                <br /><label>text Color</label>

                                <input type="color" onChange={(e) => setinput({ ...input, textColor: e.target.value })} value={input.textColor} />
                                <br /><label>Head Color</label>

                                <input type="color" onChange={(e) => setinput({ ...input, headColor: e.target.value })} value={input.headColor} />
                                <br /><label>Text Style</label>

                                <input type="text" onChange={(e) => setinput({ ...input, textStyle: e.target.value })} value={input.textStyle} />

                            </div>
                            <button type='submit'>SAVE</button>
                        </form>
                    </div> */}
                        </div >)
                        : (
                            <>
                                {navigate("/login")}
                                {toast.error("Login First")}
                            </>
                        )}

                </div>
            </div>

        </>
    )
}

export default Create