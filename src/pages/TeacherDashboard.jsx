
import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';

function TeacherDashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>👨‍🏫 Welcome back, Teacher!</h1>
        <p>Your digital classroom at a glance.</p>
      </header>

      <section className="dashboard-actions">
        <Link to="/createroom" className="dashboard-card">
          📹 Create Video Room
        </Link>
        <Link to="/view-rooms" className="dashboard-card">
          🧑‍🤝‍🧑 Active Rooms
        </Link>
        <Link to="/attendance" className="dashboard-card">
          📊 Attendance
        </Link>
        <Link to="/materials" className="dashboard-card">
          📁 Upload Materials
        </Link>
      </section>

      <section className="dashboard-feed">
        <h3>📌 Recent Activity</h3>
        <ul>
          <li>Math Room created – 2 hrs ago</li>
          <li>2 students joined Science Room – 3 hrs ago</li>
          <li>Uploaded English materials – Yesterday</li>
        </ul>
      </section>
    </div>
  );
}

export default TeacherDashboard;
