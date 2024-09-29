import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';  // Assuming you have a Calendar component
import '../styles/Dashboard.css';  // Import the CSS file
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: '', code: '' });
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [deadlines, setDeadlines] = useState([]);  // State to store deadlines
  const [isAddDeadlineModalOpen, setIsAddDeadlineModalOpen] = useState(false);  // State for deadline modal
  const [newDeadline, setNewDeadline] = useState({ course: '', date: '', description: '' });
  const [colorIndex, setColorIndex] = useState(0); // State to keep track of color index
  const [userFullName, setUserFullName] = useState(''); // State to store the logged-in user's full name
  const navigate = useNavigate(); // Ensure this is defined here

    
  // Array of 5 different background colors
  const backgroundColors = ['#f38dab', '#d2d449', '#ed8f49', '#e8b5bd', '#cebcff'];

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    const storedCourses = localStorage.getItem('courses');
    const storedDeadlines = localStorage.getItem('deadlines');
    
    if (storedTodos) setTodos(JSON.parse(storedTodos));
    if (storedCourses) setCourses(JSON.parse(storedCourses));
    if (storedDeadlines) setDeadlines(JSON.parse(storedDeadlines));
  }, []);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUserFullName(loggedInUser.fullname);  // This should set the user's full name
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('courses', JSON.stringify(courses));
    localStorage.setItem('deadlines', JSON.stringify(deadlines));
  }, [todos, courses, deadlines]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const openAddCourseModal = () => {
    setIsAddCourseModalOpen(true);
  };

  const closeAddCourseModal = () => {
    setIsAddCourseModalOpen(false);
    setNewCourse({ name: '', code: '' });
  };

  const addCourse = () => {
    if (newCourse.name && newCourse.code) {
      const newColorIndex = colorIndex % backgroundColors.length; // Cycle through colors
      const backgroundColor = backgroundColors[newColorIndex]; // Get the background color

      setCourses([...courses, { ...newCourse, id: Date.now(), backgroundColor }]);
      setColorIndex(colorIndex + 1); // Increment the color index
      closeAddCourseModal();
    }
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const openAddDeadlineModal = () => {
    setIsAddDeadlineModalOpen(true);
  };

  const closeAddDeadlineModal = () => {
    setIsAddDeadlineModalOpen(false);
    setNewDeadline({ course: '', date: '', description: '' });
  };

  const addDeadline = () => {
    if (newDeadline.course && newDeadline.date) {
      setDeadlines([...deadlines, { ...newDeadline, id: Date.now() }]);
      closeAddDeadlineModal();
    }
  };

  const deleteDeadline = (id) => {
    setDeadlines(deadlines.filter(deadline => deadline.id !== id));
  };

  return (
    <div className="dashboard">
      <header className="header">
        <div className="profile">
          <h1>Hello, {userFullName}</h1>
        </div>
      </header>

      <section className="course-page">
        <h2>Courses</h2>
        <div className="courses">
          {courses.map(course => (
            <div key={course.id} className="course-item" style={{ backgroundColor: course.backgroundColor }} >
              <h3>{course.name}</h3>
              <p>{course.code}</p>
              <button onClick={() => deleteCourse(course.id)}>Delete</button>
            </div>
          ))}
          <button onClick={openAddCourseModal} className="add-course-button">+</button>
        </div>
      </section>

      {isAddCourseModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Course</h2>
            <input
              type="text"
              placeholder="Course Name"
              value={newCourse.name}
              onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
              className="modal-input"
            />
            <input
              type="text"
              placeholder="Course Code"
              value={newCourse.code}
              onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
              className="modal-input"
            />
            <button onClick={addCourse} className="modal-button">Add Course</button>
            <button onClick={closeAddCourseModal} className="modal-button">Cancel</button>
          </div>
        </div>
      )}

      <section className="deadlines-section">
        <h2>Upcoming Deadlines</h2>
        <div className="deadlines">
          <Calendar />
          
          {deadlines.map(deadline => (
            <div key={deadline.id} className="deadline-item">
              <h3>{deadline.course}</h3>
              <p>{deadline.date}</p>
              <p>{deadline.description}</p>
              <button onClick={() => deleteDeadline(deadline.id)}>Delete</button>
            </div>
          ))}
        </div>
      </section>

      {isAddDeadlineModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Deadline</h2>
            <input
              type="text"
              placeholder="Course"
              value={newDeadline.course}
              onChange={(e) => setNewDeadline({ ...newDeadline, course: e.target.value })}
              className="modal-input"
            />
            <input
              type="date"
              value={newDeadline.date}
              onChange={(e) => setNewDeadline({ ...newDeadline, date: e.target.value })}
              className="modal-input"
            />
            <textarea
              placeholder="Description"
              value={newDeadline.description}
              onChange={(e) => setNewDeadline({ ...newDeadline, description: e.target.value })}
              className="modal-input"
            />
            <button onClick={addDeadline} className="modal-button">Add Deadline</button>
            <button onClick={closeAddDeadlineModal} className="modal-button">Cancel</button>
          </div>
        </div>
      )}

      <section className="todo-section">
        <h2>To do</h2>
        <div className="todo">
          <div className="todo-card">
            <div className="todo-add">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task"
                className="add-todo-input"
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              />
              <button onClick={addTodo} className="add-todo-button">Add</button>
            </div>
            {todos.map(todo => (
              <div key={todo.id} className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="todo-checkbox"
                />
                <span className={`todo-text ${todo.completed ? 'completed-todo-text' : ''}`}>
                  {todo.text}
                </span>
                <button onClick={() => deleteTodo(todo.id)} className="delete-todo-button">
                  Delete
                </button>
              </div>
            ))}
            <div className="todo-counter">
              {todos.filter(todo => todo.completed).length}/{todos.length} tasks completed
            </div>
          </div>
        </div>
      </section>
      
      <div className="bottom-nav">
        <button onClick={() => navigate('/dashboard')}>🏠</button> {/* Home */}
        <button onClick={() => navigate('/calendar')}>📅</button> {/* Calendar */}
        <button onClick={() => navigate('/grade-calculator')} >📖</button> {/* Placeholder for another route */}
        <button onClick={() => navigate('/course-list')}>📝</button> {/* Placeholder for another route */}
        <button onClick={() => navigate('/profile')}>👤</button> {/* Profile */}
    </div>
    </div>
  );
};

export default Dashboard;
