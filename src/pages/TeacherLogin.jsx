import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherLogin.css';

function TeacherLogin() {
  const navigate = useNavigate();
  const [psychiatrist, setPsychiatrist] = useState({ name: '', password: '' });

  const handleBack = () => {
    navigate('/login');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('psychiatrist', JSON.stringify(psychiatrist));
    navigate('/dashboard');
  };

  return (
    <div className="teacher-login-background">
      <div className="teacher-container">
        <h2>🔒 Safe & Secure: MTM Psychiatrist Access</h2>
        <p>You are accessing a protected area. All information is encrypted and private.</p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Name"
            value={psychiatrist.name}
            onChange={(e) =>
              setPsychiatrist({ ...psychiatrist, name: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={psychiatrist.password}
            onChange={(e) =>
              setPsychiatrist({ ...psychiatrist, password: e.target.value })
            }
            required
          />
          <button type="submit">Login</button>
          <p>✅ Protected by MTM security suite</p>
        </form>
      </div>
      <button className="psych" onClick={handleBack}>◀ Back</button>
    </div>
  );
}

export default TeacherLogin;
