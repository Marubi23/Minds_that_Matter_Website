import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PsychiatristLogin.css'; 

function PsychiatristLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleBack = () => {
    navigate('/login');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/psychiatrist/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('psychiatristToken', data.token);
        localStorage.setItem('psychiatristName', data.name);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="teacher-login-background">
      <div className="teacher-container">
        <h2>🔒 Safe & Secure: MTM Psychiatrist Access</h2>
        <p>You are accessing a protected area. All information is encrypted and private.</p>
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
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <p>✅ Protected by MTM security suite</p>
        </form>
      </div>
      <button className="psych" onClick={handleBack}>◀ Back</button>
    </div>
  );
}

export default PsychiatristLogin;
