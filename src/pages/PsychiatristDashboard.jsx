import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';

function PsychiatristDashboard() {
  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <h2> MTM Portal</h2>
        <nav>
          <Link to="/dashboard">🏠 Dashboard</Link>
          <Link to="/createroom">📹 Start Session</Link>
          <Link to="/view-rooms">🧾 Past Consultations</Link>
          <Link to="/appointments">📅 Appointments</Link>
          <Link to="/reports">📁 Reports</Link>
          <Link to="/settings">⚙️ Settings</Link>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Welcome, Dr. Jane</h1>
            <p>Manage sessions, appointments, and reports with ease.</p>
          </div>
          <input className="search-bar" placeholder="🔍 Search students or sessions..." />
        </header>

        <section className="dashboard-cards">
          <Link to="/createroom" className="dashboard-card">📹 Start New Session</Link>
          <Link to="/appointments" className="dashboard-card">📅 Manage Appointments</Link>
          <Link to="/reports" className="dashboard-card">📁 Review Reports</Link>
          <Link to="/notifications" className="dashboard-card">🔔 View Notifications</Link>
        </section>

        <section className="dashboard-panels">
          <div className="dashboard-panel">
            <h3>📌 Recent Activity</h3>
            <ul>
              <li>🧑‍⚕️ Consulted John Doe – 2 hrs ago</li>
              <li>📁 New report for Mary K. – 3 hrs ago</li>
              <li>📅 Session scheduled with Alex – Yesterday</li>
            </ul>
          </div>

          <div className="dashboard-panel">
            <h3>📅 Upcoming Appointments</h3>
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
