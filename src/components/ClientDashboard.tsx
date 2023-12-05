import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import './styles/loginStyle.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const ClientDashboard = () => {
    const navigate = useNavigate();
    const [ events, setEvents ] = useState<Event[]>([]);
    const [ registered, setRegistered ] = useState<RegisteredE[]>([]);
    const [ confirmedMatch, setConfirmedMatch ] = useState<Match[]>([]);
    const [refreshData, setRefreshData] = useState(false);
    const [sex, setSex] = useState('');

    interface Event {
        id: string,
        name: string;
        date_time: Date;
        location: string;
        description: string;
        registration_deadline: Date;
    }
    interface RegisteredE {
        event_id: string,
    }
    interface Match {
        user_id: string,
        fname: string,
        email: string
        phone: string,
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

    const getRegisterFor = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            const userID = user?.id;
            const { data, error } = await supabase.from('event_participants').select('event_id').eq('user_id', userID);
            if (data) {
                setRegistered(data);
            } else {
                console.log('No data fectched:', error);
            }
        } catch (error) {
            console.log("Error checking session", error);
        }
    };

    const getMatches = async () => {
        try{
            setConfirmedMatch([]);
            const { data: { user } } = await supabase.auth.getUser();
            const uID = user?.id;

            const { data: selectedMatches , error: firstE} = await supabase.from('matches')
            .select('*').eq('user_id', uID);
            
            if (firstE){
                console.log("Error retrieving matches", firstE);
                return;
            }
            
            if (selectedMatches.length > 0) {
                const matchIds = selectedMatches.map(match => match.match_id);
                 
                for (let i = 0; i < matchIds.length; i++) {
                    const { data: second , error: secondE} = await supabase.from('matches')
                    .select('*').eq('user_id', matchIds[i]).eq('match_id', uID);
                    if (secondE){
                        console.log("Error retrieving matches", secondE);
                        return;
                    } 
                    console.log(second);
                    if (second.length > 0) {
                        console.log('Second match test query', selectedMatches[i].first_name);
                        setConfirmedMatch(prevMatches => [...prevMatches, ...second.map(item => ({
                            user_id: item.user_id,
                            fname: selectedMatches[i].first_name,
                            email: selectedMatches[i].email,
                            phone: selectedMatches[i].phone_number,
                        }))]);
                    }
                }
            }
        } catch (error) {
            console.log("Error getting matches", error);
        }
    };

    const cancelMatch = async (match_id: string) => {
        try{
            const { data: { user } } = await supabase.auth.getUser();
            const uID = user?.id;

            const {error: firstE} = await supabase.from('matches')
            .delete().eq('user_id', uID).eq('match_id', match_id);
            
            if (firstE){
                console.log("Error retrieving matches", firstE);
                return;
            }
            
        } catch (error) {
            console.log("Error getting matches", error);
        }
        setRefreshData(prev => !prev);
    };

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

    const getProfile = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        const uID = user?.id;
        
        const { data: _profile, error: selectError } = await supabase
        .from('profile')
        .select().eq('id', uID);
        if (selectError){
            console.log("Error retrieving data", selectError);
            return;
        }
        const userProfile = _profile[0];
        setSex(userProfile.sex);
    };
    
    useEffect(() => {
        checkSession();
        getEvents();
        getRegisterFor();
        getMatches();
        getProfile();
    }, [refreshData]);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            navigate('/', { replace: true });
        }
    };

    const handleRegistration = async (key: number) => {
        const { data: { user } } = await supabase.auth.getUser();
        const userID = user?.id;
        // Add logic for check-in here
        console.log('Checking In...');
        const { error } = await supabase
        .from('event_participants')
        .insert({ 
            event_id: events[key].id, 
            user_id: userID,
            user_sex: sex,
        });
        if (error) {
            console.log("From registering", error);
        }
        setRefreshData(prev => !prev);
    };

    const handleCancellation = async (event: string) => {
        const { data: { user } } = await supabase.auth.getUser();
        const userID = user?.id;
        
        console.log('Deleting In...');
        const { error } = await supabase
        .from('event_participants')
        .delete()
        .eq('user_id', userID)
        .eq('event_id', event);

        if (error) {
            console.log("From unregistering", error);
        }
        setRefreshData(prev => !prev);
    };

    const navProfile = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        const userID = user?.id;
        navigate(`/client/profile/${userID}`);
    };

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
                <a onClick={navProfile} className="nav-link">Profile</a>
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
                src="/images/dashLogo.jpeg"
                alt="Showcase"
            />
            </div>
        </div>
        </section>

        {/* <!-- Schedule --> */}
        <section className="p-5" id="schedule">
        <div className="container">
                <h2 className='text-center mb-4'>Schedule</h2>
                {events.map((event, idx) => (
                    <div key= {idx} className="row justify-content-center">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 bg-secondary rounded p-4 m-3 shadow-lg">
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
                                {registered.some(reg => reg.event_id === event.id) ? (
                                <div>
                                    <button className='btn btn-success mt-2' disabled>Registered</button>                                
                                    <button className='mx-2 btn btn-danger mt-2' onClick={() => handleCancellation(event.id)}>
                                    Cancel Registration
                                    </button>
                                </div>
                                ) : 
                                <button  key={idx} className='btn btn-primary mt-2' onClick={() => handleRegistration(idx)}>Reserve A Spot</button>                                
                                }
                            </div>
                        </div>
                    </div>
                ))}
        </div>
        </section>

        {/* Learn section */}
        <section className="p-5 bg-primary text-light" id="learn">
        <div className="container">
            <div className="row align-items-center justify-content-between">
            <div className="col-md p-5">
                <h2>My Matches</h2>
                <p className="lead">
                After each event any matches will display in this section!
                </p>
                {confirmedMatch.map((match, idx) => (
                    <div key= {idx} className="row justify-content-center">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 bg-secondary rounded p-4 m-3 shadow-lg">
                            <div className="text-center text-white">
                                <div className="title">
                                    <h4>Match {idx + 1}</h4>
                                </div>
                                <div>
                                    <ul className='text-start list-unstyled'>
                                        <li><span className='fw-bold'>First Name: </span>{match.fname}</li>
                                        <li><span className='fw-bold'>Email: </span>{match.email}</li>
                                        <li><span className='fw-bold'>Phone Number: </span>{match.phone}</li>
                                    </ul>
                                </div>
                                <button  key={idx} className='btn btn-danger mt-2' onClick={() => cancelMatch(match.user_id)}>Delete Match</button>                                
                            </div>
                        </div>
                    </div>
                ))}
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
