import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { useEffect } from 'react';

interface PairedQRData {
  user_id: string;
  paired_qr: string;
}

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [pairedQRData, setPairedQRData] = useState<PairedQRData[]>([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [eventData, setEventData] = useState({
    name: '',
    date_time: '',
    location: '',
    description: '',
    registration_deadline: '',
  });

  const handleBack = () => {
    navigate(-1);
  };

  const getEvent = async () => {
    const { data, error } = await supabase.from('events').select('*').eq('id', eventId).single();
    if (error) {
      console.log('Error getting event: ', error);
    } else {
      console.log('Event: ', data);
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
        setShowSuccessBox(true);
        setTimeout(() => {
            setShowSuccessBox(false);
        }, 3000);
    }
  }

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
    fetch(`http://localhost:3000/startingEvent/${eventId}`)
      .then(response => {
        if(!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setPairedQRData(data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });


  };

  useEffect(() => {
    getEvent();
  }, []);



  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Event Details for {eventData.name}!</h2>
        </div>

        <button className="btn btn-secondary p-2" onClick={handleBack}>
          Back
        </button>

        <button className="btn btn-success p-2 m-3" onClick={handleStartEvent}>
          Start Event
        </button>

        <button className="btn btn-danger p-2" onClick={handleDeleteConfirmation}>
          Delete Event
        </button>
        
        {showSuccessBox && (
            <div className="alert alert-success" role="alert">
              Event added successfully!
            </div>
          )}

        <div className="mt-4">
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
        </div>

        <button className="btn btn-primary m-2 b-2" onClick={handleEdit}>
          Edit Event
        </button>

        <div>
        <h2>Paired QR Codes</h2>
        {pairedQRData.map((pair, index) => (
          <div key={index}>
            <p>User ID: {pair.user_id}</p>
            <img src={pair.paired_qr} alt={`QR Code for ${pair.user_id}`} />
          </div>
        ))}
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
