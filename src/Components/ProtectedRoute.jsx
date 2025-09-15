import { useNavigate } from 'react-router-dom';
import profile from '../assets/father.JPG';
import profile2 from '../assets/siblings.JPG';
import './ProtectedRoute.css';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="protected-container">
        <div className="protected-card">
          <h2 className="protected-title">Choose Your Profile</h2>
          <p className="protected-subtext">Select your profile to view the appropriate Resources</p>

          <div className="protected-profiles">
            <div className="protected-profile" onClick={() => navigate('/about#packages')}>
              <img src={profile} alt="Parent Profile" className="protected-image" />
              <h4>Parent</h4>
              <button className="protected-button">Access</button>
            </div>

            <div className="protected-profile" onClick={() => navigate('/login')}>
              <img src={profile2} alt="Student Profile" className="protected-image" />
              <h4>Student</h4>
              <button className="protected-button">Access</button>
            </div>
          </div>

          <p className="protected-notice">
            <strong>Note:</strong> Once logged in, return to the Resources page to access content for your role.
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
