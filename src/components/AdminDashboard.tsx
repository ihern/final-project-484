import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

interface EventFormData {
  id: string,
  fname: string,
  lname: string,
  email: string,
  phone_number: string,
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userFormData, setUserFormData] = useState<EventFormData[]>([]);
  const [userIndex, setUserIndex] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [showSuccessBoxUser, setShowSuccessBoxUser] = useState(false);
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

  const handleDeleteUser = async (userId: string) => {
    const { error } = await supabase.from('profile').delete().eq('id', userId);
    if(error) {
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    } else {
      console.log('User deleted successfully!');
      setShowUserModal(false);
      setShowSuccessBoxUser(true);
      setTimeout(() => {
        setShowSuccessBoxUser(false);
      }, 3000);
    }
  };

  const getUsers = async () => {
    const { data, error } = await supabase.from('profile').select('id, fname, lname, email, phone_number, role')
      if(error) {
        console.log('Error getting users: ', error);
      } else {
        // only show users, not clients !
        const filteredUsers = data.filter(user => user.role !== 'admin');
        setUserFormData(filteredUsers as EventFormData[]);
      }
  } 
 
  useEffect(() => {
    getEvents();
    getUsers();
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

  const userNameClick = (index: number) => {
    setShowUserModal(true);
    setUserIndex(index);
  };

  const handleUserCloseModal = () => {
    setShowUserModal(false);
  }

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

      <div className="text-center mt-4">
        <h1>Admin Dashboard</h1>
        {showSuccessBox && (
              <div className="alert alert-success" role="alert">
                Event created successfully!
              </div>
            )}
        {showSuccessBoxUser && (
          <div className="alert alert-success" role="alert">
            User deleted successfully!
          </div>
        )}
      </div>
      

      <div className="d-flex justify-content-between align-items-center">
        <div className="row mt-4">
          <div className="col-md-7">
            <div className='col-md-7 text-center p-4'>
              <button className="btn btn-primary" onClick={handleCreateEvent}>
                Create Event
              </button>
            </div>

            {showUserModal && (
              <div className="modal show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">User Profile</h5>
                      <button type="button" className="btn-close" onClick={handleUserCloseModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form>

                        <div className="mb-3">
                          <label className="form-label">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={userFormData[userIndex].fname}
                            disabled={true}
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={userFormData[userIndex].lname}
                            disabled={true}
                          />
                          </div>

                          <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={userFormData[userIndex].email}
                            disabled={true}
                          />
                          </div>

                          <div className="mb-3">
                          <label className="form-label">Phone Number</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={userFormData[userIndex].phone_number}
                            disabled={true}
                          />
                          </div>
                        {error && (
                          <div className="alert alert-danger">{error}</div>
                        )}

                        <button type="button" className="btn btn-danger" onClick={() => handleDeleteUser(userFormData[userIndex].id)}>
                          Delete User
                        </button>

                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
            <div className="col-md-7">
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
            </div>
          </div>

          <div className="col-md-5">
            <div className="card text-center border-4 p-4 l-5 ">
              <div className="card-body">
                {/* <div className="text-center p-4"> */}
                  <h5 className='card-title'>Registered Users</h5>
                  <ul className="list-unstyled d-flex flex-column align-items-center">
                  {userFormData.map((user, index) => (
                    <li key={index} className='list-unstyled'>
                      <button className='btn btn-primary btn-lg m-2' onClick={() => userNameClick(index)}>
                        {user.fname}
                      </button>
                    </li>
                  ))}
                  </ul>
                {/* </div> */}
              </div>
            </div>
          </div>

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