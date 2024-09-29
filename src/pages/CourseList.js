import React, { useState, useEffect } from 'react';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const storedCourses = [
      { id: 1, title: 'React for Beginners', courseCode: 'REACT101', rating: 4.8, hours: 120, people: '5k' },
      { id: 2, title: 'Advanced JavaScript', courseCode: 'JS201', rating: 4.5, hours: 90, people: '3k' },
      { id: 3, title: 'Web Design Basics', courseCode: 'WD101', rating: 4.7, hours: 100, people: '8k' }
    ];

    setCourses(storedCourses);
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