import React from 'react';
import "./../assets/styles.css"; // Ensure this contains styles for form elements
import "./../assets/attendee.css"; // Use the same CSS file for consistent styling

const AttendeeForm = ({ attendeeData, setAttendeeData, events, handleSubmit, onCancel }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendeeData({ ...attendeeData, [name]: value });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{attendeeData.id ? 'Edit Attendee' : 'Add New Attendee'}</h2>
      <form onSubmit={handleSubmit} className="attendee-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Attendee Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Attendee Name"
              value={attendeeData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Attendee Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Attendee Email"
              value={attendeeData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="eventId">Event</label>
            <select
              id="eventId"
              name="eventId"
              value={attendeeData.eventId}
              onChange={handleChange}
              required
            >
              <option value="">Select Event</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">{attendeeData.id ? 'Edit Attendee' : 'Add New Attendee'}</button>
          <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AttendeeForm;
