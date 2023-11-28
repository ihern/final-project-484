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

    const handleCheckIn = () => {
        // Add logic for check-in here
        console.log('Checking In...');
    };

    return (
        <div className="landing-page">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Welcome to Media Naranja Speed Dating!</h1>
                        <p>THIS IS THE LANDING PAGE</p>
                        <button onClick={handleLogout} className="btn btn-danger mr-2">
                            Logout
                        </button>
                        <button onClick={handleCheckIn} className="btn btn-primary">
                            Check-In
                        </button>
                    </div>
                    <div className="col-md-6">
                        <img
                            src="./images/pepe.jpeg"
                            style={{ maxWidth: '100%', height: 'auto' }}
                            alt="Hacker Pepe"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
