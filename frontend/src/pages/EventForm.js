import React, { useState } from 'react';
import "./../assets/styles.css"; // Ensure this contains styles for event-box and other elements
import "./../assets/event.css";

const EventForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{formData.id ? 'Edit Event' : 'Create New Event'}</h2>
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Event Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Event Description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="6"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Event Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">{formData.id ? 'Edit Event' : 'Create New Event'}</button>
          <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
