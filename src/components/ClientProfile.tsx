import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { useEffect, useState } from 'react';

const ClientProfile = () => {
    const { userID } = useParams();

    const navigate = useNavigate();
    const [email, setEmail] = useState('no user');
    const [ fName, setFName] = useState('no');
    const [ lName, setLName] = useState('user');
    const [ ff1, setFF1] = useState('');
    const [ ff2, setFF2] = useState('');
    const [ ff3, setFF3] = useState('');
    const [ ff4, setFF4] = useState('');
    const [ ff5, setFF5] = useState('');
    const [editing, setEditing] = useState(false);
    const [match, setMatch] = useState(false);


    const getProfile = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        const uID = user?.id;
        if (userID === uID) {
            setEditing(true);
        }
        else {
            isMatch();
        }
        // console.log('User id found, quering data');
        const { data: _profile, error: selectError } = await supabase
        .from('profile')
        .select('*').eq('id', userID);
        if (selectError){
            console.log("Error retrieving data", selectError);
            return;
        }
        // console.log("PROFILE HERE", _profile);
        const userProfile = _profile[0];
        setEmail(userProfile.email);
        setFName(userProfile.fname);
        setLName(userProfile.lname);
        setFF1(userProfile.funfact1);
        setFF2(userProfile.funfact2);
        setFF3(userProfile.funfact3);
        setFF4(userProfile.funfact4);
        setFF5(userProfile.funfact5);
    };

    const isMatch = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        const uID = user?.id;
        // console.log('User id found, quering data');
        const { data , error} = await supabase
        .from('matches')
        .select('*').eq('user_id', uID).eq('match_id', userID);
        if (error){
            console.log("Error retrieving matches", error);
            return;
        } 
        console.log(data);
        if (data.length > 0) {
            setMatch(true);
        }
    };

    useEffect(() => {
        // when page loads the profile table will be queried
        getProfile();
    }, [match]);
  
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            navigate('/', { replace: true });
        }
    };
    // e40d32e4-ade8-4904-9329-ee91fea70284

    const handleUpdate = async () => {
        const { error } = await supabase.from('profile')
        .update(
            {
                funfact1: ff1,
                funfact2: ff2,
                funfact3: ff3,
                funfact4: ff4,
                funfact5: ff5
            }
        ).eq('id', userID);
        if (error) {
            console.log(error);
        }
    };

    const handleMatch = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        const uID = user?.id;
        const { error } = await supabase.from('matches')
        .insert(
            {
                user_id: uID,
                match_id: userID,
            }
        );
        if (error) {
            console.log(error);
        }
        setMatch(prev => !prev);
    };

    const handleUnmatch = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        const uID = user?.id;

        const { data, error } = await supabase.from('matches')
        .delete().eq('user_id', uID).eq('match_id', userID);
        console.log("Inside unmatch", data);
        if (error) {
            console.log(error);
        }
        setMatch(prev => !prev);
    };

    return (
        <div className="container mt-5 pt-5">
            {/* <!-- Navbar --> */}
            <nav className="navbar navbar-expand-lg bg-primary navbar-dark fixed-top">
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
                    <a onClick={() => navigate('/client/dashboard')} className="nav-link">Home</a>
                    </li>
                    <li className="nav-item">
                    <a onClick={handleLogout} className="btn btn-danger">Logout</a>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
            <section className="row gutters">
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="account-settings">
                                <div className="user-profile">
                                    <div className="user-avatar">
                                        <img 
                                            src="https://bootdey.com/img/Content/avatar/avatar1.png" 
                                            alt="Maxwell Admin"
                                            className="img-fluid"
                                        />
                                    </div>
                                    <h5 className="mb-2 text-primary">Your Profile</h5>
                                    <h5 className="user-name">{`${fName} ${lName}`}</h5>
                                    <h6 className="user-email">{`${email}`}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                    <div className="card h-100">
                        <div className="card-body">
                            <div className="row gutters col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <h6 className="mb-3 text-primary">YOUR FUN FACTS!</h6>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label>Fun Fact 1</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={ff1}
                                        onChange={(e) => setFF1(e.target.value)}
                                        disabled={!editing}
                                    />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label>Fun Fact 2</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={ff2}
                                        onChange={(e) => setFF2(e.target.value)}
                                        disabled={!editing}
                                    />
                                </div>
                            </div>
                            <div className="row gutters col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label>Fun Fact 3</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        value={ff3}
                                        onChange={(e) => setFF3(e.target.value)}
                                        disabled={!editing} 
                                    />
                                </div>
                            </div>
                            <div className="row gutters col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label>Fun Fact 4</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={ff4}
                                        onChange={(e) => setFF4(e.target.value)}
                                        disabled={!editing}
                                    />
                                </div>
                            </div>
                            <div className="row gutters col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label>Fun Fact 5</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={ff5}
                                        onChange={(e) => setFF5(e.target.value)}
                                        disabled={!editing}
                                    />
                                </div>
                            </div>
                            {editing && (<div className="row gutters">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="text-right my-4">
                                        <button 
                                            type="button" 
                                            id="submit" 
                                            name="submit" 
                                            className="btn btn-primary"
                                            onClick={handleUpdate}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>)}
                            {!editing && (<div className="row gutters">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="text-right my-4">
                                    <button 
                                        type="button" 
                                        id="match" 
                                        name="match" 
                                        className="btn btn-primary"
                                        onClick={handleMatch}
                                        disabled={match}
                                    >
                                        Match
                                    </button>
                                    </div>
                                </div>
                            </div>)}
                            {match && (<div className="row gutters">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="text-right my-4">
                                    <button 
                                        type="button" 
                                        id="match" 
                                        name="match" 
                                        className="btn btn-danger"
                                        onClick={handleUnmatch}
                                    >
                                        Remove Match
                                    </button>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ClientProfile;