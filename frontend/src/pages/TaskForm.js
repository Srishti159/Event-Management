import React from 'react';
import './../assets/styles.css'; // Ensure this contains styles for form elements
import './../assets/task.css'; // Use the same CSS file for consistent styling

const TaskForm = ({ taskData, setTaskData, events, handleSubmit, onCancel }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{taskData.id ? 'Edit Task' : 'Add New Task'}</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Task Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Task Name"
              value={taskData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="deadline">Task Deadline</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={taskData.deadline}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={taskData.status}
              onChange={handleChange}
              required
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="eventId">Event</label>
            <select
              id="eventId"
              name="eventId"
              value={taskData.eventId}
              onChange={handleChange}
              required
            >
              <option value="">Select Event</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">{taskData.id ? 'Edit Task' : 'Add New Task'}</button>
          <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
