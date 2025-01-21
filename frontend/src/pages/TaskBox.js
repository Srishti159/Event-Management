import React from 'react';
import './../assets/styles.css'; 
import './../assets/task.css'; 
import editIcon from './../assets/edit.gif'; 
import deleteIcon from './../assets/bin.gif'; 
import completeIcon from './../assets/complete.gif';

const TaskBox = ({ tasks, onEdit, handleRemove, completed }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div className={`task-box ${task.status.toLowerCase().replace(' ', '-')}`} key={task.id}>
          <h3><strong>Task:</strong> {task.name}</h3>
          <p><strong>Deadline:</strong> {task.deadline}</p>
          <p><strong>Status:</strong> {task.status}</p>
          <div className="task-actions">
            <img
              src={editIcon}
              alt="Edit"
              className="action-icon"
              onClick={() => onEdit(task)}
            />
            <img
              src={deleteIcon}
              alt="Delete"
              className="action-icon"
              onClick={() => handleRemove(task.id)}
            />
          </div>
          <div className="complete-icon">
            {task.status !== 'Completed' && (
              <img
                src={completeIcon}
                alt="Completed"
                className="action-icon"
                onClick={() => completed(task.id)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskBox;
