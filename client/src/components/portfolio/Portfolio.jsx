import React, { useContext, useEffect, useState } from 'react';
import Modal from './portfolioHelper/Modal'
import Navbar from '../Navbar';
import UserContext from '../context/UserContext';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper/core';
SwiperCore.use([Pagination, Navigation, Autoplay]);

const Portfolio = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const openModal = (projectIndex) => {
        console.log(projectIndex)
        setSelectedProject(projectIndex);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedProject(null);
    };


    const [userDetails, setUserDetails] = useState([])
    const { getUserDetails } = useContext(UserContext)
    const username = useParams();
    localStorage.setItem("param", username.user)
    console.log(username.user)

    const getdata = async () => {

        const response = await getUserDetails(username.user);
        setUserDetails(response.data);
        document.documentElement.style.setProperty('--helper', response.data.mainColor);
        document.documentElement.style.setProperty('--gradient', response.data.background);
        document.documentElement.style.setProperty('--textStyle', response.data.textStyle);
        document.documentElement.style.setProperty('--textColor', response.data.textColor);
        document.documentElement.style.setProperty('--heading', response.data.headColor);
        document.documentElement.style.setProperty('--mainBackground', response.data.mainBackground);
        document.documentElement.style.setProperty('--bg', response.data.mainBackground2);
    }
    useEffect(() => {
        getdata();
    }, [])
    /*==================== MENU SHOW Y HIDDEN ====================*/
    const navMenu = document.getElementById("nav-menu");
    const navToggle = document.getElementById("nav-toggle");
    const navClose = document.getElementById("nav-close");

    /*===== MENU SHOW =====*/
    /* Validate if constant exists */
    if (navToggle) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.add("show-menu");
        });
    }

    /*===== MENU HIDDEN =====*/
    /* Validate if constant exists */
    if (navClose) {
        navClose.addEventListener("click", () => {
            navMenu.classList.remove("show-menu");
        });
    }

    /*==================== REMOVE MENU MOBILE ====================*/
    const navLink = document.querySelectorAll(".nav__link");

    function linkAction() {
        const navMenu = document.getElementById("nav-menu");
        // When we click on each nav__link, we remove the show-menu class
        navMenu.classList.remove("show-menu");
    }
    navLink.forEach((n) => n.addEventListener("click", linkAction));

    /*==================== ACCORDION SKILLS ====================*/
    const skillsContent = document.getElementsByClassName("skills__content");
    const skillsHeader = document.querySelectorAll(".skills__header");

    function toggleSkills() {
        let itemClass = this.parentNode.className;

        for (var i = 0; i < skillsContent.length; i++) {
            skillsContent[i].className = "skills__content skills__close";
        }

        if (itemClass === "skills__content skills__close") {
            this.parentNode.className = "skills__content skills__open";
        }
    }

    skillsHeader.forEach((el) => {
        el.addEventListener("click", toggleSkills);
    });

    /*==================== QUALIFICATION TABS ====================*/
    const tabs = document.querySelectorAll("[data-target]");
    const tabContents = document.querySelectorAll("[data-content]");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const target = document.querySelector(tab.dataset.target);

            tabContents.forEach((tabContent) => {
                tabContent.classList.remove("qualification__active");
            });
            target.classList.add("qualification__active");

            tabs.forEach((tab) => {
                tab.classList.remove("qualification__active");
            });
            tab.classList.add("qualification__active");
        });
    });

    /*==================== SERVICES MODAL ====================*/
    const modalViews = document.querySelectorAll(".services__modal");
    const modalBtns = document.querySelectorAll(".services__button");
    const modalCloses = document.querySelectorAll(".services__modal-close");

    let modal = function (modalClick) {
        modalViews[modalClick].classList.add("active-modal");
    };

    modalBtns.forEach((modalBtn, index) => {
        modalBtn.addEventListener("click", () => {
            modal(index);
        });
    });

    modalCloses.forEach((modalClose, index) => {
        modalClose.addEventListener("click", () => {
            modalViews.forEach((modalView) => {
                modalView.classList.remove("active-modal");
            });
        });
    });

    /*==================== PORTFOLIO SWIPER  ====================*/
    // var swiperPortfolio = new Swiper(".portfolio__container", {
    //     cssMode: true,
    //     loop: true,

    //     navigation: {
    //         nextEl: ".swiper-button-next",
    //         prevEl: ".swiper-button-prev",
    //     },
    //     pagination: {
    //         el: ".swiper-pagination",
    //         clickable: true,
    //     },
    // });

    /*==================== TESTIMONIAL ====================*/
    // var swiperTestimonial = new Swiper(".testimonial__container", {
    //     loop: true,
    //     grabCursor: true,
    //     spaceBetween: 48,

    //     pagination: {
    //         el: ".swiper-pagination",
    //         clickable: true,
    //         dynamicBullets: true,
    //     },
    //     breakpoints: {
    //         568: {
    //             slidesPerView: 2,
    //         },
    //     },
    // });

    /*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
    // const sections = document.querySelectorAll("section[id]");

    // function scrollActive() {
    //     const scrollY = window.pageYOffset;

    //     sections.forEach((current) => {
    //         const sectionHeight = current.offsetHeight;
    //         const sectionTop = current.offsetTop - 50;
    //         var sectionId = current.getAttribute("id");

    //         if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
    //             document
    //                 .querySelector(".nav__menu a[href*=" + sectionId + "]")
    //                 .classList.add("active-link");
    //         } else {
    //             document
    //                 .querySelector(".nav__menu a[href*=" + sectionId + "]")
    //                 .classList.remove("active-link");
    //         }
    //     });
    // }
    // window.addEventListener("scroll", scrollActive);

    /*==================== CHANGE BACKGROUND HEADER ====================*/
    // function scrollHeader() {
    //     const nav = document.getElementById("header");
    //     // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    //     if (this.scrollY >= 80) nav.classList.add("scroll-header");
    //     else nav.classList.remove("scroll-header");
    // }
    // window.addEventListener("scroll", scrollHeader);

    /*==================== SHOW SCROLL UP ====================*/
    // function scrollUp() {
    //     const scrollUp = document.getElementById("scroll-up");
    //     // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    //     if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
    //     else scrollUp.classList.remove("show-scroll");
    // }
    // window.addEventListener("scroll", scrollUp);

    /*==================== DARK LIGHT THEME ====================*/
    const themeButton = document.getElementById("theme-button");
    const darkTheme = "dark-theme";
    const iconTheme = "uil-sun";

    // Previously selected topic (if user selected)
    const selectedTheme = localStorage.getItem("selected-theme");
    const selectedIcon = localStorage.getItem("selected-icon");

    // We obtain the current theme that the interface has by validating the dark-theme class
    const getCurrentTheme = () =>
        document.body.classList.contains(darkTheme) ? "dark" : "light";
    const getCurrentIcon = () =>
        themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

    // We validate if the user previously chose a topic
    if (selectedTheme) {
        // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
        document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
            darkTheme
        );
        themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
            iconTheme
        );
    }

    // Activate / deactivate the theme manually with the button
    // themeButton.addEventListener("click", () => {
    //     // Add or remove the dark / icon theme
    //     document.body.classList.toggle(darkTheme);
    //     themeButton.classList.toggle(iconTheme);
    //     // We save the theme and the current icon that the user chose
    //     localStorage.setItem("selected-theme", getCurrentTheme());
    //     localStorage.setItem("selected-icon", getCurrentIcon());
    // });
    console.log(userDetails)
    return (
        <>
            <Navbar />
            <nav className="nav container">
                <a href="#" className="nav__logo">{userDetails.name}</a>

                <div className="nav__menu" id="nav-menu">
                    <ul className="nav__list grid">
                        <li className="nav__item">
                            <a href="#home" className="nav__link active-link">
                                <i className="uil uil-estate nav__icon"></i> Home
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#about" className="nav__link">
                                <i className="uil nav__icon uil-user"></i> About
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#skills" className="nav__link">
                                <i className="uil nav__icon uil-file-alt"></i> Skills
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#services" className="nav__link">
                                <i className="uil nav__icon uil-briefcase-alt"></i> Services
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#portfolio" className="nav__link">
                                <i className="uil nav__icon uil-scenery"></i> Portfolio
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#contact" className="nav__link">
                                <i className="uil nav__icon uil-message"></i> Contactme
                            </a>
                        </li>
                    </ul>
                    <i className="uil uil-times nav__close" id="nav-close"></i>
                </div>

                <div className="nav__btns">

                    <i className="uil uil-moon change-theme" id="theme-button"></i>

                    <div className="nav__toggle" id="nav-toggle">
                        <i className="uil uil-apps"></i>
                    </div>
                </div>
            </nav>

            <main className="main">

                <section className="home section" id="home">
                    <div className="home__container container grid">
                        <div className="home__content grid">
                            <div className="home__social">
                                <a href="https://www.linkedin.com" target="_blank" className="home__social-icon">
                                    <i className="uil uil-linkedin-alt"></i>
                                </a>
                                <a href="https://www.dribbble.com" target="_blank" className="home__social-icon">
                                    <i className="uil uil-dribbble"></i>
                                </a>
                                <a href="https://www.github.com" target="_blank" className="home__social-icon">
                                    <i className="uil uil-github-alt"></i>
                                </a>
                            </div>

                            <div className="home__img">
                                <img src={userDetails.profileImage} alt="" className="about__img" />

                            </div>


                            <div className="home__data">
                                <h1 className="home__title">Hi, I'm {userDetails.name}</h1>
                                <h3 className="home__subtitle">{userDetails.job}</h3>
                                <p className="home__description">
                                    {userDetails.description}
                                </p>
                                <a href="#contact" className="button button--flex">
                                    Contact Me <i className="uil uil-message button__icon"></i>
                                </a>
                            </div>
                        </div>

                        <div className="home__scroll">
                            <a href="#about" className="home__scroll-button button--flex">
                                <i className="uil uil-mouse-alt home__scroll-mouse"></i>
                                <span className="home__scroll-name">Scroll down</span>
                                <i className="uil uil-arrow-down home__scroll-arrow"></i>
                            </a>
                        </div>
                    </div>
                </section>

                <section className="about section" id="about">
                    <h2 className="section__title">About Me</h2>
                    <span className="section__subtitle">My introduction</span>
                    <div className='bg-light shadow'>

                        <div className="about__container container-fluid p-5 grid">
                            <img src={userDetails.AboutusImage} alt="" className="about__img" />



                            <div className="about__data">
                                <p className="about__description">{userDetails.aboutusDescription}
                                </p>
                                <div className="about__info">
                                    <div>
                                        <span className="about__info-title">08+</span>
                                        <span className="about__info-name">Years <br></br> experience</span>
                                    </div>
                                    <div>
                                        <span className="about__info-title">20+</span>
                                        <span className="about__info-name">Completed <br></br> project</span>
                                    </div>
                                    <div>
                                        <span className="about__info-title">05+</span>
                                        <span className="about__info-name">Companies <br></br> worked</span>
                                    </div>
                                </div>

                                <div className="about__buttons">
                                    <a download="" href="assets/pdf/Alexa-Cv.pdf" className="button button--flex">
                                        Download CV<i className="uil uil-download-alt button__icon"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

                <section className="skills section" id="skills">
                    <h2 className="section__title">Skills</h2>
                    <span className="section__subtitle">My technical level</span>
                    <div className='bg-light p-5 shadow'>

                        <div className="skills__container container grid">
                            {Array.isArray(userDetails.experience) ? (

                                userDetails.skills.map((elem, ind) =>

                                    <div className="skills__content skills__open">
                                        <div className="skills__header">
                                            <i className="uil uil-brackets-curly skills__icon"></i>

                                            <div>
                                                <h1 className="skills__title">{elem.title}</h1>
                                                <span className="skills__subtitle">{elem.experience}</span>
                                            </div>

                                            <i className="uil uil-angle-down skills__arrow" ></i>
                                        </div>

                                        <div className="skills__list grid">
                                            {elem.skillsname.map((element, i) => (
                                                <div className="skills__data">
                                                    <div className="skills__titles">
                                                        <h3 className="skills_name">{element.name}</h3>
                                                        <span className="skills__number">{element.percentage}%</span>
                                                    </div>
                                                    <div className="skills__bar">
                                                        <span className="skills__percentage" style={{ width: `${element.percentage}%` }}></span>

                                                    </div>
                                                </div>

                                            ))}
                                        </div>
                                    </div>
                                )

                            ) : null}



                        </div>
                    </div>
                </section>

                <section className="qualification section">
                    <h2 className="section__title">Qualification</h2>
                    <span className="section__subtitle">My persolan journey</span>

                    <div className="qualification__container container">
                        <div className="qualification__tabs">
                            <div className="qualification__button button--flex qualification__active" data-target="#education">
                                <i className="uil uil-graduation-cap qualification__icon"></i>
                                Education
                            </div>
                            <div className="qualification__button button--flex" data-target="#work">
                                <i className="uil uil-briefcase-alt qualification__icon"></i>
                                Work
                            </div>
                        </div>
                        <div className="qualification__sections">

                            <div className="qualification__content qualification__active" data-content id="education">

                                <div className="qualification__data">
                                    <div>
                                        <h3 className="qualification__title">Computer Enginner</h3>
                                        <span className="qualification__subtitle">Peru - University</span>
                                        <div className="qualification__calendar">
                                            <i className="uil uil-calendar-alt"></i>
                                            2009 - 2014
                                        </div>
                                    </div>

                                    <div>
                                        <span className="qualification__rounder"></span>
                                        <span className="qualification__line"></span>
                                    </div>
                                </div>

                                <div className="qualification__data">
                                    <div></div>

                                    <div>
                                        <span className="qualification__rounder"></span>
                                        <span className="qualification__line"></span>
                                    </div>

                                    <div>
                                        <h3 className="qualification__title">Web Design</h3>
                                        <span className="qualification__subtitle">Spain - Institute</span>
                                        <div className="qualification__calendar">
                                            <i className="uil uil-calendar-alt"></i>
                                            2014 - 2017
                                        </div>
                                    </div>
                                </div>


                            </div>
                            {Array.isArray(userDetails.experience) ? (
                                <div className="qualification__content" data-content id="work">
                                    {userDetails.experience.map((elem, ind) => (
                                        ind % 2 === 0 ? (
                                            <React.Fragment key={ind}>
                                                <div className="qualification__data">
                                                    <div>
                                                        <h3 className="qualification__title">{elem.title}</h3>
                                                        <span className="qualification__subtitle">{elem.company} - {elem.companyLocation}</span>
                                                        <div className="qualification__calendar">
                                                            <i className="uil uil-calendar-alt"></i>
                                                            2016 - 2018
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span className="qualification__rounder"></span>
                                                        <span className="qualification__line"></span>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment key={ind}>
                                                <div className="qualification__data">
                                                    <div></div>
                                                    <div>
                                                        <span className="qualification__rounder"></span>
                                                        <span className="qualification__line"></span>
                                                    </div>
                                                    <div>
                                                        <h3 className="qualification__title">{elem.title}</h3>
                                                        <span className="qualification__subtitle">{elem.company} - {elem.companyLocation}</span>
                                                        <div className="qualification__calendar">
                                                            <i className="uil uil-calendar-alt"></i>
                                                            2018 - 2020
                                                        </div>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        )
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </section>



                {/* <Projects userDetails={userDetails} /> */}
                <section className="portfolio section" id="portfolio">
                    <h2 className="section__title">Portfolio</h2>
                    <span className="section__subtitle">Most recent work</span>

                    <div className="portfolio__container container-fluid text-center">
                        <div className='row justify-content-center'>
                            <div className='col-lg-10'>
                                {Array.isArray(userDetails.projects) ? (
                                    <Swiper
                                        spaceBetween={50}
                                        slidesPerView={1}
                                        centeredSlides
                                        loop={true}
                                        autoplay={{ delay: 3000 }}
                                        navigation={{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }}
                                        onSlideChange={() => console.log('slide change')}
                                    >
                                        {userDetails.projects.map((elem, ind) => (
                                            <SwiperSlide key={ind}>
                                                <div className="portfolio__content grid swiper-slide">
                                                    <img src={elem.images[0]} alt="" className="portfolio__img" />

                                                    <div className="portfolio__data">
                                                        <h3 className="portfolio__title">{elem.title}</h3>
                                                        <p className="portfolio__description">{elem.description}</p>
                                                        <span className="button button--flex button--small button--link portfolio__button" onClick={() => openModal(ind)}>
                                                            View More
                                                            <i className="uil uil-arrow-right button__icon"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </section>
                {modalOpen && (
                    <>
                        <Modal userDetails={userDetails} ind={selectedProject} setModalOpen={setModalOpen} />
                    </>
                )}



                <section className="project section">
                    <div className="project__bg">
                        <div className="project__container container grid">
                            <div className="project__data">
                                <h2 className="project__title">You have a new project</h2>
                                <p className="project__description">
                                    Contact me now and get a 30% discount on your new project.
                                </p>
                                <a href="#contact" className="button button--flex button--white">
                                    Contact Me
                                    <i className="uil uil-message button__icon .project__icon"></i>
                                </a>
                            </div>
                            <img src={require("../assets/img/project.png")} alt="" className="project__img" />
                        </div>
                    </div>
                </section>



                <section className="contact section" id="contact">
                    <div className="section__title">Contact Me</div>
                    <span className="section__subtitle">Get in touch</span>

                    <div className="contact__container container grid bg-light p-5 shadow">
                        <div>
                            <div className="contact__information">
                                <i className="uil uil-phone contact__icon"></i>

                                <div>
                                    <h3 className="contact__title">Call Me</h3>
                                    <span className="contact__subtitle">999-777-666</span>
                                </div>
                            </div>
                            <div className="contact__information">
                                <i className="uil uil-envelope contact__icon"></i>

                                <div>
                                    <h3 className="contact__title">Email</h3>
                                    <span className="contact__subtitle">alexa@email.com</span>
                                </div>
                            </div>
                            <div className="contact__information">
                                <i className="uil uil-map-marker contact__icon"></i>

                                <div>
                                    <h3 className="contact__title">Location</h3>
                                    <span className="contact__subtitle">Peru - Lima Av. Boliviar #123</span>
                                </div>
                            </div>
                        </div>

                        <form action="" className=".contact__form grid">
                            <div className="contact__inputs grid">
                                <div className="contact__content">
                                    <label for="" className="contact__label">Name</label>
                                    <input type="text" className="contact__input" />
                                </div>
                                <div className="contact__content">
                                    <label for="" className="contact__label">Email</label>
                                    <input type="email" className="contact__input" />
                                </div>
                            </div>
                            <div className="contact__content">
                                <label for="" className="contact__label">Project</label>
                                <input type="text" className="contact__input" />
                            </div>
                            <div className="contact__content">
                                <label for="" className="contact__label">Message</label>
                                <textarea name="" id="" cols="0" rows="7" className="contact__input"></textarea>
                                <input type="text" className="contact__input" />
                            </div>

                            <div>
                                <a href="#" className="button button--flex">
                                    Send Message
                                    <i className="uil uil-message button__icon"></i>
                                </a>
                            </div>
                        </form>
                    </div>
                </section>
                <footer className="footer">
                    <div className="footer__bg">
                        <div className="footer__container container grid">
                            <div>
                                <h1 className="footer__title">Alexa</h1>
                                <span className="footer__subtitle">Frontend developer</span>
                            </div>

                            <ul className="footer__links">
                                <li>
                                    <a href="#services" className="footer__link">Services</a>
                                </li>
                                <li>
                                    <a href="#portfolio" className="footer__link">Potfolio</a>
                                </li>
                                <li>
                                    <a href="#contact" className="footer__link">Contactme</a>
                                </li>
                            </ul>

                            <div className="footer__socials">
                                <a href="https://www.facebook.com/" target="_blank" className="footer__social">
                                    <i className="uil uil-facebook-f"></i>
                                </a>
                                <a href="https://www.instagram.com/" target="_blank" className="footer__social">
                                    <i className="uil uil-instagram"></i>
                                </a>
                                <a href="https://www.twitter.com/" target="_blank" className="footer__social">
                                    <i className="uil uil-twitter-alt"></i>
                                </a>
                            </div>

                            <p className="footer__copy">&#169; Bedimcode. All right reserved</p>
                        </div>
                    </div>
                </footer>
            </main >



            <a href="#" className="scrollup" id="scroll-up">
                <i className="uil uil-arrow-up scrollup__icon"></i>
            </a>
        </>
    )
}

export default Portfolio