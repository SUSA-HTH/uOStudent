import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="header">
        <div className="profile">
          <img src="path_to_profile_image" alt="Profile" className="profile-img" />
          <h1>Hello, Jane</h1>
        </div>
        <div className="notif-icon">
          {/* Notification icon here */}
        </div>
      </header>

      <div className="home-page">
        {/* Search input and buttons */}
        <input
          type="text"
          placeholder="Search courses"
          className="input-field"
        />
        <button className="create-account-button">Create Account</button>
      </div>

      <section className="courses-section">
        <h2>Courses</h2>
        <div className="courses">
          <div className="course-card" style={{ backgroundColor: '#ccff00' }}>
            <h3>UX/UI Designer</h3>
            <p>800$</p>
            <p>⭐ 4.7 | 147 Hours | 10k People</p>
          </div>
          <div className="course-card" style={{ backgroundColor: '#ffcc99' }}>
            <h3>SMM & Marketing</h3>
            <p>400$</p>
            <p>⭐ 4.3 | 125 Hours | 7k People</p>
          </div>
        </div>
      </section>

      <section className="deadlines-section">
        <h2>Upcoming Deadlines</h2>
        <div className="deadlines">
          <div className="deadline-card" style={{ backgroundColor: '#e6ccff' }}>
            <h3>Figma Components</h3>
            <p>100$</p>
            <p>⭐ 4.9 | 26 Hours | 9k People</p>
          </div>
          <div className="deadline-card" style={{ backgroundColor: '#ffff99' }}>
            <h3>Design Portfolio + 2 Cases</h3>
            <p>300$</p>
            <p>⭐ 5.0 | 10 Hours | 17k People</p>
          </div>
        </div>
      </section>

      <section className="todo-section">
        <h2>To do</h2>
        <div className="todo">
          <div className="todo-card" style={{ backgroundColor: '#ffcc99' }}>
            <h3>Adobe Full Course</h3>
            <p>800$</p>
            <p>⭐ 5.0 | 147 Hours | 10k People</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-menu">
          <button>Home</button>
          <button>Calendar</button>
          <button>Courses</button>
          <button>Account</button>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
