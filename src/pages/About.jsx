import React from "react";
import logo from "../assets/logo.png";
import './About.css';
import { useNavigate } from "react-router-dom";

function About(){
  const navigate = useNavigate();

  const handleButton = () => {
    navigate('/contact');
  };

  return (
    <div className="about-container" style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif", marginTop: '0px' }}>

      <div style={{ margin: '80px', marginBottom: '0px', justifyContent: 'center', alignContent: 'center' }}>
        <img classNamestyle={{ height: '900px', paddingTop: '0px', width: '900px' }} src={logo} alt="company-icon" />
      </div>
      
      <button onClick={handleButton} className="about-page-btn">📞</button>

      <section style={{ marginTop: "2rem" }}>
        <h2 style={{ color: "#444" }}>Our Mission</h2>
        <p style={{ fontSize: "1.1rem", color: "#555" }}>
          Minds that Matter is dedicated to supporting special children with special needs by providing easy-to-follow lessons,
          visual content, and interactive tools designed to align with the CBC curriculum.
        </p>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2 style={{ color: "#444" }}>Who We Are</h2>
        <p style={{ fontSize: "1.1rem", color: "#555" }}>
          This project was built by <strong>Moguche Felix Onyancha</strong>, a passionate fullstack developer focused on building
          technology that creates equal learning opportunities for all children, especially those with special needs.
        </p>
      </section>
      
      <section style={{ marginTop: "2rem" }}>
        <h2 style={{ color: "#444" }}>What We Offer</h2>
        <ul style={{ fontSize: "1.1rem", color: "#555", lineHeight: "1.8" }}>
          <li>Video-based lessons tailored to learners’ needs</li>
          <li>Live class support with integrated conferencing</li>
          <li>Progress tracking for parents and teachers</li>
          <li>Visually friendly, distraction-free interface</li>
        </ul>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2 style={{ color: "#444" }}>Future Plans</h2>
        <p style={{ fontSize: "1.1rem", color: "#555" }}>
          We're working on quizzes, rewards, and AI tutors to make learning even more engaging and accessible for every special child.
        </p>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2 style={{ color: "#444" }}>Contact Us</h2>
        <p style={{ fontSize: "1.1rem", color: "#555" }}>
          Have questions, feedback, or want to support the mission? Reach out at:
          <br />
          <strong>Email:</strong> felixmarubi2005@gmail.com
          <br />
          <strong>Phone:</strong> 0712683708
        </p>
      </section>
    </div>
  );
};

export default About;
