import React from 'react'

const SideNav = ({ active, setActive }) => {
    console.log(active)
    return (
        <div className='side_nav'>
            <div className='side_child'>
                <ul>
                    <li className={active === "Home" ? "active" : ""} onClick={() => setActive("Home")}>Home</li><span></span>
                    <li className={active === "About" ? "active" : ""} onClick={() => setActive("About")}>AboutUs</li><span></span>
                    <li className={active === "Skills" ? "active" : ""} onClick={() => setActive("Skills")}>Skills</li><span></span>
                    <li className={active === "Project" ? "active" : ""} onClick={() => setActive("Project")}>Project</li><span></span>
                    <li className={active === "Experience" ? "active" : ""} onClick={() => setActive("Experience")}>Expereince</li><span></span>
                    <li className={active === "Contact" ? "active" : ""} onClick={() => setActive("Contact")}>Contact Us</li>
                </ul>
            </div>
        </div>
    )
}

export default SideNav
