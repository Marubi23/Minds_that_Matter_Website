import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './ParentDashboard.css';

const sampleData = [
  { date: 'June 1', score: 75 },
  { date: 'June 10', score: 82 },
  { date: 'June 18', score: 69 },
  { date: 'July 2', score: 88 },
  { date: 'July 10', score: 91 }
];

function ParentDashboard() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const storedStudent = JSON.parse(localStorage.getItem('student'));
    setStudent(storedStudent);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <h2>📘 MTM Parent</h2>
        <ul>
          <li>📈 Progress</li>
          <li>🧠 Psychiatrist Notes</li>
          <li>📚 Learning Areas</li>
          <li>📅 Upcoming Sessions</li>
          <li>📝 Feedback</li>
          <li onClick={handleLogout}>🚪 Logout</li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <h1>Welcome, Parent 👋</h1>
        {student && (
          <p className="child-profile">
            Child: <strong>{student.name}</strong> | Grade: <strong>{student.grade}</strong> | Age: <strong>{student.id}</strong>
          </p>
        )}

        <section className="progress-section">
          <h2>📊 Child Progress (Scores Over Time)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#82ca9d" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </section>

        <section className="psychiatrist-report">
          <h2>🧠 Psychiatrist Insight</h2>
          <p>
            “Student exhibits strong focus in short bursts, but gets distracted after 15–20 mins. Recommend interactive sessions.”
          </p>
        </section>

        <section className="learning-focus">
          <h2>📚 Focus Areas</h2>
          <ul>
            <li>✔ Doing well: Numbers, Short sentences</li>
            <li>⚠ Needs support: Reading comprehension, Memory retention</li>
          </ul>
        </section>

        <section className="upcoming-sessions">
          <h2>📅 Upcoming Sessions</h2>
          <p>No sessions scheduled. Check back soon.</p>
        </section>

        <section className="feedback-form">
          <h2>📝 Parent Feedback</h2>
          <textarea rows="4" placeholder="Write your concern or suggestion..."></textarea>
          <button className="submit-feedback">Submit</button>
        </section>
      </main>
    </div>
  );
}

export default ParentDashboard;
