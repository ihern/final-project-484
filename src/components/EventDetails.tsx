import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { useEffect } from 'react';

interface PairedQRData {
  user: string;
  qr_code: string;
}

interface userData {
  fname: string;
}

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  // for modal
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);  // for modal

  // for dashboard
  const [splitQRData, setSplitQRData] = useState<PairedQRData[][]>([]);
  const [displayQR, setDisplayQR] = useState<PairedQRData[]>([]);
  const [qrIndex, setqrIndex] = useState(0);
  const [startEventButton, setStartEventButton] = useState(false);
  const [eventNotification, setEventNotification] = useState<string | null>(null);  // general notification
  const [isSuccess, setIsSuccess] = useState(false);  // for general notification
  const [canEndEvent, setCanEndEvent] = useState(false);
  const [totalRounds, setTotalRounds] = useState(0);
  const [registeredUsers, setRegisteredUsers] = useState<userData[]>([]);

  // sets event data
  const [eventData, setEventData] = useState({
    name: '',
    date_time: '',
    location: '',
    description: '',
    registration_deadline: '',
  });

  const isAdmin = async () => {
    try {
      const {data: { session }} = await supabase.auth.getSession();
      // setSession(session)
      if(session?.user.user_metadata.role !== 'admin') {
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.log("error checking session")
    }
};

  const handleBack = () => {
    navigate(-1);
  };

  const getEvent = async () => {
    const { data, error } = await supabase.from('events').select('*').eq('id', eventId).single();
    if (error) {
      console.log('Error getting event: ', error);
    } else {
      setEventData(data);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  const handleSaveChanges = async () => {
    const { data, error } = await supabase
        .from('events')
        .update({name: eventData.name, 
                 date_time: eventData.date_time,
                 location: eventData.location,
                 description: eventData.description,
                 registration_deadline: eventData.registration_deadline})
        .eq('id', eventId)
        .select();
    if (error) {

      console.log('Error updating event: ', error);
      setError(error.message);

      setTimeout(() => {
        setError(null);
      }, 1500);

    } else {

        console.log('Event updated: ', data);
        handleCloseModal();
        setEventNotification('Event updated successfully!');
        setIsSuccess(true);

        setTimeout(() => {
          setEventNotification(null)
        }, 3000);

    }
  };

  const handleEndEventButton = async () => {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', eventId);
    if(error) {
      console.log('Error deleting event: ', error);
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 1500);
    } else {
      navigate('/admin/dashboard', { replace: true });
    }
  };

  const shufflePairs = async () => {
    console.log('Shuffling pairs...');
    console.log('index at', qrIndex);
    if(qrIndex + 1 > totalRounds) {
      setEventNotification('Event has ended!');
      return;
    }
    setqrIndex(qrIndex => qrIndex + 1);
    // setqrIndex(qrIndex + 1);
    console.log('index at after', qrIndex);
    console.log(splitQRData)
    setDisplayQR(splitQRData[qrIndex]);
  };

  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteEvent = async () => {
    setShowDeleteConfirmation(false);
    const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

    if (error) {
        console.log('Error deleting event: ', error);
        setError(error.message);
        setTimeout(() => {
            setError(null);
        }, 1500);
    } else {
        navigate('/admin/dashboard', { replace: true });
    }
  };

  const handleStartEvent = async () => {
    try {
      // fetch(`http://localhost:3000/startingEvent/${eventId}`)
      fetch(`https://four84-final-project-server.onrender.com/startingEvent/${eventId}`)
        .then(response => {

          if(!response.ok) {
            setEventNotification(response.statusText);
            setIsSuccess(false);
            
            setTimeout(() => {
              setEventNotification(null)
            }, 3000);

            throw new Error(response.statusText);

          } else {
            return response.json();
          }

        })
        .then(data => {
          console.log("Data:", data);

          const numberOfShuffles = Math.sqrt(data.length / 2);  // 3
          const numberOfQrs = numberOfShuffles * 2;  // 6
          const splitArrays = [];
          const x: PairedQRData[] = data;

          for (let i = 0; i < x.length; i += numberOfQrs) {
            const chunk = x.slice(i, i + numberOfShuffles * 2);
            splitArrays.push(chunk);
          }
          
          setqrIndex(0);
          setDisplayQR(splitArrays[qrIndex]);
          setqrIndex(1);
          setTotalRounds(numberOfShuffles);
          setSplitQRData(splitArrays);

          setStartEventButton(true);
          setEventNotification('Event has started!');
          setIsSuccess(true);
          setCanEndEvent(true);

        })
        .catch(error => {
          
          setEventNotification(error.message);
          setIsSuccess(false);
          console.error('There has been a problem with your fetch operation:', error);

        });
    } catch (error) {
      console.log('Failed to reach server: ', error);
    }
  };
  
  const getRegisteredUsers = async () => {
    const { data, error } = await supabase
      .from('event_participants')
      .select(`
        user_id,
        profile (
          id, fname
        )
      `)
      .eq('event_id', eventId)
    if (error) {
      console.log('Error getting registered users: ', error);
    } else {

      const allFirstNames: userData[] = data.flatMap(entry => entry.profile);
      console.log('Names: ', allFirstNames);
      setRegisteredUsers(allFirstNames);
    }
  };

  useEffect(() => {
    isAdmin();
    getRegisteredUsers();
    getEvent();
  }, []);



  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Event Details for {eventData.name}!</h2>
        </div>

        {eventNotification && (
                        <div className={isSuccess ? 'alert alert-success' : "alert alert-danger"}>{eventNotification}</div>
        )}

        <div className="row mt-4">
          <div className="col-md-6">
            <button className="btn btn-secondary p-2" onClick={handleBack}>
              Back
            </button>
            <button className="btn btn-success p-2 m-3" onClick={handleStartEvent} disabled={startEventButton}>
              Start Event
            </button>
            <button className="btn btn-danger p-2" onClick={handleDeleteConfirmation} disabled={startEventButton}>
              Delete Event
            </button>
            <div className="mb-3">
              <strong>Name:</strong> {eventData.name}
            </div>
            <div className="mb-3">
              <strong>Date and Time:</strong> {eventData.date_time}
            </div>
            <div className="mb-3">
              <strong>Location:</strong> {eventData.location}
            </div>
            <div className="mb-3">
              <strong>Description:</strong> {eventData.description}
            </div>
            <div className="mb-3">
              <strong>Registration Deadline:</strong> {eventData.registration_deadline}
            </div>
            <button className="btn btn-primary mb-3" onClick={handleEdit} disabled={startEventButton}>
              Edit Event
            </button>
            {canEndEvent && (
              <button className="btn btn-danger mb-3" onClick={handleEndEventButton}>
                End Event
              </button>
            )}

            <div className="tips-box">
            <h3>General Tips Before Starting Event</h3>
            <ul>
              <li>Total number of registered users must be even! (everyone has to talk to someone)</li>
              <li>Server will not respond if user genders are not equal (make sure even males/females participants)</li>
              <li>New QR codes must be regenerated every rotation</li>
              <li>Users must be present in the event to be paired</li>
              <li>DO NOT spam the start Start Event button (Can take up to 15 seconds to generate QR Codes)</li>
            </ul>
            </div>

            <div className='border'>
              <h3>Registered Users</h3>
              <ul>
                {registeredUsers.map((user, index) => (
                  <li key={index}>{user.fname}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className='col-md-6 border'>
            <div className='row mt-3'>
              <div className='col-md-6'>
                <h2>Codes For Each User</h2>
              </div>
              <div className='col-md-6'>
                <button className='btn btn-primary mb-3' onClick={shufflePairs} disabled={!startEventButton}>
                  Shuffle
                </button>
              </div>
            </div>
            {displayQR.map((pair, index) => (
            <div key={index}>
              <p>User ID: {pair.user}</p>
              <img src={pair.qr_code} alt={`QR Code for ${pair.user}`} />
            </div>
          ))}
          </div>
        </div>

        {isEditing && (
            <div className="modal show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Edit Event</h5>
                    <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                    type="text"
                    className="form-control"
                    value={eventData.name}
                    onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
                    />
                    </div>

                    <div className="mb-3">
                    <label>Date and Time:</label>
                    <input
                    type="text"
                    className='form-control'
                    value={eventData.date_time}
                    onChange={(e) => setEventData({ ...eventData, date_time: e.target.value })}
                    />
                    </div>

                    <div className="mb-3">
                    <label>Location:</label>
                    <input
                    type="text"
                    className='form-control'
                    value={eventData.location}
                    onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                    />
                    </div>

                    <div className="mb-3">
                    <label>Description:</label>
                    <input
                    type="text"
                    className='form-control'
                    value={eventData.description}
                    onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                    />
                    </div>

                    <div className="mb-3">
                    <label>Registration Deadline:</label>
                    <input
                    type="text"
                    className='form-control'
                    value={eventData.registration_deadline}
                    onChange={(e) => setEventData({ ...eventData, registration_deadline: e.target.value })}
                    />
                    </div>
                </div>

                {error && (
                        <div className="alert alert-danger">{error}</div>
                )}

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Close
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
                    Save Changes
                    </button>
                </div>
                </div>
            </div>
            </div>
        )}

        {showDeleteConfirmation && (
            <div className="modal show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Delete Event</h5>
                    <button type="button" className="btn-close" onClick={() => setShowDeleteConfirmation(false)} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>Are you sure you want to delete the event?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteConfirmation(false)}>
                    Cancel
                    </button>
                    <button type="button" className="btn btn-danger" onClick={handleDeleteEvent}>
                    Delete
                    </button>
                </div>
                </div>
            </div>
            </div>
      )}
    </div>
  );
};

export default EventDetails;
