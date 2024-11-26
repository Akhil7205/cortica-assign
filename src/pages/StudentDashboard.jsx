import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
  const [attendanceHistory, setAttendanceHistory] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get('/api/attendance/history', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setAttendanceHistory(response.data);
      } catch (error) {
        alert('Failed to fetch attendance history.');
      }
    };
    fetchAttendance();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Attendance History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Punch-in Time</th>
            <th>Selfie</th>
          </tr>
        </thead>
        <tbody>
          {attendanceHistory.map((record) => (
            <tr key={record.id}>
              <td>{record.date}</td>
              <td>{record.time}</td>
              <td>
                <img src={record.selfieUrl} alt="Selfie" width={50} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard;
