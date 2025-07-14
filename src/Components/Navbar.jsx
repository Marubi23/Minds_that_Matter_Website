import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/front.png";

function Navbar({ student, setStudent }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [logoutMessage, setLogoutMessage] = useState("");

  const [hasClickedGetStarted, setHasClickedGetStarted] = useState(() => {
    return localStorage.getItem("hasClickedGetStarted") === "true";
  });

  const handleLogout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("hasClickedGetStarted"); // Reset get started state
    setStudent(null);
    setHasClickedGetStarted(false);

    setLogoutMessage("👋 Come back later! We'll miss you 💖");
    setTimeout(() => {
      setLogoutMessage("");
      navigate("/");
    }, 1000);
  };

  const handleGetStartedClick = () => {
    localStorage.setItem("hasClickedGetStarted", "true");
    setHasClickedGetStarted(true);
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

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
            top: "24px",
            left: "15px",
            width: "120px",
            height: "auto",
            zIndex: 999,
          }}
        />
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        ☰
        {menuOpen && (
          <ul className="dropdown-menu" ref={dropdownRef}>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <li style={{ color: "yellow" }}>Home</li>
            </Link>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <li style={{ color: "white" }}>Portals</li>
            </Link>
            <Link to="/resources" onClick={() => setMenuOpen(false)}>
              <li style={{ color: "red" }}>Resources</li>
            </Link>
            <Link to="/videocall" onClick={() => setMenuOpen(false)}>
              <li style={{ color: "tomato" }}>Live Sessions</li>
            </Link>
            <Link to="/progress" onClick={() => setMenuOpen(false)}>
              <li style={{ color: "wheat" }}>Progress</li>
            </Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              <li style={{ color: "white" }}>About</li>
            </Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              <li style={{ color: "orange" }}>Contact</li>
            </Link>
          </ul>
        )}
      </div>

      <ul className="nav-links desktop-only">
        <Link to="/">
          <li style={{ color: "blue" }}>Home</li>
        </Link>
        <Link to="/login">
          <li style={{ color: "purple" }}>Portals</li>
        </Link>
        <Link to="/resources">
          <li style={{ color: "purple" }}>Resources</li>
        </Link>
        <Link to="/videocall">
          <li style={{ color: "purple" }}>Live Sessions</li>
        </Link>
        <Link to="/progress">
          <li style={{ color: "purple" }}>Progress</li>
        </Link>
        <Link to="/about">
          <li style={{ color: "purple" }}>About</li>
        </Link>
        <Link to="/contact">
          <li style={{ color: "blue" }}>Contact</li>
        </Link>
      </ul>

      {/* ✅ Show only on Home + only if not already clicked */}
      {isHomePage && !hasClickedGetStarted && (
        <>
          <div className="start-button desktop-only">
            <button onClick={handleGetStartedClick}>Get Started</button>
          </div>
          <div className="start-button mobile-only">
            <button onClick={handleGetStartedClick}>Get Started</button>
          </div>
        </>
      )}

      {student && (
        <div
          style={{
            position: "absolute",
            top: "30px",
            right: "10px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "#1e3a8a",
            padding: "8px 12px",
            borderRadius: "8px",
            zIndex: 1000,
          }}
        >
          <span style={{ fontWeight: "700", color: "white" }}>
            Hello, {student.name || student.email}
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
              fontWeight: "bolder",
            }}
          >
            Logout
          </button>
        </div>
      )}

      {logoutMessage && (
        <div
          style={{
            position: "absolute",
            top: "80px",
            right: "10px",
            backgroundColor: "#f0f8ff",
            color: "#333",
            padding: "10px 15px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            fontWeight: "bold",
            zIndex: 9999,
          }}
        >
          {logoutMessage}
        </div>
      )}
    </div>
  );
}

export default Navbar;
