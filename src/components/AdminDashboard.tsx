// import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Dummy data for now
  const upcomingEvents = ['Event 1', 'Event 2'];
  const pastEvents = ['Event A', 'Event B'];

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate('/', { replace: true });
    }
};

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <h1>Welcome to the Admin Dashboard Page!</h1>

          <button className="btn btn-primary mb-4">Create Event</button>

        </div>

        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Upcoming Events</h5>
              <ul>
                {upcomingEvents.map((event, index) => (
                  <li key={index}>{event}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Past Events</h5>
              <ul>
                {pastEvents.map((event, index) => (
                  <li key={index}>{event}</li>
                ))}
              </ul>
            </div>
          </div>

          <button className="btn btn-danger mt-4" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
