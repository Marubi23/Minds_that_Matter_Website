import React from "react";
import './Video.css';
import { useNavigate } from "react-router-dom";




function Video() {



const navigate=useNavigate();


  const handleBackLesson=()=>{
  navigate('/lessons');
}
  return (
    <div className="video-meeting-cont">
      <button onClick={handleBackLesson} className="video-button" >Go Back to Lessons</button>
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
        
        <label htmlFor="meeting-id" className="input-label">
          Passcode
        </label>
          <input
          id="passcode-id"
          type="number"
          className="meeting-input"
          placeholder="Enter Meeting Passcode"
        />

        <button className="join-button">
          Start Video Conferencing
        </button>
      </div>
    </div>
    </div>
  
  );
}

export default Video;
