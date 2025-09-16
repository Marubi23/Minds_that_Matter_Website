import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/front.png";

function Panel({ student, setStudent }) {
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
    <div className="navbar">
      {/* Logo */}
      <div className="logo-container">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </div>

      {/* Hamburger */}
      <div className="hamburger" onClick={toggleMenu}>
        ☰
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
        <>
          <div className="start-button desktop-only">
            <button onClick={handleGetStartedClick}>Get Started</button>
          </div>
          <div className="start-button mobile-only">
            <button onClick={handleGetStartedClick}>Get Started</button>
          </div>
        </>
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
  );
}

export default Panel;
