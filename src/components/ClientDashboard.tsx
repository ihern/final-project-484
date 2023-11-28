import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

const ClientDashboard = () => {
    const navigate = useNavigate();

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
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
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
        className="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start"
        >
        <div className="container">
            <div className="d-sm-flex align-items-center justify-content-between">
            <div>
                <h1>Get ready to <span className="text-warning"> mingle </span></h1>
                <p className="lead my-4">
                We will focus on a great front end web application that will
                host every single little thing.
                </p>
                <button
                className="btn btn-primary btn-lg"
                >
                Start The Enrollment
                </button>
            </div>
            <img
                className="img-fluid w-50 d-none d-sm-block"
                src="img/showcase.svg"
                alt="Showcase"
            />
            </div>
        </div>
        </section>

        {/* <!-- Boxes --> */}
        <section className="p-5">
        <div className="container">
            <div className="row text-center g-4">
            <div className="col-md">
                <div className="card bg-dark text-light">
                <div className="card-body text-center">
                    <div className="h1 mb-3">
                    <i className="bi bi-laptop"></i>
                    </div>
                    <h3 className="card-title">Virtual</h3>
                    <p className="card-text">Lorem ipsum dolor sit amet con</p>
                    <a href="#" className="btn btn-primary">Read More</a>
                </div>
                </div>
            </div>
            <div className="col-md">
                <div className="card bg-secondary text-light">
                <div className="card-body text-center">
                    <div className="h1 mb-3">
                    <i className="bi bi-person-square"></i>
                    </div>
                    <h3 className="card-title">Hybrid</h3>
                    <p className="card-text">Lorem ipsum dolor sit amet con</p>
                    <a href="#" className="btn btn-dark">Read More</a>
                </div>
                </div>
            </div>
            <div className="col-md">
                <div className="card bg-dark text-light">
                <div className="card-body text-center">
                    <div className="h1 mb-3">
                    <i className="bi bi-people"></i>
                    </div>
                    <h3 className="card-title">In-Person</h3>
                    <p className="card-text">Lorem ipsum dolor sit amet con</p>
                    <a href="#" className="btn btn-primary">Read More</a>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>

        {/* <!-- Learn Secitons --> */}
        <section className="p-5" id="schedule">
        <div className="container">
            <div className="row align-items-center justify-content-between">
            <div className="col-md">
                <img src="img/fundamentals.svg" className="img-fluid" alt="" />
            </div>
            <div className="col-md p-5">
                <h2>Schedule</h2>
                <p className="lead">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
                nostrum modi aspernatur tenetur error beatae!
                </p>
                <a href="#" className="btn btn-light mt-3">
                <i className="bi bit-chevron-right">Read More</i>
                </a>
            </div>
            </div>
        </div>
        </section>
        <section className="p-5 bg-dark text-light" id="learn">
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
                    Where are you located?
                </button>
                </h2>
                <div
                    id="questions-one"
                    className="accordion-collapse collapse"
                    data-bs-parent="#questions"
                >
                    <div className="accordion-body">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequuntur, possimus aut vel optio reiciendis eligendi
                        consequatur animi sunt placeat accusantium impedit hic
                        necessitatibus enim error excepturi nulla distinctio ad rerum ut
                        sit quis perferendis minima quisquam.
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequuntur, possimus aut vel optio reiciendis eligendi
                        consequatur animi sunt placeat accusantium impedit hic
                        necessitatibus enim error excepturi nulla distinctio ad rerum ut
                        sit quis perferendis minima quisquam.
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequuntur, possimus aut vel optio reiciendis eligendi
                        consequatur animi sunt placeat accusantium impedit hic
                        necessitatibus enim error excepturi nulla distinctio ad rerum ut
                        sit quis perferendis minima quisquam. 
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur, possimus aut vel optio reiciendis eligendi
                    consequatur animi sunt placeat accusantium 
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
                    Do you help me find a job?
                </button>
                </h2>
                <div
                id="questions-five"
                className="accordion-collapse collapse"
                data-bs-parent="#questions"
                >
                <div className="accordion-body">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur, possimus aut vel optio reiciendis eligendi
                    consequatur animi sunt placeat accusantium impedit hic
                    necessitatibus enim error excepturi nulla distinctio ad rerum ut
                    sit quis perferendis minima quisquam. Exercitationem, cupiditate
                    pariatur. Reprehenderit voluptates debitis sed eligendi velit
                    laborum similique assumenda corrupti numquam?
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>

        {/* <!-- instructors --> */}
        <section id="instructors" className="p-5 bg-primary">
        <div className="container">
            <h2 className="text-center text-white">Our Team</h2>
            <div className="row g-4 center">

            <div className="col-md-6 col-lg-3">
                <div className="card bg-light">
                <div className="card-body text-center">
                    <img
                    src="https://randomuser.me/api/portraits/men/12.jpg"
                    className="rounded-circle mb-3"
                    alt=""
                    />
                    <h3 className="card-title mb-3">Joe Lick</h3>
                    <p className="card-text">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Adipisci harum, sint perferendis beatae quisquam accusamus.
                    </p>
                    <a href="#"><i className="bi bi-twitter text-dark mx-1"></i></a>
                    <a href="#"><i className="bi bi-facebook text-dark mx-1"></i></a>
                    <a href="#"><i className="bi bi-instagram text-dark mx-1"></i></a>
                    <a href="#"><i className="bi bi-linkedin text-dark mx-1"></i></a>
                </div>
                </div>
            </div>

            <div className="col-md-6 col-lg-3">
                <div className="card bg-light">
                <div className="card-body text-center">
                    <img
                    src="https://randomuser.me/api/portraits/women/12.jpg"
                    className="rounded-circle mb-3"
                    alt=""
                    />
                    <h3 className="card-title mb-3">Sara Smith</h3>
                    <p className="card-text">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Adipisci harum, sint perferendis beatae quisquam accusamus.
                    </p>
                    <a href="#"><i className="bi bi-twitter text-dark mx-1"></i></a>
                    <a href="#"><i className="bi bi-facebook text-dark mx-1"></i></a>
                    <a href="#"><i className="bi bi-instagram text-dark mx-1"></i></a>
                    <a href="#"><i className="bi bi-linkedin text-dark mx-1"></i></a>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>

        {/* <!-- Contact --> */}
        <section className="p-5">
        <div className="container">
            <div className="row g-4">
            <div className="col-md">
                <h2 className="text-center mb-4">Contact Info</h2>
                <ul className="list-group list-group-flush lead">
                <li className="list-group-item">
                    <span className="fw-bold">Main Location: </span>123 Main St
                </li>
                <li className="list-group-item">
                    <span className="fw-bold">Student Phone </span>123-456-7890
                </li>
                <li className="list-group-item">
                    <span className="fw-bold">Student Email: </span>123@google.com
                </li>
                <li className="list-group-item">
                    <span className="fw-bold">Enrollment Email: </span>enroll@google.com
                </li>
                </ul>
            </div>
            </div>
        </div>
        </section>

        {/* <!-- Footer --> */}
        <footer className="p-5 bg-dark text-white text-center position-relative">
        <div className="container">
            <p className="lead">Copyright &copy; 2023 484 Final Project</p>
            <a href="#" className="position-absolute bottom-0 end-0 p-5">
            <i className="bi bi-arrow-up-circle h1"></i>
            </a>
        </div>
        </footer>
        <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
            crossOrigin="anonymous"
        ></script>
    </div>
    );
};

export default ClientDashboard;
