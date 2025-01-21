import React from 'react';
import "./../assets/styles.css"; // Ensure your styles are here or in a new CSS file
import "./../assets/attendee.css"; // You may need to create this file for attendee-specific styles
import editIcon from './../assets/edit.gif'; // Add your path here
import deleteIcon from './../assets/bin.gif'; // Add your path here

const AttendeeBox = ({ attendees, onEdit, handleRemove }) => {
  return (
    <div className="attendee-list">
      {attendees.map((attendee) => (
        <div className="attendee-box" key={attendee.id}>
          <h3><strong>Name:</strong> {attendee.name}</h3>
          <p><strong>Email:</strong>{attendee.email}</p>
          <p><strong>Assigned Event:</strong> {attendee.eventName ? attendee.eventName : 'No Event'}</p>
          <div className="attendee-actions">
            <img
              src={editIcon}
              alt="Edit"
              className="action-icon"
              onClick={() => onEdit(attendee)}
            />
            <img
              src={deleteIcon}
              alt="Delete"
              className="action-icon"
              onClick={() => handleRemove(attendee.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendeeBox;
