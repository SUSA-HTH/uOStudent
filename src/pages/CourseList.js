import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '../icons/home.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendar, faBook, faEdit, faUser } from '@fortawesome/free-solid-svg-icons';

const CourseList = () => {
    const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const storedCourses = localStorage.getItem('courses');
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
    }
  }, []);

  return (
    <div className="course-list">
      <h1>Your Courses</h1>
      <div className="course-container">
        {courses.length > 0 ? (
          courses.map(course => (
            <div key={course.id} className="course-item" style={{ backgroundColor: course.backgroundColor }}>
              <h3>{course.name}</h3>
              <p>{course.code}</p>
            </div>
          ))
        ) : (
          <p>No courses added yet.</p>
        )}
          </div>
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

export default CourseList;