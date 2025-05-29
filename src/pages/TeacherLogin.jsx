import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherLogin.css';

function TeacherLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Replace this mock check with real backend auth later
    if (email === 'teacher@example.com' && password === 'password123') {
      navigate('/teacher-dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="teacher-login-background">
      <div className="teacher-container">
        <h2>Teacher Login</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default TeacherLogin;
