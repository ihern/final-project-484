import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import './styles/loginStyle.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const ClientDashboard = () => {
    const navigate = useNavigate();
    const [ events, setEvents ] = useState<Event[]>([]);

    interface Event {
        name: string;
        date_time: Date;
        location: string;
        description: string;
        registration_deadline: Date;
    }

    const getEvents = async () => {
        try {
            const { data, error } = await supabase.from('events').select('*');
            if (data) {
                setEvents(data);
            } else {
                console.log('No data fectched:', error);
            }
        } catch (error) {
            console.log("Error checking session", error);
        }
    };

    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) {
                    navigate('/', { replace: true });
                }
            } catch (error) {
                console.log("Error checking session", error);
            }
        };
        checkSession();
        getEvents();
    }, [navigate]);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            navigate('/', { replace: true });
        }
    };

    // const handleCheckIn = () => {
    //     // Add logic for check-in here
    //     console.log('Checking In...');
    // };

    return (
        <div className="landing-page">

        {/* <!-- Navbar --> */}
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-custom">
        <div className="container">
            <a href="#" className="navbar-brand">Media Naranja Speed Dating</a>
            {/* <!-- Hamburger Button --> */}
            <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
            >
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                <a onClick={() => navigate('/client/profile')} className="nav-link">Profile</a>
                </li>
                <li className="nav-item">
                <a href="#schedule" className="nav-link">Schedule</a>
                </li>
                <li className="nav-item">
                <a href="#questions" className="nav-link">Questions</a>
                </li>
                <li className="nav-item">
                <a onClick={handleLogout} className="btn btn-danger">Logout</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>

        {/* <!-- Showcase --> */}
        <section
        className="bg-custom text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start "
        >
        <div className="container">
            <div className="d-sm-flex align-items-center justify-content-between">
            <div>
                <h1>Get ready to <span className="text-warning"> mingle </span></h1>
                <p className="lead my-3">
                Dress to impress. Be yourself. Have fun.
                </p>
                <a
                className="btn btn-primary btn-lg"
                href="https://www.instagram.com/medianaranjachicago/"
                target="_blank"
                rel="noopener noreferrer"
                >
                Visit Our Instagram
                </a>
            </div>
            <img
                className="img-fluid w-35 d-none d-sm-block py-3"
                src="/images/dashLogo.PNG"
                alt="Showcase"
            />
            </div>
        </div>
        </section>

        {/* <!-- Learn Secitons --> */}
        <section className="p-5" id="schedule">
        <div className="container">
                <h2 className='text-center mb-4'>Schedule</h2>
                {events.map((event, idx) => (
                    <div key= {idx} className="row justify-content-center">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 bg-secondary rounded p-4 m-3">
                            <div className="text-center text-white">
                                <div className="title">
                                    <h4>{event.name}</h4>
                                </div>
                                <div>
                                    <ul className='text-start list-unstyled'>
                                        <li><span className='fw-bold'>Date: </span>{new Date(event.date_time).toLocaleDateString()} {new Date(event.date_time).toLocaleTimeString()}</li>
                                        <li><span className='fw-bold'>Location: </span>{event.location}</li>
                                        <li><span className='fw-bold'>Registration Deadline: </span>{new Date(event.registration_deadline).toLocaleDateString()} {new Date(event.registration_deadline).toLocaleTimeString()}</li>
                                    </ul>
                                    <h6>Description</h6>
                                    <span>{event.description}</span>
                                </div>
                                <button className='btn btn-primary mt-2'>Reserve A Spot</button>
                            </div>
                        </div>
                    </div>
                ))};
        </div>
        </section>

        <section className="p-5 bg-primary text-light" id="learn">
        <div className="container">
            <div className="row align-items-center justify-content-between">
            <div className="col-md p-5">
                <h2>Learn About Speed Dating</h2>
                <p className="lead">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
                nostrum modi aspernatur tenetur error beatae!
                </p>
                <a href="#" className="btn btn-light mt-3">
                <i className="bi bit-chevron-right">Read More</i>
                </a>
            </div>
            <div className="col-md">
                <img src="img/react.svg" className="img-fluid" alt="" />
            </div>
            </div>
        </div>
        </section>

        {/* <!-- Question Accordion --> */}
        <section id="questions" className="p-5">
        <div className="container">
            <h2 className="text-center mb-4">Frequently Asked Questions</h2>
            <div className="accordion accordion-flush" id="questions">
            {/* <!-- item 1 --> */}
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#questions-one"
                >
                    Where is this at?
                </button>
                </h2>
                <div
                    id="questions-one"
                    className="accordion-collapse collapse"
                    data-bs-parent="#questions"
                >
                    <div className="accordion-body">
                        The Media Naranja events happen at different locations. These will be listed in 
                        each event
                    </div>
                </div>
            </div>
            {/* <!-- item 2 --> */}
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#questions-two"
                >
                    How much does it cost to attend?
                </button>
                </h2>
                <div
                    id="questions-two"
                    className="accordion-collapse collapse"
                    data-bs-parent="#questions"
                >
                    <div className="accordion-body">
                        $20 per person
                    </div>
                </div>
            </div>
            {/* <!-- item 3 --> */}
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#questions-three"
                >
                    What do I need to take?
                </button>
                </h2>
                <div
                    id="questions-three"
                    className="accordion-collapse collapse"
                    data-bs-parent="#questions"
                >
                    <div className="accordion-body">
                        Bring your ID if the event is held at a 21+ location. 
                        Other than that everything is will be provided by our team
                    </div>
                </div>
            </div>
            {/* <!-- item 4 --> */}
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#questions-four"
                >
                    What is dress code?
                </button>
                </h2>
                <div
                id="questions-four"
                className="accordion-collapse collapse"
                data-bs-parent="#questions"
                >
                <div className="accordion-body">
                    Dress to impress, you might meet your future spouse!
                </div>
                </div>
            </div>
            {/* <!-- item 5 --> */}
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#questions-five"
                >
                    When is check-in?
                </button>
                </h2>
                <div
                id="questions-five"
                className="accordion-collapse collapse"
                data-bs-parent="#questions"
                >
                <div className="accordion-body">
                    Check-in will be 30 minutes before each event
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>

        {/* <!-- Footer --> */}
        <footer className="p-3 bg-custom text-white text-center position-relative">
        <div className="container">
            <p className="lead">Copyright &copy; 2023 484 Final Project</p>
            <a href="#" className="position-absolute bottom-0 end-0 p-5">
            <i className="bi bi-arrow-up-circle h1"></i>
            </a>
        </div>
        </footer>
    </div>
    );
};

export default ClientDashboard;
