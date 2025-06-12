import React, { useEffect, useState } from 'react';
import './Records.css';

const Records = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ gender: '', school: '', age: '' });
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/records');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setRecords(data);
        setFilteredRecords(data);
      } catch (err) {
        setError('❌ Could not load student records.');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  const applyFilters = () => {
    let result = [...records];

    if (filters.gender) {
      result = result.filter(r => r.gender === filters.gender);
    }
    if (filters.school) {
      result = result.filter(r => r.school?.toLowerCase().includes(filters.school.toLowerCase()));
    }
    if (filters.age) {
      result = result.filter(r => r.age === parseInt(filters.age));
    }

    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'age') {
      result.sort((a, b) => a.age - b.age);
    }

    setFilteredRecords(result);
  };

  useEffect(applyFilters, [filters, sortBy, records]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/records/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setRecords(prev => prev.filter(r => r._id !== id));
      } else {
        alert('Failed to delete record');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting record.');
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="records-container">
      <h1>📚 Student Records</h1>

      {/* Filter Bar */}
      <div className="filter-bar">
        <input
          type="text"
          name="school"
          placeholder="Search by school"
          value={filters.school}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Filter by age"
          value={filters.age}
          onChange={handleFilterChange}
        />
        <select name="gender" value={filters.gender} onChange={handleFilterChange}>
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="">Sort by</option>
          <option value="name">Name A-Z</option>
          <option value="age">Age Ascending</option>
        </select>
      </div>

      {/* Loading/Error */}
      {loading && <p className="loading">⏳ Loading records...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && filteredRecords.length === 0 && (
        <p>No student records match your filters.</p>
      )}

      {!loading && filteredRecords.length > 0 && (
        <div className="record-list">
          {filteredRecords.map((record) => (
            <div key={record._id} className="record-card">
              <h3>{record.name || 'Unnamed'}</h3>
              <p><strong>Age:</strong> {record.age || 'N/A'}</p>
              <p><strong>Gender:</strong> {record.gender || 'N/A'}</p>
              <p><strong>School:</strong> {record.school || 'N/A'}</p>
              <p><strong>Grade:</strong> {record.grade || 'N/A'}</p>
              <p><strong>Contact:</strong> {record.contactNumber || 'N/A'}</p>
              <p><strong>Emergency:</strong> {record.emergencyContact || 'N/A'}</p>
              <p><strong>Medical:</strong> {record.medicalConditions || 'None'}</p>
              <p><strong>Notes:</strong> {record.additionalNotes || 'None'}</p>
              <small>🕒 Submitted on {new Date(record.createdAt).toLocaleString()}</small>

              <div className="record-actions">
                <button className="edit-btn">✏ Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(record._id)}>🗑 Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Records;
