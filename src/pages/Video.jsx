import React, { useState } from "react";
import './Video.css';
import { useNavigate } from "react-router-dom";
import waitingImage from "../assets/waiting.gif"; // use your toon or custom waiting image

function Video() {
  const [view, setView] = useState("form"); // "form", "waiting"
  const navigate = useNavigate();

  const handleBackLesson = () => {
    navigate("/lessons");
  };

  const handleJoinMeeting = () => {
const meetingId=document.getElementById("meeting-id").value.trim();
const passcode = document.getElementById("passcode-id").value.trim();

 if(!meetingId || !passcode){
  alert('Please enter both Meeting ID and Passcode');
  return;
 }
// Simulate processing, then show waiting room
    setView("waiting");

    // Simulate actual meeting start after X seconds
    setTimeout(() => {
      alert("You've been admitted to the meeting! (Coming soon)");
    }, 5000); // simulate waiting for 5 seconds
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

            <label htmlFor="meeting-id" className="input-label">
              Meeting ID
            </label>
            <input
              id="meeting-id"
              type="text"
              className="meeting-input"
              placeholder="Enter Meeting ID"
            />

            <label htmlFor="passcode-id" className="input-label">
              Passcode
            </label>
            <input
              id="passcode-id"
              type="number"
              className="meeting-input"
              placeholder="Enter Meeting Passcode"
            />

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
    </div>
  );
}

export default Video;
