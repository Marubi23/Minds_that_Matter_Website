import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaInfoCircle, FaComments } from "react-icons/fa";
import '../index.css';

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
    localStorage.removeItem("hasClickedGetStarted");
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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuLinks = [
    { path: "/", label: "Home" },
    { path: "/login", label: "Portals" },
    { path: "/resources", label: "Resources" },
    { path: "/videocall", label: "Live Sessions" },
    { path: "/progress", label: "Progress" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* MOBILE ONLY: top-right bar */}
      <div className="top-right mobile-only">
        <div className="social-icons mobile-only">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>
        <div className="hamburger" onClick={toggleMenu}>☰</div>
      </div>

      {/* Overlay */}
      <div className={`menu-overlay ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(false)} />

      {/* MOBILE DROPDOWN */}
      <ul className={`dropdown-menu ${menuOpen ? "open" : ""} mobile-only`} ref={dropdownRef}>
        {menuLinks.map((link, i) => (
          <Link key={i} to={link.path} onClick={() => setMenuOpen(false)}>
            <li>{link.label}</li>
          </Link>
        ))}
      </ul>

      {/* DESKTOP NAVBAR */}
      <div className="navbar desktop-only">
        <div className="logo-container">MTM</div>

        {/* Desktop Nav Links */}
        <ul className="nav-links desktop-only">
          {menuLinks.map((link, i) => (
            <Link key={i} to={link.path}>
              <li>{link.label}</li>
            </Link>
          ))}
        </ul>

        {/* Desktop Social Icons */}
        <div className="social-icons desktop-only">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>

        {/* Get Started Button */}
        {isHomePage && !hasClickedGetStarted && (
          <div className="start-button desktop-only">
            <button onClick={handleGetStartedClick}>Get Started</button>
          </div>
        )}

        {/* Student Info + Logout */}
        {student && (
          <div className="student-info">
            <span>Hello, {student.name || student.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}

        {/* Logout message */}
        {logoutMessage && <div className="logout-message">{logoutMessage}</div>}
      </div>

      {/* Bottom icons */}
      <div className="bottom-icons">
        <Link to="/about" className="bottom-icon" title="About"><FaInfoCircle /></Link>
        <Link to="/contact" className="bottom-icon" title="Contact"><FaComments /></Link>
      </div>
    </>
  );
}

export default Navbar;
