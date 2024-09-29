import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calendar from './pages/Calendar';
import CreateAccount from './pages/CreateAccount';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CourseList from './pages/CourseList';
import GradeCalculator from './pages/GradeCalculator';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/course-list" element={<CourseList />} />
        <Route path="/grade-calculator" element={<GradeCalculator />} />
      </Routes>
    </Router>
  );
};

export default App;