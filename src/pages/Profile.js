import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
          className={activeTab === 'upcoming' ? 'active' : ''}
          onClick={() => handleTabClick('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={activeTab === 'calendar' ? 'active' : ''}
          onClick={() => handleTabClick('calendar')}
        >
          Calendar
        </button>
        <button
          className={activeTab === 'account' ? 'active' : ''}
          onClick={() => handleTabClick('account')}
        >
          My Account
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'upcoming' && (
          <div className="upcoming-content">
            <h4>This Week</h4>
            <div className="chart">
              {/* Sample chart bars for the week */}
              {[15, 16, 17, 18, 19, 20, 21].map((day) => (
                <div key={day} className="chart-bar">
                  <div className="filled" style={{ height: `${Math.random() * 100}%` }}></div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'calendar' && <p>Calendar content goes here...</p>}
        {activeTab === 'account' && <p>My Account settings go here...</p>}
      </div>

      <div className="bottom-nav">
        <button onClick={() => navigate('/')}>🏠</button> {/* Home */}
        <button onClick={() => navigate('/calendar')}>📅</button> {/* Calendar */}
        <button>📖</button> {/* Placeholder for another route */}
        <button>📝</button> {/* Placeholder for another route */}
        <button onClick={() => navigate('/profile')}>👤</button> {/* Profile */}
    </div>
    </div>
  );
};

export default Profile;
