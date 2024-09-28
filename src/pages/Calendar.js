import React, { useState } from 'react';
import TaskItem from '../components/TaskItem';
import { format, addDays, subDays } from 'date-fns'; // For easy date manipulation

const Calendar = () => {
  // Define some placeholder tasks for different dates
  const taskData = {
    '2024-09-20': [
      { title: 'Assignment1', time: '09:00-12:30', courseCode: 'CourseCode', color: '#d8b4fe' },
    ],
    '2024-09-21': [
      { title: 'Midterm1', time: '14:00-15:00', courseCode: 'CourseCode', color: '#fb7185' },
      { title: 'To do list item1', time: '15:30-17:30', color: '#d9f99d' },
    ],
    '2024-09-22': [
      { title: 'To do list item2', time: '15:30-17:30', color: '#d9f99d' },
    ],
  };

  // State to keep track of the currently selected date
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Format the selected date to match the keys in the taskData object
  const formattedDate = format(selectedDate, 'yyyy-MM-dd');

  // Handle previous day navigation
  const handlePreviousDay = () => {
    setSelectedDate(subDays(selectedDate, 1));
  };

  // Handle next day navigation
  const handleNextDay = () => {
    setSelectedDate(addDays(selectedDate, 1));
  };

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <button onClick={handlePreviousDay}>&lt;</button>
        <div className="selected-day">
          {format(selectedDate, 'E, MMM d, yyyy')}  {/* Format date as 'Day, Month Date, Year' */}
        </div>
        <button onClick={handleNextDay}>&gt;</button>
      </div>

      <div className="task-list">
        <h3>Items and tasks</h3>
        {/* Display tasks for the selected date, if available */}
        {taskData[formattedDate] ? (
          taskData[formattedDate].map((task, index) => (
            <TaskItem
              key={index}
              title={task.title}
              time={task.time}
              courseCode={task.courseCode}
              color={task.color}
            />
          ))
        ) : (
          <p>No tasks for this day.</p>
        )}
      </div>

      <div className="bottom-nav">
        <button>🏠</button>
        <button>📅</button>
        <button>📖</button>
        <button>📝</button>
        <button>👤</button>
      </div>
    </div>
  );
};

export default Calendar;
