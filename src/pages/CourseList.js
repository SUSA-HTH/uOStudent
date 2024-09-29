import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '../icons/home.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendar, faBook, faEdit, faUser } from '@fortawesome/free-solid-svg-icons';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCourses = localStorage.getItem('courses');
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
    }
  }, []);

  const viewCourse = (courseId) => {
    navigate(`/courseview/${courseId}`);  
  };

  return (
    <div>
      <section>
        <h2>Available Courses</h2>
        <div className="course-list">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id} onClick={() => viewCourse(course.id)} className="course-card">
                <h3>{course.name}</h3>
                <p>{course.code}</p>
              </div>
            ))
          ) : (
            <p>No courses available</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default CourseList;