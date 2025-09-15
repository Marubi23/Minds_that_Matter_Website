import React from 'react';
import './MTMInfoCard.css';
import mtmLogo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const MTMInfoCard = () => {
  const navigate = useNavigate();
  const Learnmore =()=>{
    navigate('/about');

  };



  return (
    <div className="mtm-card">
      <div className="mtm-header">
        <img src={mtmLogo} alt="MTM Logo" className="mtm-logo" />
        <h1 className="mtm-title">Minds That Matter (MTM)</h1>
      </div>
      <p className="mtm-description">
        MTM is a compassionate platform tailored to support students with mental or learning disabilities.
        Our mission is to empower every learner with tools, resources, and connections to thrive in their educational journey.
      </p>
        <div className="portal">
            <Link to="/parent">
              <button>Parental Access</button>
            </Link>
               <button onClick={Learnmore}  className="mtm-button">Learn More</button>
            <Link to="/teacher-login">
              <button>Psychiatrist Access</button>
            </Link>
          </div>
   
         
    </div>
  );
};

export default MTMInfoCard;
