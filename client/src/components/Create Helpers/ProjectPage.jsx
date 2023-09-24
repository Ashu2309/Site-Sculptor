import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../context/UserContext'
import avatar from "../../assets/images/avatar.jpg"
import { useNavigate } from 'react-router-dom'

const ProjectPage = () => {

    const username = localStorage.getItem("username")
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState([])
    const { saveProjDetails, deleteProjDetails, updateProjDetails, getUserDetails, updateUserDetails } = useContext(UserContext)
    const [active, setActive] = useState("Home")
    const [toggle, settoggle] = useState(false)
    const [modal, setmodal] = useState(false)
    const [indexUpadte, setindexUpdate] = useState()
    const [tech, setTech] = useState("")
    const [modaltech, setmodalTech] = useState("")
    const [image, setimage] = useState("")
    const [modalimage, setmodalimage] = useState("")






    const [input, setinput] = useState({
        title: "E-commerce Website Redesign",
        startDate: "2021-01-01",
        endDate: "2021-04-01",
        description: "Redesigned an existing e-commerce website to improve user experience and increase sales. Conducted user research, developed wireframes and prototypes, and worked with the development team to implement the new design.",
        images: [],
        technologiesUsed: [
            "Figma",
            "Sketch",
            "HTML",
            "CSS",
            "JavaScript"
        ],
        role: "UX/UI Designer",
        outcomes: "Increased sales by 20% and improved user engagement by 30% compared to the previous version of the website."
    })
    const [updateInput, setupdateInput] = useState({
        title: "",
        startDate: "",
        endDate: "",
        description: "",
        images: [],
        technologiesUsed: [],
        role: "",
        outcomes: ""
    })
    // console.log(updateInput)
    const getdata = async () => {

        const response = await getUserDetails(username);
        setUserDetails(response.data.projects);

    }
    useEffect(() => {
        getdata();
    }, [])



    const saveDetails = async (e) => {
        e.preventDefault();
        const response = await saveProjDetails(input);
        console.log(response)
        getdata()
    }
    const deleteExp = async (ind) => {
        const response = await deleteProjDetails(ind)
        getdata()

    }
    const handleUpdate = (ind) => {
        setmodal(true);
        setindexUpdate(ind);
        setupdateInput(userDetails[ind]);
    }


    const updateDetails = async (e) => {
        e.preventDefault();
        const objectInp = { "indexno": indexUpadte, "update": updateInput }
        const response = await updateProjDetails(objectInp);
        getdata()
        setmodal(false)
        console.log(response)
    }

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
        e.preventDefault()
        const file = e.target.files[0];
        const base64String = await convertToBase64(file);
        setinput({ ...input, images: [...input.images, base64String] })
    }
    console.log(input)

    const deleteImage = (e, ind) => {
        e.preventDefault()
        // Create a new array that is a copy of the existing technologiesUsed array
        const newTechnologies = [...input.images];

        // Remove the technology at the current index
        newTechnologies.splice(ind, 1);

        // Update the input state object with the new array
        setinput({
            ...input, images: newTechnologies
        })
    }


    const deleteTag = (e, ind) => {
        e.preventDefault()
        // Create a new array that is a copy of the existing technologiesUsed array
        const newTechnologies = [...input.technologiesUsed];

        // Remove the technology at the current index
        newTechnologies.splice(ind, 1);

        // Update the input state object with the new array
        setinput({
            ...input, technologiesUsed: newTechnologies
        })
    }
    const deleteimage = (e, ind) => {
        e.preventDefault()
        // Create a new array that is a copy of the existing technologiesUsed array
        const newTechnologies = [...updateInput.images];

        // Remove the technology at the current index
        newTechnologies.splice(ind, 1);

        // Update the input state object with the new array
        setupdateInput({
            ...updateInput, images: newTechnologies
        })
    }

    const deletemodalTag = (e, ind) => {
        e.preventDefault()
        // Create a new array that is a copy of the existing technologiesUsed array
        const newTechnologies = [...updateInput.technologiesUsed];

        // Remove the technology at the current index
        newTechnologies.splice(ind, 1);

        // Update the input state object with the new array
        setupdateInput({
            ...updateInput, technologiesUsed: newTechnologies
        })
    }

    const setTags = (e) => {
        e.preventDefault();
        setTech(e.target.value)
        // console.log(tech);
    }
    const putTech = (e) => {
        e.preventDefault();
        setinput({ ...input, technologiesUsed: [...input.technologiesUsed, tech] })
    };
    const setmodalTags = (e) => {
        e.preventDefault();
        setmodalTech(e.target.value)
        // console.log(tech);
    }
    const putmodalTech = (e) => {
        e.preventDefault();
        setupdateInput({ ...updateInput, technologiesUsed: [...updateInput.technologiesUsed, modaltech] })
    };
    // console.log("input", input)
    return (
        <div>
            <section className="section section-contact ">
                <div className="container">
                    <h2 className="common-heading">Project Details</h2>
                </div>

                <div className="section-contact-main contact-container">

                    <div>
                        <input type="button" onClick={() => settoggle(true)} value="Add Project" className='bg-info w-25' />
                    </div>
                    {toggle &&
                        <>
                            <form onSubmit={saveDetails}>
                                <div className=" grid grid-two-col">
                                    <input type="text" name='name' value={input.name} onChange={(e) => setinput({ ...input, name: e.target.value })} required />
                                    <div className='d-flex align-items-center'><h4>Upload Image</h4><label htmlFor="file-upload" className='custom-file-upload'>
                                        <img src={image || avatar} alt="" className='imageFill' />
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
                                    {input.images.map((elem, ind) => (
                                        <>
                                            <img src={input.images[ind]} className='imgProject' />
                                            <button className='text-light bg-danger'
                                                onClick={(e) => deleteImage(e, ind)}>X</button>
                                        </>
                                    ))}
                                </div>
                                <div className=" grid grid-two-col">
                                    <input type="text" name='title' value={input.title} onChange={(e) => setinput({ ...input, title: e.target.value })} placeholder='Job Title' />
                                </div>
                                <div className=' grid grid-two-col'>
                                    <input type="text" name="startDate" placeholder="startDate" value={input.startDate} onChange={(e) => setinput({ ...input, startDate: e.target.value })} />
                                    <input type="text" name="endDate" placeholder="endDate" value={input.endDate} onChange={(e) => setinput({ ...input, endDate: e.target.value })} />

                                </div>
                                <div>
                                    <textarea name='description' value={input.description} onChange={(e) => setinput({ ...input, description: e.target.value })} ></textarea>
                                </div>
                                <div>
                                    <input type="text" name="role" placeholder="role" value={input.role} onChange={(e) => setinput({ ...input, role: e.target.value })} />
                                </div>
                                <div>
                                    <textarea name='outcomes' value={input.outcomes} onChange={(e) => setinput({ ...input, outcomes: e.target.value })} ></textarea>
                                </div>
                                <div className="tags">
                                    {input.technologiesUsed.map((elem, ind) => (
                                        <>
                                            <button value={input.technologiesUsed[ind]} className='tag_child' >{input.technologiesUsed[ind]}  <i className='fa-solid fa-x' onClick={(e) => deleteTag(e, ind)}></i></button>
                                        </>
                                    ))}
                                </div>
                                <div >
                                    <input type="text" value={tech} onChange={(e) => setTags(e)} />
                                    <button onClick={(e) => putTech(e)} className='setbtn'>SET</button>
                                </div>





                                <div>
                                    <textarea name='technlogiesUsed' value={input.outcomes} onChange={(e) => setinput({ ...input, outcomes: e.target.value })} ></textarea>
                                </div>

                            </form>

                            <div className='grid grid-two-col'>
                                <input type="submit" value="send message" className="update-btn" />

                                <input type="button" value="Close" className="cancel-btn" onClick={() => settoggle(false)} />
                            </div>
                        </>
                    }
                    {userDetails.map((elem, ind) =>
                        <>
                            <div className='detailsCard'>
                                <div className='functionDiv'>
                                    <i className='fa-solid fa-pencil' onClick={() => handleUpdate(ind)}></i>
                                    <i className='fa-solid fa-trash' onClick={() => deleteExp(ind)}></i>
                                </div>
                                <p>{elem.title}</p>
                                <p>{elem.company}</p>
                                <p>{elem.role}</p>
                                <p>{elem.startDate}</p>
                                <p>{elem.endDate}</p>
                                <p>{elem.description}</p>
                                {elem.technologiesUsed.map((element, ind) => (
                                    <p>{element}</p>
                                ))}
                                <p>{elem.outcomes}</p>
                                {elem.images.map((element, ind) => (

                                    <img src={element} className='imgProject' />

                                ))}


                            </div>

                        </>
                    )}
                    {modal ?
                        <>
                            <div className="main_modal">
                                <div className='modal_inside'>
                                    <form onSubmit={updateDetails}>
                                        <div className=" grid">
                                            <input type="text" name='title' value={updateInput.title} onChange={(e) => setupdateInput({ ...updateInput, title: e.target.value })} placeholder='Job Title' />
                                        </div>
                                        <div className=' grid grid-two-col'>
                                            <input type="text" name="startDate" placeholder="startDate" value={updateInput.startDate} onChange={(e) => setupdateInput({ ...updateInput, startDate: e.target.value })} />
                                            <input type="text" name="endDate" placeholder="endDate" value={updateInput.endDate} onChange={(e) => setupdateInput({ ...updateInput, endDate: e.target.value })} />

                                        </div>
                                        <div>
                                            <textarea name='description' value={updateInput.description} onChange={(e) => setupdateInput({ ...updateInput, description: e.target.value })} ></textarea>
                                        </div>
                                        <div>
                                            <input type="text" name="role" placeholder="role" value={updateInput.role} onChange={(e) => setupdateInput({ ...updateInput, role: e.target.value })} />
                                        </div>
                                        <div>
                                            <textarea name='outcomes' value={updateInput.outcomes} onChange={(e) => setupdateInput({ ...updateInput, outcomes: e.target.value })} ></textarea>
                                        </div>
                                        <div className="tags">
                                            {updateInput.technologiesUsed.map((elem, ind) => (
                                                <>
                                                    <button value={updateInput.technologiesUsed[ind]} className='tag_child' >{updateInput.technologiesUsed[ind]} <i className='fa-solid fa-x' onClick={(e) => deletemodalTag(e, ind)}></i></button>

                                                </>
                                            ))}


                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <input type="text" value={modaltech} onChange={(e) => setmodalTags(e)} />
                                            <button onClick={(e) => putmodalTech(e)} className='setbtn'>SET</button>
                                        </div>
                                        <div >
                                            {updateInput.images.map((elem, ind) => (
                                                <>
                                                    <img src={elem} className='imgProject' />
                                                    <i className='fa-solid fa-x mx-2' onClick={(e) => deleteimage(e, ind)}></i>
                                                </>
                                            ))}
                                        </div>

                                        <div>
                                            <textarea name='technlogiesUsed' value={updateInput.outcomes} onChange={(e) => setupdateInput({ ...updateInput, outcomes: e.target.value })} ></textarea>
                                        </div>

                                        <div className='grid grid-two-col'>
                                            <input type="submit" value="send message" className="update-btn" />
                                            <input type="button" value="Close" className="cancel-btn" onClick={() => setmodal(false)} />

                                        </div>

                                    </form>
                                </div>
                            </div>
                        </>
                        : ""
                    }

                </div>
            </section >
        </div >
    )
}

export default ProjectPage