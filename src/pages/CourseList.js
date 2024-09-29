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
      <h2>Your Courses</h2>
      <div className="courses">
        {courses.map(course => (
          <div className="course-item" key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.courseCode}</p>
            <p>⭐ {course.rating} | {course.hours} Hours | {course.people} People</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;