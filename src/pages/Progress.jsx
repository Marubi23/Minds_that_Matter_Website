import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Progress.css";

const Progress = () => {
  const student = JSON.parse(localStorage.getItem("student")) || {
    name: "Null",
    age:'Null'
  };

  const metadata = {
    age: student.age || "N/A",
    duration: "",
    focusScore: "",
    emotionStats: {
      neutral: 0,
      happy: 0,
      sad: 0,
    },
    onCamTime: "",
    psychiatristNotes:"",
    lessonObjectives: [],
    attachments: [],
  };

  const emotionData = [
    { name: "Neutral", value: metadata.emotionStats.neutral },
    { name: "Happy", value: metadata.emotionStats.happy },
    { name: "Sad", value: metadata.emotionStats.sad },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ff6b6b"];

  return (
    <div className="progress-main">
       <div className="progress-container">
      <h1 className="dashboard-title">📈 Student Behavior Dashboard</h1>

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
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
          {metadata.lessonObjectives.map((obj, i) => (
            <li key={i}>
              {obj.done ? "✅" : "❌"} {obj.task}
            </li>
          ))}
        </ul>
      </div>

      <div className="card info-card">
        <h2>📎 Attachments</h2>
        <ul>
          {metadata.attachments.map((file, i) => (
            <li key={i}>
              <a href={file.link} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
   
  );
};

export default Progress;
