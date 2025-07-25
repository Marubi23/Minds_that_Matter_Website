import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Home, Video, FileText, Users, Calendar, Settings,
  Bell, Clock, ClipboardList, UserCheck, LogOut
} from 'lucide-react';
import './dashboard.css';

function PsychiatristDashboard() {
  const [psychiatrist, setPsychiatrist] = useState({ name: 'Null' });
  const navigate = useNavigate();

  // Load psychiatrist from localStorage on mount
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("psychiatrist"));
    if (data?.name) {
      setPsychiatrist(data);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("psychiatrist");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("hasClickedGetStarted");
    navigate("/teacher-login"); // or navigate("/") if you prefer homepage
  };

  const displayName = psychiatrist.name?.startsWith("Dr.")
    ? psychiatrist.name
    : `Dr. ${psychiatrist.name}`;

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <h2>Dashboard</h2>
        <nav>
          <Link to="/dashboard"><Home size={16} /> Dashboard</Link>
          <Link to="/createroom"><Video size={16} /> Start Session</Link>
          <Link to="/view-rooms"><ClipboardList size={16} /> Past Consultations</Link>
          <Link to="/records"><Users size={16} /> View Student Records</Link>
          <Link to="/reports"><FileText size={16} /> Reports</Link>
          <Link to="/settings"><Settings size={16} /> Settings</Link>

          {/* ✅ Logout button added here */}
          <button
            onClick={handleLogout}
            style={{
              marginTop: "10px",
              background: "crimson",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: "5px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer"
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Welcome {displayName}</h1>
            <p>Manage sessions, appointments, and reports with ease.</p>
          </div>
          <input className="search-bar" placeholder="Search students or sessions..." />
        </header>

        <section className="dashboard-cards">
          <Link to="/createroom" className="dashboard-card">
            <Video size={20} /> Start New Session
          </Link>
          <Link to="/records" className="dashboard-card">
            <Users size={20} /> View Student Records
          </Link>
          <Link to="/reports" className="dashboard-card">
            <FileText size={20} /> Review Reports
          </Link>
          <Link to="/notifications" className="dashboard-card">
            <Bell size={20} /> View Notifications
          </Link>
        </section>

        <section className="dashboard-panels">
          <div className="dashboard-panel">
            <h3><Clock size={16} /> Recent Activity</h3>
            <ul>
              <li><UserCheck size={14} /> Consulted John Doe – 2 hrs ago</li>
              <li><FileText size={14} /> New report for Mary K. – 3 hrs ago</li>
              <li><Calendar size={14} /> Session scheduled with Alex – Yesterday</li>
            </ul>
          </div>

          <div className="dashboard-panel">
            <h3><Calendar size={16} /> Upcoming Appointments</h3>
            <ul>
              <li>10:00 AM - Sarah J. (ADHD)</li>
              <li>12:00 PM - Liam K. (Anxiety)</li>
              <li>3:00 PM - Chloe M. (Depression)</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PsychiatristDashboard;
