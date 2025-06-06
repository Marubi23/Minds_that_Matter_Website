import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/front.png";

function Navbar({ student, setStudent }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("isLoggedIn");
    setStudent(null);
    navigate("/login");
  };

  const handleGetStartedClick = () => {
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Close on resize (for responsiveness)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="navbar">
      <div className="logo-container">
        <img
          src={logo}
          alt="Logo"
          style={{
            opacity: 0.8,
            mixBlendMode: "screen",
            position: "fixed",
            top:"24px",
            left:'15px',
            width:'120px',
            height:'auto',
            zIndex:999,
          }}
        />
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        ☰
        {menuOpen && (
          <ul className="dropdown-menu" ref={dropdownRef}>
            <Link to="/" onClick={() => setMenuOpen(false)}><li style={{ color: "yellow" }}>Home</li></Link>
            <Link to="/login" onClick={() => setMenuOpen(false)}><li style={{ color: "white" }}>Portals</li></Link>
            <Link to="/lessonsdetails" onClick={() => setMenuOpen(false)}><li style={{ color: "red" }}>Sessions Details</li></Link>
            <Link to="/videocall" onClick={() => setMenuOpen(false)}><li style={{ color: "tomato" }}>Live Sessions</li></Link>
            <Link to="/progress" onClick={() => setMenuOpen(false)}><li style={{ color: "wheat" }}>Progress</li></Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}><li style={{ color: "white" }}>About</li></Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}><li style={{ color: "orange" }}>Contact</li></Link>
          </ul>
        )}
      </div>

      <ul className="nav-links desktop-only">
        <Link to="/"><li style={{ color: "blue" }}>Home</li></Link>
        <Link to="/login"><li style={{ color: "brown" }}>Portals</li></Link>
        <Link to="/lessonsdetails"><li style={{ color: "red" }}>Sessions Details</li></Link>
        <Link to="/videocall"><li style={{ color: "tomato" }}>Live Sessions</li></Link>
        <Link to="/progress"><li style={{ color: "purple" }}>Progress</li></Link>
        <Link to="/about"><li style={{ color: "blue" }}>About</li></Link>
        <Link to="/contact"><li style={{ color: "orange" }}>Contact</li></Link>
     
      </ul>
        <div className="start-button desktop-only">
        <button onClick={handleGetStartedClick}>Get Started</button>
      </div>

       <div className="start-button mobile-only">
        <button onClick={handleGetStartedClick}>Get Started</button>
      </div>
      


     
      {student && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "-100px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ fontWeight: "700", color: "white" }}>
            Hello {student.name}
          </span>
          <button
            onClick={handleLogout}
            style={{
              background: "crimson",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight:'bolder'
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
