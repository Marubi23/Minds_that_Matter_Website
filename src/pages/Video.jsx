import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AttentionMonitor from '../Components/AttentionMonitor';
import './Video.css';

function Video() {
  const [view, setView] = useState('form'); // form → waiting → conference
  const [roomID, setRoomID] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const videoContainerRef = useRef(null);
  const apiRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const student = JSON.parse(localStorage.getItem('student') || '{}');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const prefillRoom = queryParams.get('room');
    if (prefillRoom) setRoomID(prefillRoom);
  }, [location.search]);

  
  useEffect(() => {
    if (view === 'conference' && roomID && videoContainerRef.current) {
      const domain = 'meet.jit.si';
      const options = {
        roomName: roomID,
        parentNode: videoContainerRef.current,
        width: '100%',
        height: 600,
        userInfo: {
          displayName: student.name || 'Student',
        },
        configOverwrite: {
          disableInviteFunctions: true,
          defaultLanguage: 'en',
        },
      };

      apiRef.current = new window.JitsiMeetExternalAPI(domain, options);

      return () => {
        apiRef.current?.dispose();
      };
    }
  }, [view, roomID, student.name]);

  const handleBackLesson = () => {
    navigate('/lessons');
  };

  const handleJoinMeeting = () => {
    setError('');
    const enteredRoomID = roomID.trim();
    const enteredPasscode = passcode.trim();

    if (!enteredRoomID || !enteredPasscode) {
      setError('Please enter both Room ID and Passcode');
      return;
    }

    const storedRooms = JSON.parse(localStorage.getItem('rooms') || '{}');

    if (!storedRooms[enteredRoomID]) {
      setError('Room ID does not exist');
      return;
    }

    if (storedRooms[enteredRoomID] !== enteredPasscode) {
      setError('Incorrect passcode');
      return;
    }

    setView('waiting');
    setTimeout(() => {
      setView('conference');
    }, 2000);
  };

  return (
    <div className="video-meeting-cont">
      <button onClick={handleBackLesson} className="video-button">
        Go Back to Lessons
      </button>

      {view === 'form' && (
        <div className="video-wrapper">
          <div className="video-container">
            <h2 className="video-title">Join a Session</h2>

            <label>Room ID</label>
            <input
              type="text"
              value={roomID}
              onChange={(e) => setRoomID(e.target.value)}
              className="meeting-input"
              placeholder="Enter Room ID"
            />

            <label>Passcode</label>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="meeting-input"
              placeholder="Enter Passcode"
            />

            {error && <p className="error-text">{error}</p>}

            <button className="join-button" onClick={handleJoinMeeting}>
              Start Session
            </button>
          </div>
        </div>
      )}

      {view === 'waiting' && (
        <div className="waiting-room">
          <img src="/Waiting.gif" alt="waiting" className="waiting-img" />
          <h3>Please wait while we connect you...</h3>
        </div>
      )}

      {view === 'conference' && (
        <div style={{ position: 'relative' }}>
          <div ref={videoContainerRef} style={{ width: '100%', height: 600 }} />
          <AttentionMonitor
            onAttentionDrop={() => {
              console.warn('⚠️ Attention dropped!');
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Video;
