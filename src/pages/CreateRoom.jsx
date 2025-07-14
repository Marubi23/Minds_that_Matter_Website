import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateRoom.css';

function CreateRoom() {
  const [roomName, setRoomName] = useState('');
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const navigate = useNavigate();

  const generateRoomID = () => {
    const random = Math.floor(1000 + Math.random() * 9000);
    const cleanName = roomName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `${cleanName}-${random}`;
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();

    if (roomName.trim().length < 3 || passcode.trim().length < 4) {
      alert('Room name must be at least 3 characters and passcode at least 4.');
      return;
    }

    const roomID = generateRoomID();

    // Save to localStorage
    const storedRooms = JSON.parse(localStorage.getItem('rooms') || '{}');
    if (storedRooms[roomID]) {
      alert('Room already exists, please try another name.');
      return;
    }

    storedRooms[roomID] = passcode.trim();
    localStorage.setItem('rooms', JSON.stringify(storedRooms));

    navigate(`/video?room=${encodeURIComponent(roomID)}`);
  };

  return (
    <div className="create-room">
       <div className="create-room-container glass-panel">
      <div className="create-container">
         <h2 className="animated-title">📹 Create Your Video Room</h2>
      <form onSubmit={handleCreateRoom} className="room-form">
        <label>Room Name</label>
        <input
          required
          type="text"
          placeholder="e.g. Math Class"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />

        <label>Passcode</label>
        <div className="passcode-input">
          <input
            required
            type={showPasscode ? 'text' : 'password'}
            placeholder="Enter Passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
          />
          <button
            type="button"
            className="toggle-pass"
            onClick={() => setShowPasscode(!showPasscode)}
            aria-label="Toggle passcode visibility"
          >
            {showPasscode ? '🙈 Hide' : '👁️ Show'}
          </button>
        </div>

        <button type="submit" className="submit-btn">✨ Create Room</button>
      </form>
    </div>

      </div>
     
    </div>
   
  );
}

export default CreateRoom;
