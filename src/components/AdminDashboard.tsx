import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [events, setEvents] = useState<string[]>([]);
  const [event_ids, setEventIds] = useState<string[]>([]);
  const [eventFormData, setEventFormData] = useState({
    name: '',
    date_time: '',
    location: '',
    description: '',
    registration_deadline: '',
  });

  const getEvents = async () => {
    const { data, error } = await supabase.from('events').select('name, id')
        if(error) {
          console.log('Error getting events: ', error);
        } else {
          const event_names = data.map((obj: { name: string }) => obj.name);
          const event_id = data.map((obj: { id: string }) => obj.id);
          setEvents(event_names);
          setEventIds(event_id);
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
  };

  const handleEventClick = (index: number) => {
    navigate(`/event/${event_ids[index]}`, { state: { eventIndex: index } });
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-9 text-center">
          <h1>Admin Dashboard</h1>

          <div className='text-center p-4'>
            <button className="btn btn-primary mb-4 text-center" onClick={handleCreateEvent}>
              Create Event
            </button>
          </div>

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

        <div className="card text-center border-4 p-4 l-5 ">
          <div className="card-body">
            <h5 className="card-title">Upcoming Events</h5>
            <ul className="list-unstyled d-flex flex-column align-items-center">
              {events.map((event, index) => (
                <li key={index} className='list-unstyled'>
                  <button className='btn btn-primary btn-lg m-2' onClick={() => handleEventClick(index)}>
                    {event}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className='text-center p-4'>
          <button className="btn btn-danger mt-4 text-center" onClick={handleLogout}>
            Logout
          </button>
        </div>

    </div>
  );
};

export default AdminDashboard;