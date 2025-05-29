import React,{useState} from 'react';
import{useNavigate} from 'react-router-dom';
import './CreateRoom.css';

function CreateRoom(){
    const [roomName,setRoomName]=useState('');
    const [passcode,setPasscode]=useState('');
    const navigate=useNavigate();

    const handleCreateRoom=(e)=>{
        e.preventDefault();

        if(!roomName.trim() || !passcode.trim()) {
            alert('please fill in both fields.');
            return;
        }
    }
 navigate(`/waiting?room=${encodeURIComponent(roomName)}&passcode=${passcode}`);

 return(
    <div className="create-room-container">
        <h2>Create a Video Meeting Room</h2>
        <form onSubmit={handleCreateRoom}>
            <label>Room Name</label>
            <input type="text"
            placeholder='Enter Room Name'
            value={roomName}
            onChange={(e)=>setRoomName(e.target.value)}
             />
             <label>Passcode</label>
             <input type="password"
             placeholder='Enter Passcode'
             onChange={(e)=>setPasscode(e.target.value)}
              />
              <button type='submit'>Create Room</button>
        </form>
    </div>
 );

}
export default CreateRoom;