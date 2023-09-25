import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../context/UserContext'
import avatar from "../../assets/images/avatar.jpg"

import { useNavigate } from 'react-router-dom'

const SkillsPage = () => {

    const username = localStorage.getItem("username")
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState([])
    const { saveSkillDetails, deleteSkillDetails, updateSkillDetails, getUserDetails, updateUserDetails } = useContext(UserContext)
    const [active, setActive] = useState("Home")
    const [toggle, settoggle] = useState(false)
    const [modal, setmodal] = useState(false)
    const [indexUpadte, setindexUpdate] = useState()
    const [tech, setTech] = useState({ name: "", percentage: "" })
    const [updatetech, setupdateTech] = useState({ name: "", percentage: "" })


    const [input, setinput] = useState({
        title: "",
        experience: "",
        skillsname: [
        ],
    });

    const [updateInput, setupdateInput] = useState({
        title: "Graphic Designer",
        experience: "5 years",
        skillsname: [
        ],
    });
    const getdata = async () => {

        const response = await getUserDetails(username);
        setUserDetails(response.data.skills);

    }
    useEffect(() => {
        getdata();
    }, [])



    const saveDetails = async (e) => {
        e.preventDefault();

        const response = await saveSkillDetails(input);
        getdata()
    }
    const deleteSkills = async (ind) => {
        const response = await deleteSkillDetails(ind)
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
        const response = await updateSkillDetails(objectInp);
        getdata()
        setmodal(false)
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
        const file = e.target.files[0];
        const base64String = await convertToBase64(file);
        setinput({ ...input, AboutusImage: base64String })
    }

    const handleSkillsChange = (e, skillIndex, field) => {
        const { value } = e.target;
        const updatedInput = { ...input };
        updatedInput.skillsname[skillIndex][field] = value;
        setinput(updatedInput);
    };
    const deleteUpdateTag = (index) => {
        const updatedSkills = [...updateInput.skillsname];
        updatedSkills.splice(index, 1);
        setupdateInput({
            ...updateInput,
            skillsname: updatedSkills
        });
    }

    // console.log(userDetails)
    const deleteTag = (index) => {
        const updatedSkills = [...input.skillsname];
        updatedSkills.splice(index, 1);
        setinput({
            ...input,
            skillsname: updatedSkills
        });
    }

    const setName = (e) => {
        setTech({ ...tech, name: e.target.value });
    }

    const setPercentage = (e) => {
        setTech({ ...tech, percentage: e.target.value });
    }
    const setupdateName = (e) => {
        setupdateTech({ ...updatetech, name: e.target.value });
    }

    const setupdatePercentage = (e) => {
        setupdateTech({ ...updatetech, percentage: e.target.value });
    }

    const putTech = (e) => {
        e.preventDefault();
        if (tech.name !== "" && tech.percentage !== "") {
            setinput({
                ...input,
                skillsname: [...input.skillsname, tech]
            });
            setTech({ name: "", percentage: "" });
        }
    }
    const putupdateTech = (e) => {
        e.preventDefault();
        if (updatetech.name !== "" && updatetech.percentage !== "") {
            setupdateInput({
                ...updateInput,
                skillsname: [...updateInput.skillsname, updatetech]
            });
            setupdateTech({ name: "", percentage: "" });
        }
    }
    console.log(updatetech)
    // const setmodalTags = (e) => {
    //     e.preventDefault();
    //     setmodalTech(e.target.value)
    //     // console.log(tech);
    // }
    // const putmodalTech = (e) => {
    //     e.preventDefault();
    //     setupdateInput({ ...updateInput, technologiesUsed: [...updateInput.technologiesUsed, modaltech] })
    // };
    console.log(input)
    return (
        <div>
            <section className="section section-contact ">
                <div className="container">
                    <h2 className="common-heading">Skills Details</h2>
                </div>

                <div className="section-contact-main contact-container">

                    <div>
                        <input type="button" onClick={() => settoggle(true)} value="Add Skills" className='bg-info w-25' />
                    </div>
                    {toggle &&
                        <>
                            <form onSubmit={saveDetails}>
                                <div className=" grid grid-two-col">
                                    <input type="text" name='title' value={input.title} onChange={(e) => setinput({ ...input, title: e.target.value })} placeholder='Job Title' />
                                    <input type="text" name="experience" placeholder="experience" value={input.experience} onChange={(e) => setinput({ ...input, experience: e.target.value })} />

                                </div>
                                {/* Add more input fields for skills */}
                                {input.skillsname.length > 0 && (
                                    input.skillsname.map((elem, ind) => (
                                        <div key={ind}>
                                            <button value={input.skillsname[ind]} className='tag_child'>
                                                {input.skillsname[ind].name} -  {input.skillsname[ind].percentage}
                                                <i className='fa-solid fa-x' onClick={(e) => deleteTag(e, ind)} ></i>
                                            </button>
                                        </div>
                                    ))
                                )}



                                <div className='grid grid-two-col'>
                                    <input type="text" value={tech.name} onChange={setName} placeholder="Skill Name" />
                                    <input type="text" value={tech.percentage} onChange={setPercentage} placeholder="Skill Percentage" />
                                    <button onClick={putTech} className='setbtn'>SET</button>
                                </div>


                                <div className='grid grid-two-col'>
                                    <input type="submit" value="send message" className="update-btn" />
                                    <input type="button" value="Close" className="cancel-btn" onClick={() => settoggle(false)} />

                                </div>
                            </form>
                        </>
                    }

                    {userDetails.map((elem, ind) =>
                        <>
                            <div className='detailsCard'>
                                <div className='functionDiv'>
                                    <i className='fa-solid fa-pencil' onClick={() => handleUpdate(ind)}></i>
                                    <i className='fa-solid fa-trash' onClick={() => deleteSkills(ind)}></i>
                                </div>
                                <h4>{elem.title}</h4>
                                {elem.skillsname.map((element, ind) =>
                                    <>
                                        <span>{element.name} - </span>
                                        <span>{element.percentage}</span><br></br>

                                    </>)}

                            </div>

                        </>
                    )}
                    {modal ?
                        <>
                            <div className="main_modal">
                                <div className='modal_inside'>
                                    <form>
                                        <div className=" grid grid-two-col">
                                            <input type="text" name='title' value={updateInput.title} onChange={(e) => setupdateInput({ ...updateInput, title: e.target.value })} placeholder='Skill Title' />
                                        </div>
                                        <div>
                                            <input type="text" name="experience" placeholder="experience" value={updateInput.experience} onChange={(e) => setupdateInput({ ...updateInput, experience: e.target.value })} />
                                        </div>

                                        {/* Add more input fields for skills */}
                                        {updateInput.skillsname.length > 0 && (
                                            updateInput.skillsname.map((elem, ind) => (
                                                <div key={ind}>
                                                    <button value={updateInput.skillsname[ind]} className='tag_child'>
                                                        {updateInput.skillsname[ind].name} -  {updateInput.skillsname[ind].percentage}
                                                        <i className='fa-solid fa-x' onClick={(e) => deleteUpdateTag(ind)} ></i>
                                                    </button>
                                                </div>
                                            ))
                                        )}



                                        <div className='grid grid-two-col'>
                                            <input type="text" value={updatetech.name} onChange={setupdateName} placeholder="Skill Name" />
                                            <input type="text" value={updatetech.percentage} onChange={setupdatePercentage} placeholder="Skill Percentage" />
                                            <button onClick={putupdateTech} className='setbtn'>SET</button>
                                        </div>


                                        <div className='grid grid-two-col'>
                                            <input type="button" value="send message" className="update-btn" onClick={updateDetails} />

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

export default SkillsPage