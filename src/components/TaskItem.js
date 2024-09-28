import React from 'react';

const TaskItem = ({ title, time, courseCode, color }) => {
  return (
    <div className="task-item" style={{ backgroundColor: color }}>
      <div className="task-details">
        <h3>{title}</h3>
        <p>{time}</p>
      </div>
      {courseCode && <div className="task-courseCode">{courseCode}</div>}
    </div>
  );
};

export default TaskItem;
