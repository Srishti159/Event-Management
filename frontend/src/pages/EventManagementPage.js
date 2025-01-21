import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventForm from './EventForm';
import EventBox from './EventBox'; // Import the new EventBox component
import "./../assets/styles.css"; // Ensure this contains styles for event-box and other elements
import "./../assets/event.css";


const EventManagementPage = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [initialFormData, setInitialFormData] = useState({ id: '', name: '', description: '', location: '', date: '' });

  useEffect(() => {
    axios.get('http://localhost:8080/api/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const handleFormSubmit = (formData) => {
    const method = isEditing ? 'put' : 'post';
    const url = isEditing ? `http://localhost:8080/api/events/${formData.id}` : 'http://localhost:8080/api/events';

    axios({ method, url, data: formData })
      .then(response => {
        setEvents(prevEvents => {
          if (isEditing) {
            return prevEvents.map(event => (event.id === response.data.id ? response.data : event));
          }
          return [...prevEvents, response.data];
        });
        setShowForm(false);
        setIsEditing(false);
      })
      .catch(error => console.error('Error creating/updating event:', error));
  };

  const handleEdit = (event) => {
    setInitialFormData(event);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setIsEditing(false);
    setInitialFormData({ id: '', name: '', description: '', location: '', date: '' });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/events/${id}`)
      .then(() => setEvents(events.filter(event => event.id !== id)))
      .catch(error => console.error('Error deleting event:', error));
  };

  return (
    <div className="card">
      <div className="header">
        <h1 className="event-title">Events</h1>
      </div>
      <div className="add-event-btn-container">
        <button onClick={() => setShowForm(!showForm)} className="add-event-btn">{showForm ? 'Cancel' : '+ Add Event'}</button>
      </div>
      {!showForm ? (
        <>
          <div className="event-list">
            {events.map((event) => (
              <EventBox
                key={event.id}
                event={event}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </>
      ) : (
        <EventForm
          initialData={initialFormData}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default EventManagementPage;
