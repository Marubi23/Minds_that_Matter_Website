import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import axios from 'axios';
import './ParentDashboard.css';

function ParentDashboard() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [parent, setParent] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const storedParent = JSON.parse(localStorage.getItem('parent'));
    if (!storedParent) {
      navigate('/parent/login');
      return;
    }
    setParent(storedParent);

    const fetchRecords = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/records/by-email/${storedParent.email}`);
        setRecords(res.data);
      } catch (err) {
        console.error('Failed to fetch child records:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('parent');
    navigate('/');
  };

  const handleFeedbackSubmit = () => {
    console.log('Feedback submitted:', feedback);
    setFeedback('');
    alert('Thanks for your feedback!');
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>📘 MTM Parent</h2>
        </div>
        <nav className="sidebar-menu">
          <ul>
            <li>📈 Progress</li>
            <li>🧠 Psychiatrist Notes</li>
            <li>📚 Learning Areas</li>
            <li>📅 Upcoming Sessions</li>
            <li>📝 Feedback</li>
            <li><Link to="/parent/resource">🛠 Resources</Link></li>
            <li onClick={handleLogout} className="logout-btn">🚪 Logout</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header>
          <h1>Welcome, Parent 👋</h1>
          {records.length > 0 ? (
            <p className="student-info">
              Viewing records of your children ({records.length})
            </p>
          ) : (
            <p className="student-info">No linked student profiles found.</p>
          )}
        </header>

        {loading ? (
          <p>Loading child data...</p>
        ) : records.length === 0 ? (
          <p>No student records found. Please ensure your child used this email during profile setup.</p>
        ) : (
          records.map((child, index) => (
            <div key={child._id || index} className="child-section">
              <h2>👦 {child.name} | Grade: {child.grade} | Age: {child.age}</h2>

              <section className="section-card">
                <h3>📊 Progress</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={child.progress || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#006d77" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </section>

              <section className="section-card">
                <h3>🧠 Psychiatrist Notes</h3>
                <blockquote>
                  {child.psychiatristNote || 'No notes yet from psychiatrist.'}
                </blockquote>
              </section>

              <section className="section-card">
                <h3>📚 Focus Areas</h3>
                <ul className="focus-list">
                  <li><span className="tag tag-green">✔</span> Doing well: Numbers, Short sentences</li>
                  <li><span className="tag tag-yellow">⚠</span> Needs support: Reading comprehension, Memory retention</li>
                </ul>
              </section>

              <section className="section-card">
                <h3>📅 Upcoming Sessions</h3>
                <p>No sessions scheduled. Check back soon.</p>
              </section>
            </div>
          ))
        )}

        <section className="section-card">
          <h2>📝 Parent Feedback</h2>
          <textarea
            className="feedback-textarea"
            rows="4"
            placeholder="Write your concern or suggestion..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
          <button className="submit-feedback" onClick={handleFeedbackSubmit}>Submit</button>
        </section>
      </main>
    </div>
  );
}

export default ParentDashboard;

