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
    return `${roomName.toLowerCase().replace(/\s+/g, '-')}-${random}`;
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();

    if (!roomName.trim() || !passcode.trim()) {
      alert('Please fill in both fields.');
      return;
    }

    const roomID = generateRoomID();
    const storedRooms =JSON.parse(localStorage.getItem('rooms') || '{}');
    storedRooms[roomName]=passcode; //save new room
     localStorage.setItem('rooms',JSON.stringify(storedRooms));

    navigate(`/waiting?room=${encodeURIComponent(roomID)}`);
  };

  return (
    <div className="create-room-container glass-panel">
      <h2 className="animated-title">📹 Create Your Video Room</h2>

      <form onSubmit={handleCreateRoom} className="room-form">
        <label>Room Name</label>
        <input
          type="text"
          placeholder="e.g. Math Class"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />

        <label>Passcode</label>
        <div className="passcode-input">
          <input
            type={showPasscode ? 'text' : 'password'}
            placeholder="Enter Passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
          />
          <button
            type="button"
            className="toggle-pass"
            onClick={() => setShowPasscode(!showPasscode)}
          >
            {showPasscode ? '🙈 Hide' : '👁️ Show'}
          </button>
        </div>

        <button type="submit" className="submit-btn">✨ Create Room</button>
      </form>
    </div>
  );
}

export default CreateRoom;

