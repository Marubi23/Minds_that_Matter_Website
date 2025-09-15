import { useLocation, useNavigate } from 'react-router-dom';
import './PinDisplay.css';

function PinDisplay() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pin, name, avatar } = location.state || {};

  if (!pin || !name || !avatar) {
    return (
      <div className="pin-page">
        <div className="error-box">
          <h2>⚠️ Oops! Incomplete data.</h2>
          <button className="btn" onClick={() => navigate('/complete-profile')}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pin-page">
      <div className="success-card">
        <h2>🎉 Profile Created Successfully!</h2>

        <div className="avatar-preview">
          <img src={avatar} alt="Selected Avatar" className="avatar-img" />
          <p className="student-name">{name}</p>
        </div>

        <p className="info-text">Your login PIN is:</p>
        <div className="pin-box">{pin}</div>
        <p className="info-text">Use this PIN with your avatar to log in.</p>

        <button className="btn" onClick={() => navigate('/login')}>
          Go to Login Page
        </button>
      </div>
    </div>
  );
}

export default PinDisplay;
