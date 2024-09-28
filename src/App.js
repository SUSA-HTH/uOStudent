import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calendar from './pages/Calendar';
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile />} /> 
      </Routes>
    </Router>
  );
};

export default App;
