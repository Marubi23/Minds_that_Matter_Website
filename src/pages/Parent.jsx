import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Parent.css';
import { Link } from 'react-router-dom';

function Parent() {
  const [parent, setParent] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleParentLogin = (e) => {
    e.preventDefault();
    // Simulate success (for now, no actual fetch)
    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("role", "parent");
    navigate("/progress");
  };

  return (
    <div className="container-parent" style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
      <div className="form-container">
        <h2>🔒 Safe & Secure</h2>
        <p>Parental Access</p>
        <form onSubmit={handleParentLogin}>
          <input
            type="email"
            className="parent-input"
            placeholder="Email"
            value={parent.email}
            onChange={(e) => setParent({ ...parent, email: e.target.value })}
            required
          />
          <input
            type="password"
            className="parent-input"
            placeholder="Password"
            value={parent.password}
            onChange={(e) => setParent({ ...parent, password: e.target.value })}
            required
          />
          <button className="parent-button" type="submit">
            View Child Progress
          </button>
          <p className="trust-note">🔐 Protected by MTM Security Suite</p>
        </form>
      </div>

      <Link to="/sign">
        <button style={{ padding: '20px', background: 'hsla(301, 67.5%, 44.7%, 0.77)', color: 'white', border: 'none', borderRadius: '13px', cursor: 'pointer' }}>
          Don't have an MTM account? Create an Account
        </button>
      </Link>

      <button onClick={() => navigate('/login')} className="floating-home-btn">
        ◀
      </button>
    </div>
  );
}

export default Parent;
