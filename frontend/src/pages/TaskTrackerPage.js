import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskBox from './TaskBox';
import './../assets/styles.css';
import './../assets/task.css';

const TaskTrackerPage = () => {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskData, setTaskData] = useState({ name: '', deadline: '', eventId: '', status: 'Pending' });
  const [selectedEvent, setSelectedEvent] = useState('');

  // Fetch tasks and events when the component mounts or when selectedEvent changes
  useEffect(() => {
    axios.get('http://localhost:8080/api/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));

    if (selectedEvent) {
      axios.get(`http://localhost:8080/api/tasks/event/${selectedEvent}`)
        .then(response => setTasks(response.data))
        .catch(error => console.error('Error fetching tasks:', error));
    } else {
      axios.get('http://localhost:8080/api/tasks')
        .then(response => setTasks(response.data))
        .catch(error => console.error('Error fetching tasks:', error));
    }
  }, [selectedEvent]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const method = isEditing ? 'put' : 'post';
    const url = isEditing
      ? `http://localhost:8080/api/tasks/${taskData.id}`
      : 'http://localhost:8080/api/tasks';

    axios({ method, url, data: taskData })
      .then(response => {
        setTasks(prevTasks => {
          if (isEditing) {
            return prevTasks.map(task => (task.id === response.data.id ? response.data : task));
          }
          return [...prevTasks, response.data];
        });
        setShowForm(false);
        setTaskData({ name: '', deadline: '', eventId: '', status: 'Pending' });
        setIsEditing(false);
      })
      .catch(error => console.error('Error saving task:', error));
  };

  // Handle editing task
  const handleEdit = (task) => {
    setTaskData(task);
    setIsEditing(true);
    setShowForm(true);
  };

  // Handle cancelling form
  const handleCancel = () => {
    setShowForm(false);
    setIsEditing(false);
    setTaskData({ name: '', deadline: '', eventId: '', status: 'Pending' });
  };

  // Handle removing task
  const handleRemove = (id) => {
    axios.delete(`http://localhost:8080/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(error => console.error('Error removing task:', error));
  };

  // Mark task as completed
  const markAsCompleted = (id) => {
    axios.put(`http://localhost:8080/api/tasks/${id}`, { status: 'Completed' })
      .then(response => {
        setTasks(tasks.map(task => 
          task.id === id ? { ...task, status: 'Completed' } : task
        ));
      })
      .catch(error => console.error('Error updating task status:', error));
  };

  return (
    <div className="card">
      <div className="header">
        <h1 className="task-title">Task Tracker</h1>
      </div>

      <div className="add-task-btn-container">
        <button onClick={() => setShowForm(!showForm)} className="add-task-btn">{showForm ? 'Cancel' : '+ Add Task'}</button>
      </div>

      {showForm ? (
        <TaskForm
          taskData={taskData}
          setTaskData={setTaskData}
          events={events}
          handleSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <div className="event-filter">
            <label>Select Event:</label>
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
            >
              <option value="">All Events</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>

          <TaskBox tasks={tasks} onEdit={handleEdit} handleRemove={handleRemove} completed={markAsCompleted} />
        </>
      )}
    </div>
  );
};

export default TaskTrackerPage;
