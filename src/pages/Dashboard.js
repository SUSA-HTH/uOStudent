import React, { useState, useEffect } from "react";
import Calendar from "./Calendar"; // Assuming you have a Calendar component
import "../styles/Dashboard.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Code } from "@chakra-ui/react";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: "", code: "" });
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [deadlines, setDeadlines] = useState([]); // State to store deadlines
  const [isAddDeadlineModalOpen, setIsAddDeadlineModalOpen] = useState(false); // State for deadline modal
  const [newDeadline, setNewDeadline] = useState({
    course: "",
    date: "",
    description: "",
  });
  const [colorIndex, setColorIndex] = useState(0); // State to keep track of color index
  const [userFullName, setUserFullName] = useState(""); // State to store the logged-in user's full name
  const navigate = useNavigate(); // Ensure this is defined here
  const [courseCode, setCourseCode] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [instructorName, setInstructorName] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [starttime, setStartTime] = useState("");
  const [endtime, setEndTime] = useState("");
  const [coursename, setCourseName] = useState("");

  const handleCourseCodeChange = (e) => {
    setCourseCode(e.target.value);
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/course-data",
        {
          courseName: "Introduction to Business", // This can be dynamic if needed
          courseCode: courseCode, // Use courseCode from the state
        }
      );

      if (response.data) {
        setApiResponse(response.data.data);
        findInstructor(response.data.data); // Extract course data like instructor, start/end times
        // Ensure that course name and other values are set before calling addCourse
        addCourse();
      } else {
        setError("No data available.");
      }
    } catch (err) {
      console.error("Error fetching course data:", err);
      setError("Failed to fetch course data");
    } finally {
      setLoading(false);
    }
  };

  const findInstructor = (responseString) => {
    // Use a regular expression to find the instructor and capture what's after it
    const instructorMatch = responseString.match(
      /instructor"\s*:\s*"([^"]*)"/i
    );
    const startDateMatch = responseString.match(/start_date"\s*:\s*"([^"]*)"/i);
    const endDateMatch = responseString.match(/end_date"\s*:\s*"([^"]*)"/i);
    const endTimeMatch = responseString.match(/end_time"\s*:\s*"([^"]*)"/i);
    const startTimeMatch = responseString.match(/start_time"\s*:\s*"([^"]*)"/i);
    const courseNameMatch = responseString.match(
      /course_name"\s*:\s*"([^"]*)"/i
    );

    if (instructorMatch && instructorMatch[1]) {
      setInstructorName(instructorMatch[1].trim());
    } else {
      setInstructorName("No instructor found");
    }

    if (startDateMatch && startDateMatch[1]) {
      setStartdate(startDateMatch[1].trim());
    } else {
      setStartdate("No Start Date found");
    }

    if (endDateMatch && endDateMatch[1]) {
      setEnddate(endDateMatch[1].trim());
    } else {
      setEnddate("No End Date found");
    }
    if (endTimeMatch && endTimeMatch[1]) {
      setEndTime(endTimeMatch[1].trim());
    } else {
      setEndTime("No End Time found");
    }
    if (startTimeMatch && startTimeMatch[1]) {
      setStartTime(startTimeMatch[1].trim());
    } else {
      setStartTime("No Start Time found");
    }
    if (courseNameMatch && courseNameMatch[1]) {
      setCourseName(courseNameMatch[1].trim());
    } else {
      setCourseName("No Course Name found");
    }
  };

  // Array of 5 different background colors
  const backgroundColors = [
    "#f38dab",
    "#d2d449",
    "#ed8f49",
    "#e8b5bd",
    "#cebcff",
  ];

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    const storedCourses = localStorage.getItem("courses");
    const storedDeadlines = localStorage.getItem("deadlines");

    if (storedTodos) setTodos(JSON.parse(storedTodos));
    if (storedCourses) setCourses(JSON.parse(storedCourses));
    if (storedDeadlines) setDeadlines(JSON.parse(storedDeadlines));
  }, []);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUserFullName(loggedInUser.fullname); // This should set the user's full name
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("courses", JSON.stringify(courses));
    localStorage.setItem("deadlines", JSON.stringify(deadlines));
  }, [todos, courses, deadlines]);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const openAddCourseModal = () => {
    setIsAddCourseModalOpen(true);
  };

  const closeAddCourseModal = () => {
    setIsAddCourseModalOpen(false);
    setNewCourse({ name: "", code: "" });
  };

  const addCourse = () => {
    if (courseCode) {
      const newColorIndex = colorIndex % backgroundColors.length; // Cycle through colors
      const backgroundColor = backgroundColors[newColorIndex]; // Get the background color

      // Create a new course object with all the details fetched from API
      const newCourseObject = {
        id: Date.now(),
        name: coursename, // Course name from the API response
        code: courseCode, // Course code from the input
        instructor: instructorName, // Instructor name from API response
        startDate: startdate, // Start date from API response
        endDate: enddate, // End date from API response
        startTime: starttime, // Start time from API response
        endTime: endtime, // End time from API response
        backgroundColor: backgroundColor,
      };

      // Add the new course to the courses state and trigger a re-render
      setCourses([...courses, newCourseObject]);

      // Increment the color index for the next course
      setColorIndex(colorIndex + 1);

      // Close the modal
      closeAddCourseModal();

      // Clear the course input field
      setCourseCode(""); // Reset course code input field
      setCourseName(""); // Reset course name field (if needed)
    } else {
      console.error("Course data is missing.");
    }
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const openAddDeadlineModal = () => {
    setIsAddDeadlineModalOpen(true);
  };

  const closeAddDeadlineModal = () => {
    setIsAddDeadlineModalOpen(false);
    setNewDeadline({ course: "", date: "", description: "" });
  };

  const addDeadline = () => {
    if (newDeadline.course && newDeadline.date) {
      setDeadlines([...deadlines, { ...newDeadline, id: Date.now() }]);
      closeAddDeadlineModal();
    }
  };

  const deleteDeadline = (id) => {
    setDeadlines(deadlines.filter((deadline) => deadline.id !== id));
  };

  return (
    <div className="dashboard">
      <header className="header">
        <div className="profile">
          <h1>Hello, {userFullName}</h1>
        </div>
      </header>

      <section className="course-page">
        <div className="course-header">
          <h2>Courses</h2>
          <button onClick={openAddCourseModal} className="add-course-button">
            +
          </button>
        </div>
        <div className="courses">
          {courses.map((course) => (
            <div
              key={course.id}
              className="course-item"
              style={{ backgroundColor: course.backgroundColor }}
            >
              <h3>{coursename}</h3>
              <p>Code: {course.code}</p>
              <p>Instructor: {course.instructor}</p>
              <p>Start Date: {course.startDate}</p>
              <p>End Date: {course.endDate}</p>
              <p>Start Time: {course.startTime}</p>
              <p>End Time: {course.endTime}</p>
              <button
                onClick={() => deleteCourse(course.id)}
                className="delete-course-button"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {isAddCourseModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Course</h2>

            {/* Input field for course code */}
            <input
              type="text"
              placeholder="Course Code"
              value={courseCode} // Bind the input value to the courseCode state
              onChange={(e) => setCourseCode(e.target.value)} // Update courseCode state on input change
              className="modal-input"
            />

            {/* Button to fetch data and add the course */}
            <button onClick={fetchData} className="modal-button">
              Add Course
            </button>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {/* Cancel button to close the modal */}
            <button onClick={closeAddCourseModal} className="modal-button">
              Cancel
            </button>
          </div>
        </div>
      )}

      <section className="deadlines-section">
        <h2>Upcoming Deadlines</h2>
        <div className="deadlines">
          <Calendar />

          {deadlines.map((deadline) => (
            <div key={deadline.id} className="deadline-item">
              <h3>{deadline.course}</h3>
              <p>{deadline.date}</p>
              <p>{deadline.description}</p>
              <button onClick={() => deleteDeadline(deadline.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

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
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
              />
              <button onClick={addTodo} className="add-todo-button">
                Add
              </button>
            </div>
            {todos.map((todo) => (
              <div key={todo.id} className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="todo-checkbox"
                />
                <span
                  className={`todo-text ${
                    todo.completed ? "completed-todo-text" : ""
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-todo-button"
                >
                  Delete
                </button>
              </div>
            ))}
            <div className="todo-counter">
              {todos.filter((todo) => todo.completed).length}/{todos.length}{" "}
              tasks completed
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
