import React, { useEffect, useState } from 'react';
import './StudentRecords.css'; // Optional for styles

const StudentRecords = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await fetch('/api/records');
        const data = await res.json();
        setRecords(data);
      } catch (err) {
        console.error('Failed to fetch records:', err);
      }
    };
    fetchRecords();
  }, []);

  return (
    <div className="records-container">
      <h1>📚 Student Records</h1>
      {records.length === 0 ? (
        <p>No student records found.</p>
      ) : (
        <div className="record-list">
          {records.map((record, i) => (
            <div key={i} className="record-card">
              <h3>{record.name}</h3>
              <p><strong>Age:</strong> {record.age}</p>
              <p><strong>Gender:</strong> {record.gender}</p>
              <p><strong>School:</strong> {record.school}</p>
              <p><strong>Grade:</strong> {record.grade}</p>
              <p><strong>Contact:</strong> {record.contactNumber}</p>
              <p><strong>Emergency:</strong> {record.emergencyContact}</p>
              <p><strong>Medical:</strong> {record.medicalConditions}</p>
              <p><strong>Notes:</strong> {record.additionalNotes}</p>
              <small>Submitted on {new Date(record.createdAt).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentRecords;
