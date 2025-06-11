import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Video,
  FileText,
  Users,
  Calendar,
  Settings,
  Bell,
  Clock,
  ClipboardList,
  UserCheck
} from 'lucide-react';
import './dashboard.css';

function PsychiatristDashboard() {
  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <h2> MTM Portal</h2>
        <nav>
          <Link to="/dashboard"><Home size={16} /> Dashboard</Link>
          <Link to="/createroom"><Video size={16} /> Start Session</Link>
          <Link to="/view-rooms"><ClipboardList size={16} /> Past Consultations</Link>
          <Link to="/records"><Users size={16} /> View Student Records</Link>
          <Link to="/reports"><FileText size={16} /> Reports</Link>
          <Link to="/settings"><Settings size={16} /> Settings</Link>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Welcome, Dr. Jane</h1>
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
