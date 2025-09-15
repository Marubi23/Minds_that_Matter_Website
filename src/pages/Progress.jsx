import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Progress.css";

const Progress = () => {
  const navigate = useNavigate();
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    
    const student = JSON.parse(localStorage.getItem("student"));
    const meta = JSON.parse(localStorage.getItem("studentMetadata"));

    if (!parent) {
      navigate("/parent-login");
    }

    if (meta) {
      setMetadata(meta);
    } else {
      // If no metadata found, optionally fetch from backend here
      setMetadata({
        age: student?.age || "N/A",
        duration: "0 min",
        focusScore: 0,
        emotionStats: {
          neutral: 0,
          happy: 0,
          sad: 0,
        },
        onCamTime: "0 min",
        psychiatristNotes: "No notes yet.",
        lessonObjectives: [],
        attachments: [],
      });
    }
  }, [navigate]);

  const student = JSON.parse(localStorage.getItem("student")) || {
    name: "Null",
    age: "Null",
  };

  const handleLogout = () => {
    localStorage.removeItem("parent");
    navigate("/parent-login");
  };

  const emotionData = metadata
    ? [
        { name: "Neutral", value: metadata.emotionStats?.neutral || 0 },
        { name: "Happy", value: metadata.emotionStats?.happy || 0 },
        { name: "Sad", value: metadata.emotionStats?.sad || 0 },
      ]
    : [];

  const COLORS = ["#8884d8", "#82ca9d", "#ff6b6b"];

  if (!metadata) return <p>Loading student data...</p>;

  return (
    <div className="progress-main">
      <div className="progress-container">
        <div className="top-bar">
          <h1 className="dashboard-title">📈 Student Behavior Dashboard</h1>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>

        <div className="card info-card">
          <p><strong>👦 Student:</strong> {student.name}</p>
          <p><strong>🎂 Age:</strong> {metadata.age}</p>
          <p><strong>⏱️ Duration:</strong> {metadata.duration}</p>
        </div>

        <div className="metrics-grid">
          <div className="card metric-card">
            <h2>🧠 Focus Score</h2>
            <p className="metric-value">{metadata.focusScore}%</p>
          </div>

          <div className="card chart-card">
            <h2>😊 Emotion Breakdown</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={emotionData}
                  cx="50%"
                  cy="50%"
                  label
                  outerRadius={70}
                  dataKey="value"
                >
                  {emotionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="card metric-card">
            <h2>🎥 On-Camera Time</h2>
            <p className="metric-value">{metadata.onCamTime}</p>
          </div>
        </div>

        <div className="card info-card">
          <h2>🧑‍⚕️ Psychiatrist Notes</h2>
          <p>{metadata.psychiatristNotes}</p>
        </div>

        <div className="card info-card">
          <h2>📚 Lesson Objectives</h2>
          <ul>
            {metadata.lessonObjectives?.length > 0 ? (
              metadata.lessonObjectives.map((obj, i) => (
                <li key={i}>
                  {obj.done ? "✅" : "❌"} {obj.task}
                </li>
              ))
            ) : (
              <li>No objectives yet.</li>
            )}
          </ul>
        </div>

        <div className="card info-card">
          <h2>📎 Attachments</h2>
          <ul>
            {metadata.attachments?.length > 0 ? (
              metadata.attachments.map((file, i) => (
                <li key={i}>
                  <a href={file.link} target="_blank" rel="noopener noreferrer">
                    {file.name}
                  </a>
                </li>
              ))
            ) : (
              <li>No files uploaded yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Progress;
