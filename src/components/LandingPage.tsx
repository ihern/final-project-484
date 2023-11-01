import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

const LandingPage = () => {
      
    const navigate = useNavigate();
  
    const handleLogout = async () => {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        navigate('/', { replace: true });
      }
    };

    return (
        <div className="landing-page">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                    <h1>Welcome to Media Naranja Speed Dating!</h1>
                    <p>THIS IS THE LANDING PAGE</p>
                    <button onClick={handleLogout} className="btn btn-danger">
                        Logout
                    </button>
                    </div>
                    <div className="col-md-6">
                    <img
                        src="./images/pepe.jpeg"
                        style={{ maxWidth: '50%', height: 'auto' }}
                        alt="Hacker Pepe"
                    />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;