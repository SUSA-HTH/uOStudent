import React, { useState, useEffect } from 'react';

const CourseList = () => {
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
    </div>
  );
};

export default CourseList;