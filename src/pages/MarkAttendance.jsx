import React, { useRef } from 'react';
import axios from 'axios';

const MarkAttendance = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const captureSelfie = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/png');
    return dataUrl;
  };

  const handleAttendance = async () => {
    const selfie = captureSelfie();
    try {
      await axios.post(
        '/api/attendance/mark',
        { selfie },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Attendance marked successfully!');
    } catch (error) {
      alert('Failed to mark attendance.');
    }
  };

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch(() => alert('Camera access denied.'));
  };

  return (
    <div className="mark-attendance-container">
      <h2>Mark Attendance</h2>
      <button onClick={startCamera}>Start Camera</button>
      <video ref={videoRef} width="300" height="300" autoPlay></video>
      <canvas ref={canvasRef} width="300" height="300" hidden></canvas>
      <button onClick={handleAttendance}>Mark Attendance</button>
    </div>
  );
};

export default MarkAttendance;
