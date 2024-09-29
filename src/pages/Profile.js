import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from './Calendar'; // Import your Calendar component
import { FaHome, FaCalendarAlt, FaBook, FaPen, FaUser } from 'react-icons/fa'; // Font Awesome Icons


const Profile = () => {
  const [activeTab, setActiveTab] = useState('upcoming'); // Manage active tab
  const navigate = useNavigate(); // Hook to navigate
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="settings-icon">⚙️</div>
        <h2>My Profile</h2>
        <div className="profile-picture">
          <span role="img" aria-label="profile">
            👀
          </span>
        </div>
        <h3>Jane Sodi</h3>
      </div>

      <div className="profile-tabs">
        
       
        <button
          className={activeTab === 'account' ? 'active' : ''}
          onClick={() => handleTabClick('account')}
        >
          My Account
        </button>
      </div>

      <div className="profile-content">
        
        {activeTab === 'account' && (
          <div className="account-settings">
            <h4>Account Details</h4>
            <p>Email: jane.sodi@example.com</p>
            <p>Phone: +1234567890</p>
            <h4>Preferences</h4>
            <label>Notifications</label>
            <input type="checkbox" checked /> Email notifications
            <input type="checkbox" /> SMS notifications
          </div>
        )}
      </div>

      <div className="bottom-nav">
        <button onClick={() => navigate('/dashboard')}>🏠</button> {/* Home */}
        <button onClick={() => navigate('/calendar')}>📅</button> {/* Calendar */}
        <button>📖</button> {/* Placeholder for another route */}
        <button>📝</button> {/* Placeholder for another route */}
        <button onClick={() => navigate('/profile')}>👤</button> {/* Profile */}
    </div>
      </div>

  );
};

export default Profile;
