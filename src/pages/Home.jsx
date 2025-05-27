import React, { useState, useEffect } from "react";
import './Home.css';
import back1 from '../assets/children2.JPG';
import back2 from '../assets/happy.JPG';
import back4 from '../assets/lapi.JPG';
import back5 from '../assets/background.JPG';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Home() {
  const backgrounds = [back1, back2,back4, back5];
  const [currentBack, setCurrentBack] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const navigate =useNavigate();
  
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);

      setTimeout(() => {
        setCurrentBack(prev => (prev + 1) % backgrounds.length);
        setIsFading(false);
      }, 1000); 
    }, 4000);

    return () => clearInterval(interval);
  }, []);




  return (
    <div className="home-container">
      <button className="about-click-button" onClick={()=>{navigate('/about')}}>ℹ</button>

      <div
        className={`home-background ${isFading ? "fade" : ""}`}
        style={{ backgroundImage: `url(${backgrounds[currentBack]})` }}
      >

        
              <h1  className="welcome" style={{fontFamily:'monospace',color:'yellow'}}><strong>Welcome to Minds that Matter</strong></h1>
        
    
        <div>
           <p style={{margin:'5px'}}><strong>Your simple and supportive learning companion.</strong></p>
        </div>
       
        <Link to ={'/contact'}>
       <button className="chat-button">💬</button> 
       </Link>
      </div>
      <div className="footer-container">
       <footer className='footer'>
          <p >
            Minds that matter is a supportive space designed to make learning more accessible,
            encouraging growth and confidence in every child’s unique journey.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
