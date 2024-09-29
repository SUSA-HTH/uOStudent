import axios from "axios";
import TaskItem from "../components/TaskItem";
import { format, addDays, subDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Calendar = () => {
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
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCourseCodeChange = (e) => {
    setCourseCode(e.target.value);
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/course-data',{
          courseName: "Introduction to Business",
          courseCode: courseCode,
        });

      console.log("Full API Response:", response);

      if (response.data) {
        // Store the API response as a string
        setApiResponse(response.data.data);
        findInstructor(response.data.data); // Call the function to find the instructor name
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
  
  const [newDeadline, setNewDeadline] = useState({
    title: "",
    courseCode: "",
    date: "",
    time: "",
  });

  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  const [taskData, setTaskData] = useState(() => {
    const savedData = localStorage.getItem("taskData");
    return savedData ? JSON.parse(savedData) : {};
  });

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
    setNewDeadline({ title: "", courseCode: "", date: "", time: "" });
  };

  const addDeadline = () => {
    if (newDeadline.title && newDeadline.courseCode && newDeadline.date) {
      // Create a new date object and set the time to the start of the day
      const deadlineDate = new Date(newDeadline.date);

      // Set hours, minutes, seconds, and milliseconds to 0 to ensure it is treated as the start of the day
      deadlineDate.setHours(0, 0, 0, 0);

      // Format the date for storage
      const formattedDate = format(deadlineDate, "yyyy-MM-dd");

      setTaskData((prevData) => {
        const updatedData = { ...prevData };
        if (!updatedData[formattedDate]) {
          updatedData[formattedDate] = [];
        }
        updatedData[formattedDate].push({
          id: Date.now(), // Add a unique id for each deadline
          title: newDeadline.title,
          courseCode: newDeadline.courseCode,
          time: newDeadline.time,
          color: "#ccff00",
        });
        localStorage.setItem("taskData", JSON.stringify(updatedData));
        return updatedData;
      });
      closeModal();
    }
  };

  

  

  

  const deleteDeadline = (dateKey, deadlineId) => {
    setTaskData((prevData) => {
      const updatedData = { ...prevData };
      updatedData[dateKey] = updatedData[dateKey].filter(
        (task) => task.id !== deadlineId
      );
      if (updatedData[dateKey].length === 0) {
        delete updatedData[dateKey];
      }
      localStorage.setItem("taskData", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <button onClick={handlePreviousDay}>&lt;</button>
        <div className="selected-day">
          {format(selectedDate, "E, MMM d, yyyy")}
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
      <button onClick={openModal} className="add-deadline-button">
        Add Deadline
      </button>
      <button onClick={openModal} className="add-deadline-button">
        Add Deadline
      </button>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Deadline</h2>
            <input
              type="text"
              placeholder="Deadline Title"
              value={newDeadline.title}
              onChange={(e) =>
                setNewDeadline({ ...newDeadline, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Course Code"
              value={newDeadline.courseCode}
              onChange={(e) =>
                setNewDeadline({ ...newDeadline, courseCode: e.target.value })
              }
            />
            <input
              type="date"
              value={newDeadline.date}
              onChange={(e) =>
                setNewDeadline({ ...newDeadline, date: e.target.value })
              }
            />
            <input
              type="time"
              value={newDeadline.time}
              onChange={(e) =>
                setNewDeadline({ ...newDeadline, time: e.target.value })
              }
            />
            <button onClick={addDeadline}>Save Deadline</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
      <h2>Enter Course Code</h2>
      <input
        type="text"
        value={courseCode}
        onChange={handleCourseCodeChange}
        placeholder="Enter course code"
      />
      <button onClick={fetchData}>Fetch Course Data</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div>
          <h2>Course Name</h2>
          <p>{coursename}</p>
          <h2>Instructor Name</h2>
          <p>{instructorName}</p>
          <h2>Start Date</h2>
          <p>{startdate}</p>
          <h2>End Date</h2>
          <p>{enddate}</p>
          <h2>Start Time</h2>
          <p>{starttime}</p>
          <h2>End Time</h2>
          <p>{endtime}</p>
        </div>
      )}
      <div className="bottom-nav">
        <button onClick={() => navigate("/dashboard")}>🏠</button>
        <button onClick={() => navigate("/calendar")}>📅</button>
        <button>📖</button>
        <button>📝</button>
        <button onClick={() => navigate("/profile")}>👤</button>
      </div>
    </div>
  );
};

export default Calendar;
