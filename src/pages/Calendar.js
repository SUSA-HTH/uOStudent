import React, { useState, useEffect } from 'react';
import TaskItem from '../components/TaskItem';
import { format, addDays, subDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '../icons/home.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendar, faBook, faEdit, faUser } from '@fortawesome/free-solid-svg-icons';

const Calendar = () => {
  const navigate = useNavigate();
  
  const [taskData, setTaskData] = useState(() => {
    const savedData = localStorage.getItem('taskData');
    return savedData ? JSON.parse(savedData) : {};
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDeadline, setNewDeadline] = useState({ title: '', courseCode: '', date: '', time: '' });

  const formattedDate = format(selectedDate, 'yyyy-MM-dd');

  const handlePreviousDay = () => {
    setSelectedDate(subDays(selectedDate, 1));
  };

  const handleNextDay = () => {
    setSelectedDate(addDays(selectedDate, 1));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewDeadline({ title: '', courseCode: '', date: '', time: '' });
  };

  const addDeadline = () => {
    if (newDeadline.title && newDeadline.courseCode && newDeadline.date) {
      // Create a new date object and set the time to the start of the day
      const deadlineDate = new Date(newDeadline.date);
      
      // Set hours, minutes, seconds, and milliseconds to 0 to ensure it is treated as the start of the day
      deadlineDate.setHours(0, 0, 0, 0);
      
      // Format the date for storage
      const formattedDate = format(deadlineDate, 'yyyy-MM-dd');
      
      setTaskData(prevData => {
        const updatedData = { ...prevData };
        if (!updatedData[formattedDate]) {
          updatedData[formattedDate] = [];
        }
        updatedData[formattedDate].push({
          id: Date.now(), // Add a unique id for each deadline
          title: newDeadline.title,
          courseCode: newDeadline.courseCode,
          time: newDeadline.time,
          color: '#ccff00',
        });
        localStorage.setItem('taskData', JSON.stringify(updatedData));
        return updatedData;
      });
      closeModal();
    }
  };
  

  const deleteDeadline = (dateKey, deadlineId) => {
    setTaskData(prevData => {
      const updatedData = { ...prevData };
      updatedData[dateKey] = updatedData[dateKey].filter(task => task.id !== deadlineId);
      if (updatedData[dateKey].length === 0) {
        delete updatedData[dateKey];
      }
      localStorage.setItem('taskData', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <button onClick={handlePreviousDay}>&lt;</button>
        <div className="selected-day">
          {format(selectedDate, 'E, MMM d, yyyy')}
        </div>
        <button onClick={handleNextDay}>&gt;</button>
      </div>

      <div className="task-list">
        <h3>Items and tasks</h3>
        {taskData[formattedDate] && taskData[formattedDate].length > 0 ? (
          taskData[formattedDate].map((task) => (
            <div key={task.id} className="task-item-container">
              <TaskItem
                title={task.title}
                time={task.time}
                courseCode={task.courseCode}
                color={task.color}
              />
              <button 
                onClick={() => deleteDeadline(formattedDate, task.id)}
                className="delete-deadline-button"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No tasks for this day.</p>
        )}
      </div>

      <button onClick={openModal} className="add-deadline-button">Add Deadline</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Deadline</h2>
            <input
              type="text"
              placeholder="Deadline Title"
              value={newDeadline.title}
              onChange={(e) => setNewDeadline({ ...newDeadline, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Course Code"
              value={newDeadline.courseCode}
              onChange={(e) => setNewDeadline({ ...newDeadline, courseCode: e.target.value })}
            />
            <input
              type="date"
              value={newDeadline.date}
              onChange={(e) => setNewDeadline({ ...newDeadline, date: e.target.value })}
            />
            <input
              type="time"
              value={newDeadline.time}
              onChange={(e) => setNewDeadline({ ...newDeadline, time: e.target.value })}
            />
            <button onClick={addDeadline}>Save Deadline</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}

<div className="bottom-nav">
  <button className="nav-button" onClick={() => navigate('/dashboard')}>
    <FontAwesomeIcon icon={faHome} />
  </button>
  <button className="nav-button" onClick={() => navigate('/calendar')}>
    <FontAwesomeIcon icon={faCalendar} />
  </button>
  <button className="nav-button" onClick={() => navigate('/course-list')}>
    <FontAwesomeIcon icon={faBook} />
  </button>
  <button className="nav-button">
    <FontAwesomeIcon icon={faEdit} />
  </button>
  <button className="nav-button" onClick={() => navigate('/profile')}>
    <FontAwesomeIcon icon={faUser} />
  </button>
</div>

    </div>
  );
};

export default Calendar;