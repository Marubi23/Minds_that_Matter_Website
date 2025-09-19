import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

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
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
      {/* Top-right section (always visible) */}
      <div className="top-right">
        {/* Social Icons */}
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>

        {/* Hamburger */}
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)} />}

      {/* Sliding Menu */}
      <ul className={`dropdown-menu ${menuOpen ? "open" : ""}`} ref={dropdownRef}>
        {menuLinks.map((link, i) => (
          <Link key={i} to={link.path} onClick={() => setMenuOpen(false)}>
            <li>{link.label}</li>
          </Link>
        ))}
      </ul>

      {/* Desktop Navbar */}
      <div className="navbar">
        <div className="logo-container"></div>

        {/* Desktop Nav Links */}
        <ul className="nav-links desktop-only">
          {menuLinks.map((link, i) => (
            <Link key={i} to={link.path}>
              <li>{link.label}</li>
            </Link>
          ))}
        </ul>

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
    </>
  );
}

export default Navbar;

