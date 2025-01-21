import React from 'react';
import "./../assets/styles.css"; // Ensure you style your boxes here or in a new CSS file
import "./../assets/event.css";
import editIcon from './../assets/edit.gif'; // Add your path here
import deleteIcon from './../assets/bin.gif'; // Add your path here

const EventBox = ({ event, onEdit, onDelete }) => {
  return (
    <div className="event-box">
      <h3>{event.name}</h3>
      <p>{event.description}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <div className="event-actions">
      <img
        src={editIcon}
        alt="Edit"
        className="action-icon"
        onClick={() => onEdit(event)}
       />
       <img
        src={deleteIcon}
        alt="Delete"
        className="action-icon"
        onClick={() => onDelete(event.id)}
       />
      </div>
    </div>
  );
};

export default EventBox;
