import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../context/UserContext'
import avatar from "../../assets/images/avatar.jpg"

import { useNavigate } from 'react-router-dom'

const ExperiencePage = () => {

    const username = localStorage.getItem("username")
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState([])
    const { saveExpDetails, deleteExpDetails, updateExpDetails, getUserDetails, updateUserDetails } = useContext(UserContext)
    const [active, setActive] = useState("Home")
    const [toggle, settoggle] = useState(false)
    const [modal, setmodal] = useState(false)
    const [indexUpadte, setindexUpdate] = useState()



    const [input, setinput] = useState({
        title: "",
        company: "",
        companyLocation: "",
        startDate: "",
        endDate: "",
        description: "",
    })
    const [updateInput, setupdateInput] = useState({
        title: "",
        company: "",
        companyLocation: "",
        startDate: "",
        endDate: "",
        description: "",
    })
    const getdata = async () => {

        const response = await getUserDetails(username);
        setUserDetails(response.data.experience);

    }
    useEffect(() => {
        getdata();
    }, [])



    const saveDetails = async (e) => {
        e.preventDefault();

        const response = await saveExpDetails(input);
        getdata()
    }
    const deleteExp = async (ind) => {
        const response = await deleteExpDetails(ind)
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
        const response = await updateExpDetails(objectInp);
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

    console.log(updateInput)
    return (
        <div>
            <section className="section section-contact ">
                <div className="container">
                    <h2 className="common-heading">Experience Details</h2>
                </div>

                <div className="section-contact-main contact-container">

                    <div>
                        <input type="button" onClick={() => settoggle(true)} value="Add Experience" className='bg-info w-25' />
                    </div>
                    {toggle &&
                        <>
                            <form onSubmit={saveDetails}>
                                <div className=" grid grid-two-col">
                                    <input type="text" name='title' value={input.title} onChange={(e) => setinput({ ...input, title: e.target.value })} placeholder='Job Title' />
                                </div>
                                <div>
                                    <input type="text" name="company" placeholder="company" value={input.company} onChange={(e) => setinput({ ...input, company: e.target.value })} />
                                </div>
                                <div className=' grid grid-two-col'>
                                    <input type="text" name="companyLocation" placeholder="companyLocation" value={input.companyLocation} onChange={(e) => setinput({ ...input, companyLocation: e.target.value })} />
                                    <input type="text" name="degree" placeholder="degree" value={input.degree} onChange={(e) => setinput({ ...input, degree: e.target.value })} />

                                </div>
                                <div className=' grid grid-two-col'>
                                    <input type="text" name="startDate" placeholder="startDate" value={input.startDate} onChange={(e) => setinput({ ...input, startDate: e.target.value })} />
                                    <input type="text" name="endDate" placeholder="endDate" value={input.endDate} onChange={(e) => setinput({ ...input, endDate: e.target.value })} />

                                </div>
                                <div>
                                    <textarea name='description' value={input.description} onChange={(e) => setinput({ ...input, description: e.target.value })} ></textarea>
                                </div>

                                <div>
                                    <input type="submit" value="send message" className="btn" />
                                </div>
                            </form>

                            <div>
                                <input type="button" value="Close" className="btn w-25" onClick={() => settoggle(false)} />
                            </div>
                        </>
                    }

                    {userDetails.map((elem, ind) =>
                        <>
                            <div className='bg-light border'>
                                <div><button className='btn' onClick={() => handleUpdate(ind)}>Edit</button>
                                    <button className='btn' onClick={() => deleteExp(ind)}>Delete</button></div>
                                <p>{elem.title}</p>
                                <p>{elem.company}</p>
                                <p>{elem.companyLocation}</p>
                                <p>{elem.startDate}</p>
                                <p>{elem.endDate}</p>
                                <p>{elem.description}</p>

                            </div>

                        </>
                    )}
                    {modal ?
                        <>
                            <div className="main_modal">
                                <div className='modal_inside'>
                                    <form>
                                        <div className=" grid grid-two-col">
                                            <input type="text" name='title' value={updateInput.title} onChange={(e) => setupdateInput({ ...updateInput, title: e.target.value })} placeholder='Job Title' />
                                        </div>
                                        <div>
                                            <input type="text" name="company" placeholder="company" value={updateInput.company} onChange={(e) => setupdateInput({ ...updateInput, company: e.target.value })} />
                                        </div>
                                        <div className=' grid grid-two-col'>
                                            <input type="text" name="companyLocation" placeholder="companyLocation" value={updateInput.companyLocation} onChange={(e) => setupdateInput({ ...updateInput, companyLocation: e.target.value })} />
                                            <input type="text" name="degree" placeholder="degree" value={updateInput.degree} onChange={(e) => setupdateInput({ ...updateInput, degree: e.target.value })} />

                                        </div>
                                        <div className=' grid grid-two-col'>
                                            <input type="text" name="startDate" placeholder="startDate" value={updateInput.startDate} onChange={(e) => setupdateInput({ ...updateInput, startDate: e.target.value })} />
                                            <input type="text" name="endDate" placeholder="endDate" value={updateInput.endDate} onChange={(e) => setupdateInput({ ...updateInput, endDate: e.target.value })} />

                                        </div>



                                        <div>
                                            <textarea name='description' value={updateInput.description} onChange={(e) => setupdateInput({ ...updateInput, description: e.target.value })} ></textarea>
                                        </div>

                                        <div>
                                            <input type="button" value="send message" className="btn" onClick={updateDetails} />
                                        </div>
                                    </form>

                                    <div>
                                        <input type="button" value="Close" className="btn w-25" onClick={() => setmodal(false)} />
                                    </div>
                                </div>
                            </div>
                        </>
                        : ""
                    }


                </div>
            </section>
        </div>
    )
}

export default ExperiencePage