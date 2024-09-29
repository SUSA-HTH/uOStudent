import React, { useState } from 'react';
import TaskItem from '../components/TaskItem';
import { format, addDays, subDays } from 'date-fns'; // For easy date manipulation
import { useNavigate } from 'react-router-dom';

const Calendar = () => {
  const navigate = useNavigate();
  // Define some placeholder tasks for different dates
  const [taskData, setTaskData] = useState({
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
  });

  // State to keep track of the currently selected date
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newTask, setNewTask] = useState({ title: '', courseCode: '', date: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Function to handle adding a new task
  const addTask = () => {
    if (newTask.title && newTask.courseCode && newTask.date) {
      setTaskData((prevData) => {
        const updatedData = { ...prevData };
        const taskDate = format(new Date(newTask.date), 'yyyy-MM-dd'); // Ensure correct date format
        if (!updatedData[taskDate]) {
          updatedData[taskDate] = []; // Initialize if it doesn't exist
        }
        updatedData[taskDate].push({
          title: newTask.title,
          time: '', // You can add a time if needed
          courseCode: newTask.courseCode,
          color: '#ffcc00', // Default color
        });
        return updatedData;
      });
      closeModal();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewTask({ title: '', courseCode: '', date: '' }); // Reset all fields
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

      {/* Button to open the modal for adding a task */}
      <button onClick={openModal}>Add Deadline</button>

      {/* Modal for adding a new task */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Task</h2>
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="modal-input"
            />
            <input
              type="text"
              placeholder="Course Code"
              value={newTask.courseCode}
              onChange={(e) => setNewTask({ ...newTask, courseCode: e.target.value })}
              className="modal-input"
            />
            <input
              type="date"
              value={newTask.date}
              onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
              className="modal-input"
            />
            <button onClick={addTask} className="modal-button">Add Task</button>
            <button onClick={closeModal} className="modal-button">Cancel</button>
          </div>
        </div>
      )}

      <div className="bottom-nav">
        <button onClick={() => navigate('/dashboard')}>🏠</button> {/* Home */}
        <button onClick={() => navigate('/calendar')}>📅</button> {/* Calendar */}
        <button>📖</button> {/* Placeholder for another route */}
        <button>📝</button> {/* Placeholder for another route */}
        <button onClick={() => navigate('/profile')}>👤</button> {/* Profile */}
      </div>
    </div>
  );
};

export default Calendar;
