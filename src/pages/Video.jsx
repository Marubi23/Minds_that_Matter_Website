import React, { useState, useEffect, useRef } from "react";
import './Video.css';
import { useNavigate } from "react-router-dom";
import waitingImage from "../assets/waiting.gif";

function Video() {
  const [view, setView] = useState("form"); // form → waiting → conference
  const [roomID, setRoomID] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const jitsiContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (view === "conference" && roomID) {
      const domain = "meet.jit.si";
      const options = {
        roomName: roomID,
        parentNode: jitsiContainerRef.current,
        width: '100%',
        height: 600,
        configOverwrite: {},
        interfaceConfigOverwrite: {},
        userInfo:{
          displayName: student.name || "Student"

        },
        defaultLanguage:'en',
      };

      // eslint-disable-next-line no-undef
      const api = new window.JitsiMeetExternalAPI(domain, options);

      return () => api.dispose();
    }
  }, [view, roomID]);

  const handleBackLesson = () => {
    navigate("/lessons");
  };

  const handleJoinMeeting = () => {
    setError('');
    const meetingIdInput = document.getElementById("meeting-id").value.trim();
    const passcodeInput = document.getElementById("passcode-id").value.trim();

    if (!meetingIdInput || !passcodeInput) {
      setError('Please enter both Meeting ID and Passcode');
      return;
    }

    const storedRooms = JSON.parse(localStorage.getItem('rooms') || '{}');

    if (!storedRooms[meetingIdInput]) {
      setError('Meeting ID does not exist');
      return;
    }
    if (storedRooms[meetingIdInput] !== passcodeInput) {
      setError('Incorrect passcode');
      return;
    }

    setRoomID(meetingIdInput);
    setPasscode(passcodeInput);
    setView("waiting");

    // Simulate waiting room delay before joining
    setTimeout(() => {
      setView("conference");
    }, 4000);
  };

  return (
    <div className="video-meeting-cont">
      <button onClick={handleBackLesson} className="video-button">
        Go Back to Lessons
      </button>

      {view === "form" && (
        <div className="video-wrapper">
          <div className="video-container">
            <h2 className="video-title">Join a Meeting</h2>

            <label htmlFor="meeting-id" className="input-label">Meeting ID</label>
            <input
              id="meeting-id"
              type="text"
              className="meeting-input"
              placeholder="Enter Meeting ID"
            />

            <label htmlFor="passcode-id" className="input-label">Passcode</label>
            <input
              id="passcode-id"
              type="password"
              className="meeting-input"
              placeholder="Enter Meeting Passcode"
            />

            {error && <p className="error-text">{error}</p>}

            <button className="join-button" onClick={handleJoinMeeting}>
              Start Video Conferencing
            </button>
          </div>
        </div>
      )}

      {view === "waiting" && (
        <div className="waiting-room">
          <img src={waitingImage} alt="waiting" className="waiting-img" />
          <h3 className="waiting-text">Please wait while we register you to the meeting...</h3>
          <p className="waiting-subtext">This won't take long. Thank you for your patience 😊</p>
        </div>
      )}

      {view === "conference" && (
        <div ref={jitsiContainerRef} style={{ height: 600, width: '100%' }} />
      )}
    </div>
  );
}

export default Video;
