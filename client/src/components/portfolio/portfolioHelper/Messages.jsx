import React, { useEffect, useState, useContext } from 'react'
import Navbar from '../../Navbar'
import UserContext from '../../context/UserContext'

const Messages = () => {
    const [msg, setmsg] = useState([]);
    const { getMsg, deleteContactDetails } = useContext(UserContext)

    useEffect(() => {
        getMessages();
    }, [])
    const getMessages = async () => {
        const response = await getMsg();
        setmsg(response.data)
    }
    const deleteMsg = async (ind) => {
        try {
            await deleteContactDetails(ind);
            // Remove the deleted message from the state
            setmsg((prevMsg) => prevMsg.filter((_, index) => index !== ind));
        } catch (error) {
            console.error(error);
        }
    };
    console.log(msg)

    return (
        <div>
            <Navbar />
            <div className="mainMsg container_fluid">
                <div className="row justify-content-center">
                    <div className="messages col-10 p-5">
                        <h1 className='mb-3'>Messages</h1>
                        {msg.map((elem, ind) => {
                            // Convert the timestamp string to a Date object
                            const messageDate = new Date(elem.timestamp);

                            // Extract date and time components
                            const date = messageDate.toLocaleDateString(); // Format: MM/DD/YYYY
                            const time = messageDate.toLocaleTimeString(); // Format: HH:MM:SS AM/PM

                            return (
                                <div className="container_fluid my-2" key={ind}>
                                    <div className="row">
                                        <div className="left_block col-4 p-2">
                                            <div className="short_block ">
                                                <h5>{elem.name}</h5>
                                                <div className="d-flex justify-content-between">
                                                    <p>{date}</p>
                                                    <p>{time}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="right_block col-7">
                                            <div className="d-flex justify-content-between">
                                                <h4 className="subject">{elem.subject}</h4>
                                                <i class="fa-solid fa-trash text-danger" onClick={() => deleteMsg(ind)}></i>
                                            </div>
                                            <p className='msgBlock'>{elem.message}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}



                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messages