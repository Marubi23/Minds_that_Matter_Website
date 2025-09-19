import React, { useState, useEffect } from "react";
import './Home.css';
import back1 from '../assets/children2.JPG';
import back2 from '../assets/happy.JPG';
import back4 from '../assets/lapi.JPG';
import back5 from '../assets/background.JPG';
import ngo from '../assets/ngo.jpeg';
import school from '../assets/school.jpeg';
import unicef from '../assets/unicef.jpeg';
import { Link, useNavigate } from "react-router-dom";
import { FaInfoCircle, FaComments, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function Home() {
  const backgrounds = [back1, back2, back4, back5];
  const messages = [
    "Every child learns in their own beautiful way.",
    "Empowering young minds for a better tomorrow.",
    "Supportive learning starts with understanding.",
    "Minds that Matter — because every journey counts.",
  ];

  const [currentBack, setCurrentBack] = useState(0);
  const [previousBack, setPreviousBack] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(-1);
  const [isFading, setIsFading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setPreviousBack(currentBack);
        setCurrentBack((prev) => (prev + 1) % backgrounds.length);
        setCurrentMessage((prev) => (prev + 1) % (messages.length + 1));
        setIsFading(false);
      }, 1000);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentBack]);

  return (
    <div className="home-container">

      {/* Glass Navbar with icons + hamburger */}
      <div className="navbar">
        <div className="logo">MTM</div>
        <div className="nav-actions">
          {/* Social Icons */}
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
          </div>

          {/* About & Contact icons */}
          <div className="page-icons">
            <FaInfoCircle onClick={() => navigate('/about')} title="About" />
            <FaComments onClick={() => navigate('/contact')} title="Contact" />
          </div>

          {/* Hamburger (if you want dropdown later) */}
          <div className="hamburger">
            ☰
          </div>
        </div>
      </div>

      <div className="home-background-wrapper">
        <div
          className={`background-layer ${isFading ? "fade-out" : ""}`}
          style={{ backgroundImage: `url(${backgrounds[previousBack]})` }}
        ></div>
        <div
          className={`background-layer ${isFading ? "fade-in" : ""}`}
          style={{ backgroundImage: `url(${backgrounds[currentBack]})` }}
        ></div>

        <div className="content-layer">
          {currentMessage === 0 || currentMessage === -1 ? (
            <>
              <h1 className="welcome">
                <strong>Welcome To Minds that Matter</strong>
              </h1>
              <div>
                <p>
                  <strong>
                    Where The <span style={{ color: 'yellow' }}>Future</span> Begins With You
                  </strong>
                </p>
              </div>
            </>
          ) : (
            <p className="inspo-message">“{messages[currentMessage - 1]}”</p>
          )}

          <div className="cta-buttons">
            <button
              className="primary-btn"
              onClick={() => {
                if (window.location.pathname === "/about") {
                  const packagesSection = document.querySelector("#packages");
                  packagesSection?.scrollIntoView({ behavior: "smooth" });
                } else {
                  navigate("/about#packages");
                }
              }}
            >
              Get Started
            </button>

            <Link to="/resources">
              <button className="secondary-btn">Explore Resources</button>
            </Link>
          </div>

          <div
            className="scroll-indicator"
            onClick={() =>
              document
                .querySelector(".features-section")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="arrow-down">▼</span>
          </div>
        </div>
      </div>

      <section className="features-section">
        <div className="feature-card">
          <h3> Student-Friendly Learning</h3>
          <p>Interactive, easy-to-use tools tailored for special needs learners.</p>
        </div>
        <div className="feature-card">
          <h3> Parental Dashboard</h3>
          <p>Track progress, stay informed, and support your child every step.</p>
        </div>
        <div className="feature-card">
          <h3> Psychiatrist Support</h3>
          <p>Built-in behavioral feedback and therapist reports.</p>
        </div>
      </section>

      <section className="partners-section">
        <h2>Trusted by:</h2>
        <div className="partners-logos">
          <img src={ngo} alt="NGO 1" />
          <img src={school} alt="School 1" />
          <img src={unicef} alt="UNICEF" />
        </div>
      </section>

      <div className="footer-container">
        <footer className="enhanced-footer">
          <div className="footer-content">
            <div>
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/resources">Resources</Link></li>
                <li><Link to="#">FAQ</Link></li>
              </ul>
            </div>
          </div>
          <p>© 2025 Minds That Matter. All rights reserved.</p>
          <p>0712683708</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
