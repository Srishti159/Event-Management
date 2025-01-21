import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttendeeForm from './AttendeeForm';
import AttendeeBox from './AttendeeBox';
import "./../assets/styles.css";
import "./../assets/attendee.css";

const AttendeeManagementPage = () => {
  const [attendees, setAttendees] = useState([]);
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [attendeeData, setAttendeeData] = useState({ name: '', email: '', eventId: '' });

  useEffect(() => {
    axios.get('http://localhost:8080/api/attendees')
      .then(response => setAttendees(response.data))
      .catch(error => console.error('Error fetching attendees:', error));

    axios.get('http://localhost:8080/api/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = isEditing ? 'put' : 'post';
    const url = isEditing
      ? `http://localhost:8080/api/attendees/${attendeeData.id}`
      : 'http://localhost:8080/api/attendees';

    axios({ method, url, data: attendeeData })
      .then(response => {
        setAttendees(prevAttendees => {
          if (isEditing) {
            return prevAttendees.map(att => (att.id === response.data.id ? response.data : att));
          }
          return [...prevAttendees, response.data];
        });
        setShowForm(false);
        setAttendeeData({ name: '', email: '', eventId: '' });
        setIsEditing(false);
      })
      .catch(error => console.error('Error saving attendee:', error));
  };

  const handleEdit = (attendee) => {
    setAttendeeData(attendee);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setIsEditing(false);
    setAttendeeData({ name: '', email: '', eventId: '' });
  };

  const handleRemove = (id) => {
    axios.delete(`http://localhost:8080/api/attendees/${id}`)
      .then(() => setAttendees(attendees.filter(attendee => attendee.id !== id)))
      .catch(error => console.error('Error removing attendee:', error));
  };

  return (
    <div className="card">
      <div className="header">
        <h1 className="attendee-title">Attendees</h1>
      </div>
      <div className="add-attendee-btn-container">
        <button onClick={() => setShowForm(!showForm)} className="add-attendee-btn">{showForm ? 'Cancel' : '+ Add Attendee'}</button>
      </div>
      {showForm ? (
        <AttendeeForm
          attendeeData={attendeeData}
          setAttendeeData={setAttendeeData}
          events={events}
          handleSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <AttendeeBox attendees={attendees} onEdit={handleEdit} handleRemove={handleRemove} />
      )}
    </div>
  );
};

export default AttendeeManagementPage;
