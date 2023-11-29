import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [eventFormData, setEventFormData] = useState({
    name: '',
    date_time: '',
    location: '',
    description: '',
    registration_deadline: '',
  });
  const [upcomingEvents, setEvents] = useState<string[]>([]);

  const getEvents = async () => {
    const { data, error } = await supabase.from('events').select('name')
        if(error) {
          console.log('Error getting events: ', error);
        } else {
          console.log(typeof(data))
          const convert = data.map((obj: { name: string }) => obj.name)
          setEvents(convert)
        }
  };
 
    useEffect(() => {
      getEvents();
    }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate('/', { replace: true });
    }
  };

  const handleCreateEvent = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value} = e.target;

    setEventFormData((prevData) => ({ ...prevData, [name]: value}));
  };

  const handleSaveEvent = async () => {
    if ( !eventFormData.name || !eventFormData.date_time || !eventFormData.location || !eventFormData.description || !eventFormData.registration_deadline ) {
      setError('Please fill in all fields');

      setTimeout(() => {
        setError(null);
      }, 1500);

      return;
    }

    const { error } = await supabase
      .from('events')
      .insert({ name: eventFormData.name, date_time: eventFormData.date_time,
        location: eventFormData.location, description: eventFormData.description, registration_deadline: eventFormData.registration_deadline });
    if(error) {
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 1500);
    } else {
      setShowModal(false);
      setShowSuccessBox(true);

      setTimeout(() => {
        setShowSuccessBox(false);
      }, 3000);

    }

    console.log(eventFormData)
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <h1>Welcome to the Admin Dashboard Page!</h1>

          <button className="btn btn-primary mb-4" onClick={handleCreateEvent}>
            Create Event
          </button>

          {showModal && (
            <div className="modal show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Create Event</h5>
                    <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <p>Enter the details of the event below.</p>
                    <form>

                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder='Enter event name'
                          value={eventFormData.name}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Date and Time</label>
                        <input
                          type="text"
                          className="form-control"
                          name="date_time"
                          placeholder='YYYY-MM-DD HH:MM'
                          value={eventFormData.date_time}
                          onChange={handleChange}
                        />
                        </div>

                        <div className="mb-3">
                        <label className="form-label">Location</label>
                        <input
                          type="text"
                          className="form-control"
                          name="location"
                          placeholder='Enter event location'
                          value={eventFormData.location}
                          onChange={handleChange}
                        />
                      </div>

                        <div className="mb-3">
                        <label className="form-label">Description</label>
                        <input
                          type="text"
                          className="form-control"
                          name="description"
                          placeholder='Enter event description'
                          value={eventFormData.description}
                          onChange={handleChange}
                        />
                        </div>

                        <div className="mb-3">
                        <label className="form-label">Registration Deadline</label>
                        <input
                          type="text"
                          className="form-control"
                          name="registration_deadline"
                          placeholder='YYYY-MM-DD HH:MM'
                          value={eventFormData.registration_deadline}
                          onChange={handleChange}
                        />
                      </div>

                      {error && (
                                    <div className="alert alert-danger">{error}</div>
                                )}

                      <button type="button" className="btn btn-primary" onClick={handleSaveEvent}>
                        Save Event
                      </button>

                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {showSuccessBox && (
            <div className="alert alert-success" role="alert">
              Event added successfully!
            </div>
          )}

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

          {/* <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Past Events</h5>
              <ul>
                {pastEvents.map((event, index) => (
                  <li key={index}>{event}</li>
                ))}
              </ul>
            </div>
          </div> */}

          <button className="btn btn-danger mt-4" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
  );
};

export default AdminDashboard;
