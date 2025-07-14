import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Parent.css';

function Parent() {
  const [parent, setParent] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleParentLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/parents/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parent),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Login failed. Please check your credentials.');
        setLoading(false);
        return;
      }

      // ✅ Store JWT and parent info in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', 'parent');
      localStorage.setItem('parent', JSON.stringify(data.parent));

      // ✅ Navigate to dashboard
      navigate('/progress');
    } catch (err) {
      console.error('Login error:', err);
      alert('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-parent">
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

          <button className="parent-button" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'View Child Progress'}
          </button>

          <p className="trust-note">🔐 Protected by MTM Security Suite</p>
        </form>

        <Link to="/sign" className="account-btn">
          Don't have an MTM account? Create One
        </Link>
      </div>

      <Link to="/" className="floating-home-btn">
        ◀ Back to Homepage
      </Link>
    </div>
  );
}

export default Parent;
