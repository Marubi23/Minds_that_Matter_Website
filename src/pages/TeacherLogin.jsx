import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherLogin.css';
import { Link } from 'react-router-dom';

function TeacherLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('role','psychiatrist');

    
    if (email === 'teacher@example.com' && password === 'password123') {
      navigate('/teacher-dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="teacher-login-background">
      <div className="teacher-container">
        <h2>🔒 Safe & Secure:
          MTM Psychiatrist Access
        </h2>
        <p>You are accessing a protected area.All information is encrypted and private</p>
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
         <Link to='/dashboard'><button type="submit">Login</button></Link> 
         <p>✅ Protected by MTM  security suite</p>
        </form>
      </div>

    </div>
  );
}

export default TeacherLogin;
