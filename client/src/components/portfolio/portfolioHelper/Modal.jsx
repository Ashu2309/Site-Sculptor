import React, { useState } from 'react';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';


const Modal = ({ userDetails, ind, setModalOpen }) => {

    var [first, setfirst] = useState(0)
    const handleNext = () => {
        if (first < userDetails.projects[ind].images.length - 1) {
            first = first + 1
            setfirst(first);
        }
    }

    const handlePre = () => {
        if (first >= 1) {
            first = first - 1;
            setfirst(first);
        }
    }
    const displayImage = (index) => {
        setfirst(index)
    }
    console.log(userDetails.projects[ind].images)
    return (
        <div className="modalNew">
            <div className="services__modal-content">
                <i className="uil uil-times services__modal-close" onClick={() => setModalOpen(false)}></i>

                {/* <h4 className="services__modal-title">{userDetails.projects[ind].title}</h4> */}

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6">

                            <div className="shadow child_user mx-2 ">

                                <figure className=" userImage_main">
                                    {

                                        userDetails.projects[ind].images.map((item, index) => {
                                            return (
                                                <>
                                                    {(index === first) ? <img className="display" src={item} alt="" /> : ("")}
                                                </>
                                            )
                                        })
                                    }
                                    <div className="imageUser">
                                        <BsChevronLeft onClick={handlePre} />

                                        <BsChevronRight onClick={handleNext} />
                                    </div>

                                </figure>

                                <div className="small_img">
                                    <figure>
                                        {
                                            userDetails.projects[ind].images.map((img, i) => {
                                                return (
                                                    (i >= 0) ? <img src={img} className="m-1" alt=""
                                                        onClick={() => displayImage(i)} /> : ("")
                                                )
                                            })
                                        }
                                        <span> + {userDetails.projects[ind].images.length}</span>

                                    </figure>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div class="modal-content">
                                <h2>{userDetails.projects[ind].title}</h2>
                                <p><strong>Start Date:</strong> {userDetails.projects[ind].startDate}</p>
                                <p><strong>End Date:</strong>{userDetails.projects[ind].endDate}</p>
                                <div class="images">
                                </div>
                                <div>
                                    {userDetails.projects[ind].technologiesUsed.map((elem, ind) => (
                                        <button className='button_tech'>{elem} <i className={`fab fa-${elem.toLowerCase()}`}></i></button>
                                    ))}
                                </div>
                                <p><strong>Role:</strong>{userDetails.projects[ind].role}</p>
                                <p><strong>Outcomes:</strong>{userDetails.projects[ind].outcomes}.</p>
                                <div>
                                    <button className='button_tech bg-dark'>Github <i className='fa-brands fa-github'></i></button>
                                    <button className='button_tech bg-info'>Live <i className='fa fa-link'></i></button>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Modal;