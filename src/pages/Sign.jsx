import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Sign.css';

function Sign() {
  const [parent, setParent] = useState({ email: '', password: '' });
  const navigate = useNavigate(); 

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/parents/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parent)
      });

      const data = await response.json();

      if (response.ok) {
        alert('Account created successfully!');
        navigate('/login');
      } else {
        alert(data.message || 'Sign up failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Server error');
    }
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <div className="main" style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
      
      <button onClick={handleBack} className='navigate-button'>Go Back to login</button>
      <div className="form-sign">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}> 
          <input
            type="email"
            className="sign-input"
            placeholder="Email"
            value={parent.email}
            onChange={(e) => setParent({ ...parent, email: e.target.value })}
            required
          />
          <input
            type="password"
            className="sign-input"
            placeholder="Password"
            value={parent.password}
            onChange={(e) => setParent({ ...parent, password: e.target.value })}
            required
          />
          <button className="sign-button" type="submit">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Sign;
