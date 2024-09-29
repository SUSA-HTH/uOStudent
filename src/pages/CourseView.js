import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CourseView = () => {
  const { courseId } = useParams();  
  const [course, setCourse] = useState(null);
  const [deadlines, setDeadlines] = useState([]);

  useEffect(() => {
    const storedCourses = localStorage.getItem('courses');
    const storedDeadlines = localStorage.getItem('deadlines');

    if (storedCourses) {
      const courses = JSON.parse(storedCourses);
      const selectedCourse = courses.find(course => course.id.toString() === courseId);
      if (selectedCourse) {
        setCourse(selectedCourse); 
      } else {
        console.error('Course not found');
      }
    }

    if (storedDeadlines && course) {
      const allDeadlines = JSON.parse(storedDeadlines);
      const courseDeadlines = allDeadlines.filter(deadline => deadline.course === course.code);
      setDeadlines(courseDeadlines); 
    }
  }, [courseId, course]);

  if (!course) {
    return <p>Course not found</p>;
  }

  return (
    <div>
      <h2>{course.name} ({course.code})</h2>  
      <section>
        <h3>Upcoming Deadlines</h3>
        <ul>
          {deadlines.length > 0 ? (
            deadlines.map(deadline => (
              <li key={deadline.id}>
                <strong>{deadline.date}:</strong> {deadline.description}
              </li>
            ))
          ) : (
            <p>No upcoming deadlines</p>
          )}
        </ul>
      </section>
    </div>
  );
};

export default CourseView;