import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/pages/Login'
import Register from '../src/pages/Register';
import StudentDashboard from '../src/pages/StudentDashboard';
import MarkAttendance from '../src/pages/MarkAttendance';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/mark-attendance" element={<MarkAttendance />} />
      </Routes>
    </Router>
  );
};

export default App;
