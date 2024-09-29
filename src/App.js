import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calendar from './pages/Calendar';
import CreateAccount from './pages/CreateAccount';
import Profile from "./pages/Profile";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CourseList from './pages/CourseList';
import GradeCalculator from './pages/GradeCalculator';
import CourseView from './pages/CourseView';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/" element={<Login />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/course-list" element={<CourseList />} />
        <Route path="/grade-calculator" element={<GradeCalculator />} />
        <Route path="/courseview/:courseId" element={<CourseView />} />
      </Routes>
    </Router>
  );
};

export default App;